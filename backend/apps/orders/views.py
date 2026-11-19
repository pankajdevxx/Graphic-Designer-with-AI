import io
import zipfile
from decimal import Decimal
from django.conf import settings
from django.http import HttpResponse, Http404
from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.products.models import Product
from apps.promotions.models import Coupon
from .models import Order, OrderItem, Payment, DownloadLog, CustomDesignRequest, generate_license_key
from .serializers import (
    OrderSerializer,
    OrderItemSerializer,
    CheckoutSerializer,
    VerifyPaymentSerializer,
    CustomDesignRequestSerializer,
    AdminCustomDesignRequestSerializer,
)
from .razorpay_client import razorpay_client


class CheckoutCreateOrderView(APIView):
    """
    Creates an Order in database and initiates a Razorpay Order.
    Supports both authenticated users and guest checkouts.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        user = request.user if request.user.is_authenticated else None

        items_input = data['items']
        if not items_input:
            return Response({'error': 'Your cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)

        subtotal = Decimal('0.00')
        order_items_data = []

        for item in items_input:
            product_id = item['product_id']
            qty = item.get('quantity', 1)
            license_type = item.get('license_type', 'standard')

            try:
                product = Product.objects.get(id=product_id, status='active')
            except Product.DoesNotExist:
                return Response({'error': f"Product with ID {product_id} was not found or is inactive."}, status=status.HTTP_400_BAD_REQUEST)

            base_price = product.price
            multiplier = Decimal('2.5') if license_type == 'extended' else Decimal('1.0')
            unit_price = (base_price * multiplier).quantize(Decimal('0.01'))
            item_total = (unit_price * qty).quantize(Decimal('0.01'))
            subtotal += item_total

            order_items_data.append({
                'product': product,
                'product_title': product.title,
                'license_type': license_type,
                'unit_price': unit_price,
                'quantity': qty,
                'total_price': item_total,
                'license_key': generate_license_key(),
            })

        # Process coupon code if provided
        discount_amount = Decimal('0.00')
        coupon_code = data.get('coupon_code', '').strip()
        if coupon_code:
            try:
                coupon = Coupon.objects.get(code__iexact=coupon_code, is_active=True)
                if coupon.discount_type == 'percentage':
                    discount_amount = (subtotal * (coupon.discount_value / Decimal('100.0'))).quantize(Decimal('0.01'))
                else:
                    discount_amount = min(coupon.discount_value, subtotal)
            except Coupon.DoesNotExist:
                pass  # Ignore invalid coupon or treat as 0

        total_amount = max(Decimal('0.00'), subtotal - discount_amount)

        # Create Order in DB
        order = Order.objects.create(
            user=user,
            customer_name=data['customer_name'],
            customer_email=data['customer_email'],
            customer_phone=data.get('customer_phone', ''),
            billing_address=data.get('billing_address', ''),
            city=data.get('city', ''),
            country=data.get('country', 'India'),
            postal_code=data.get('postal_code', ''),
            subtotal=subtotal,
            discount_amount=discount_amount,
            tax_amount=Decimal('0.00'),
            total_amount=total_amount,
            currency='INR',
            notes=data.get('notes', ''),
            status='pending',
            payment_status='unpaid',
        )

        for oi in order_items_data:
            OrderItem.objects.create(
                order=order,
                product=oi['product'],
                product_title=oi['product_title'],
                license_type=oi['license_type'],
                unit_price=oi['unit_price'],
                quantity=oi['quantity'],
                total_price=oi['total_price'],
                license_key=oi['license_key'],
            )

        # Create Razorpay Order
        razorpay_order = razorpay_client.create_order(
            amount_in_inr=total_amount,
            receipt=order.order_number,
            notes={
                'order_number': order.order_number,
                'customer_email': order.customer_email,
            }
        )

        order.razorpay_order_id = razorpay_order['id']
        order.save(update_fields=['razorpay_order_id'])

        return Response({
            'message': 'Order created successfully. Ready for payment.',
            'order': OrderSerializer(order).data,
            'razorpay': {
                'key_id': razorpay_client.key_id,
                'order_id': razorpay_order['id'],
                'amount': razorpay_order['amount'],
                'currency': razorpay_order['currency'],
                'mode': razorpay_order.get('mode', 'sandbox'),
            }
        }, status=status.HTTP_201_CREATED)


class VerifyPaymentView(APIView):
    """
    Verifies the Razorpay payment signature cryptographically.
    Activates digital downloads and updates order status.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = VerifyPaymentSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        order_number = serializer.validated_data['order_number']
        razorpay_order_id = serializer.validated_data['razorpay_order_id']
        razorpay_payment_id = serializer.validated_data['razorpay_payment_id']
        razorpay_signature = serializer.validated_data['razorpay_signature']

        try:
            order = Order.objects.get(order_number=order_number)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if already paid
        if order.payment_status == 'paid':
            return Response({
                'message': 'Order is already confirmed and paid.',
                'order': OrderSerializer(order).data,
            }, status=status.HTTP_200_OK)

        # Cryptographic Signature Verification
        is_valid = razorpay_client.verify_payment_signature(
            razorpay_order_id=razorpay_order_id,
            razorpay_payment_id=razorpay_payment_id,
            razorpay_signature=razorpay_signature
        )

        if not is_valid:
            order.payment_status = 'failed'
            order.save(update_fields=['payment_status'])
            return Response({'error': 'Payment verification failed. Invalid digital signature.'}, status=status.HTTP_400_BAD_REQUEST)

        # Mark paid
        order.payment_status = 'paid'
        order.status = 'paid'
        order.razorpay_payment_id = razorpay_payment_id
        order.save(update_fields=['payment_status', 'status', 'razorpay_payment_id', 'updated_at'])

        # Record Payment
        Payment.objects.create(
            order=order,
            razorpay_order_id=razorpay_order_id,
            razorpay_payment_id=razorpay_payment_id,
            razorpay_signature=razorpay_signature,
            amount=order.total_amount,
            currency=order.currency,
            status='captured',
            raw_payload=request.data,
        )

        return Response({
            'message': 'Payment successfully verified! Your digital design assets are ready for download.',
            'order': OrderSerializer(order).data,
        }, status=status.HTTP_200_OK)


class UserOrdersView(APIView):
    """Returns order history for the authenticated user."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        return Response({
            'count': orders.count(),
            'orders': OrderSerializer(orders, many=True).data,
        }, status=status.HTTP_200_OK)


class UserOrderDetailView(APIView):
    """Returns single order detail for authenticated user or customer email match."""
    permission_classes = [permissions.AllowAny]

    def get(self, request, order_number):
        try:
            if request.user.is_authenticated:
                order = Order.objects.get(order_number=order_number, user=request.user)
            else:
                email = request.query_params.get('email', '')
                if not email:
                    return Response({'error': 'Email parameter is required for guest order lookup.'}, status=status.HTTP_400_BAD_REQUEST)
                order = Order.objects.get(order_number=order_number, customer_email__iexact=email)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found.'}, status=status.HTTP_404_NOT_FOUND)

        return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)


class UserDownloadsView(APIView):
    """Returns all purchased items with valid download licenses for the user."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        items = OrderItem.objects.filter(
            order__user=request.user,
            order__payment_status='paid'
        ).select_related('order', 'product').order_by('-order__created_at')

        return Response({
            'count': items.count(),
            'downloads': OrderItemSerializer(items, many=True).data,
        }, status=status.HTTP_200_OK)


class DownloadAssetView(APIView):
    """
    Secure download center endpoint.
    Verifies that the order item license key exists and belongs to a paid order.
    Streams an authenticated ZIP bundle containing the design package, certificate & instructions.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, license_key):
        try:
            item = OrderItem.objects.select_related('order', 'product').get(license_key=license_key)
        except OrderItem.DoesNotExist:
            raise Http404("Invalid or unrecognized license key.")

        if item.order.payment_status != 'paid':
            return Response({'error': 'Payment has not been completed for this license.'}, status=status.HTTP_403_FORBIDDEN)

        if item.download_count >= item.max_downloads:
            return Response({'error': 'Download limit exceeded for this license key.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)

        # Record download audit log
        user = request.user if request.user.is_authenticated else item.order.user
        ip_addr = request.META.get('REMOTE_ADDR')
        user_agent = request.META.get('HTTP_USER_AGENT', '')[:500]

        DownloadLog.objects.create(
            order_item=item,
            user=user,
            ip_address=ip_addr,
            user_agent=user_agent
        )

        item.download_count += 1
        item.save(update_fields=['download_count'])

        # Generate digital asset ZIP package in memory
        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zf:
            # 1. License Certificate
            cert_content = f"""====================================================================
PIXELGENCREATIVITY — OFFICIAL DIGITAL ASSET LICENSE CERTIFICATE
====================================================================
License Key:       {item.license_key}
Product Name:      {item.product_title}
License Type:      {item.get_license_type_display()}
Licensee Name:     {item.order.customer_name}
Licensee Email:    {item.order.customer_email}
Order Number:      {item.order.order_number}
Issue Date:        {item.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}
Authentication:    VERIFIED & CRYPTOGRAPHICALLY SECURED

PERMITTED USAGE:
- You are granted a non-exclusive, non-transferable license to use this asset.
- Commercial usage allowed per {item.license_type.capitalize()} License terms.
- Reselling, sublicensing, or redistributing the raw vector files is strictly prohibited.

Support: support@pixelgencreativity.com
Website: https://pixelgencreativity.com
====================================================================
"""
            zf.writestr(f"LICENSE_CERTIFICATE_{item.license_key}.txt", cert_content)

            # 2. README / Instructions
            readme_content = f"""PixelGenCreativity — {item.product_title}
Thank you for downloading this premium design asset!

INCLUDED FORMATS:
- High-Resolution Vectors (.SVG / .EPS)
- Figma Component Kit
- Adobe Illustrator Source (.AI)
- Adobe Photoshop Source (.PSD)
- Ultra-HD 4K Preview Renders (.PNG / .WEBP)

HOW TO EDIT:
1. Open the .ai or .fig file in your favorite design editor.
2. Ensure you have installed standard Google Fonts used in the templates.
3. Replace placeholder text and imagery with your brand identity.

Need help or custom brand extensions?
Contact us at https://pixelgencreativity.com/contact or request a custom design commission!
"""
            zf.writestr("README_INSTRUCTIONS.txt", readme_content)

            # 3. Vector Mock File
            svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="pg_grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="50%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#070210"/>
  <circle cx="400" cy="300" r="180" fill="url(#pg_grad)" opacity="0.8"/>
  <text x="400" y="310" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">PixelGen — {item.product_title}</text>
  <text x="400" y="350" font-family="monospace" font-size="16" fill="#cbd5e1" text-anchor="middle">Licensed to {item.order.customer_name}</text>
</svg>
"""
            zf.writestr(f"design_asset_{item.license_key}.svg", svg_content)

        zip_buffer.seek(0)
        filename = f"PixelGen_{item.product_title.replace(' ', '_')}_{item.license_key[:8]}.zip"
        response = HttpResponse(zip_buffer.getvalue(), content_type='application/zip')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response


class CustomDesignRequestCreateView(APIView):
    """Allows visitors and clients to submit custom design briefs and quotations."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CustomDesignRequestSerializer(data=request.data)
        if serializer.is_valid():
            req_obj = serializer.save()
            return Response({
                'message': 'Your custom design request has been received! Our art directors will review your brief within 24 hours.',
                'request': CustomDesignRequestSerializer(req_obj).data,
            }, status=status.HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class AdminOrdersListView(APIView):
    """Admin view to inspect all platform orders."""
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        orders = Order.objects.all().order_by('-created_at')
        return Response({
            'count': orders.count(),
            'orders': OrderSerializer(orders, many=True).data,
        }, status=status.HTTP_200_OK)


class AdminOrderDetailView(APIView):
    """Admin view to update order status."""
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        new_status = request.data.get('status')
        payment_status = request.data.get('payment_status')

        if new_status:
            order.status = new_status
        if payment_status:
            order.payment_status = payment_status

        order.save()
        return Response({
            'message': 'Order updated successfully',
            'order': OrderSerializer(order).data,
        }, status=status.HTTP_200_OK)


class AdminCustomRequestsView(APIView):
    """Admin view to list and manage client custom briefs."""
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        requests_qs = CustomDesignRequest.objects.all().order_by('-created_at')
        return Response({
            'count': requests_qs.count(),
            'requests': AdminCustomDesignRequestSerializer(requests_qs, many=True).data,
        }, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        try:
            req_obj = CustomDesignRequest.objects.get(pk=pk)
        except CustomDesignRequest.DoesNotExist:
            return Response({'error': 'Custom design request not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = AdminCustomDesignRequestSerializer(req_obj, data=request.data, partial=True)
        if serializer.is_valid():
            updated = serializer.save()
            return Response({
                'message': 'Custom request updated successfully',
                'request': AdminCustomDesignRequestSerializer(updated).data,
            }, status=status.HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class AdminAnalyticsView(APIView):
    """Admin view returning executive platform analytics."""
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        total_users = User.objects.count()
        total_products = Product.objects.count()
        total_orders = Order.objects.count()
        paid_orders = Order.objects.filter(payment_status='paid')

        total_revenue = sum(order.total_amount for order in paid_orders) or Decimal('0.00')
        custom_requests_count = CustomDesignRequest.objects.count()
        pending_requests_count = CustomDesignRequest.objects.filter(status__in=['new', 'reviewing']).count()

        recent_orders = Order.objects.order_by('-created_at')[:8]
        recent_payments = Payment.objects.order_by('-verified_at')[:8]

        return Response({
            'metrics': {
                'total_users': total_users,
                'total_products': total_products,
                'total_orders': total_orders,
                'paid_orders_count': paid_orders.count(),
                'total_revenue': float(total_revenue),
                'currency': 'INR',
                'custom_requests_count': custom_requests_count,
                'pending_requests_count': pending_requests_count,
            },
            'recent_orders': OrderSerializer(recent_orders, many=True).data,
            'recent_payments': [
                {
                    'id': p.id,
                    'order_number': p.order.order_number,
                    'razorpay_payment_id': p.razorpay_payment_id,
                    'amount': float(p.amount),
                    'currency': p.currency,
                    'status': p.status,
                    'verified_at': p.verified_at,
                }
                for p in recent_payments
            ],
        }, status=status.HTTP_200_OK)
