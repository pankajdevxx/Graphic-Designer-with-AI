import uuid
from decimal import Decimal
from django.shortcuts import get_object_or_404
from rest_framework import views, status
from rest_framework.response import Response
from apps.products.models import Product, License
from apps.promotions.models import Coupon
from .models import CartItem
from .serializers import CartItemSerializer

def get_or_create_session_key(request):
    """
    Extracts or provisions a guest session key for cart & wishlist persistence.
    """
    session_key = request.headers.get('X-Session-Key')
    if not session_key:
        if not request.session.session_key:
            request.session.create()
        session_key = request.session.session_key or str(uuid.uuid4())
    return session_key


class CartView(views.APIView):
    """
    GET /api/v1/cart/ - Retrieve full cart summary and items.
    """
    def get(self, request):
        session_key = get_or_create_session_key(request)
        cart_items = CartItem.objects.filter(session_key=session_key).select_related('product', 'product__category')
        serializer = CartItemSerializer(cart_items, many=True)

        # Financial Calculations
        cart_count = sum(item.quantity for item in cart_items)
        subtotal = sum(item.total_price for item in cart_items)

        coupon_code = request.query_params.get('coupon', '').strip().upper()
        discount_percent = 0
        discount_amount = Decimal('0.00')

        if coupon_code:
            coupon = Coupon.objects.filter(code=coupon_code, is_active=True).first()
            if coupon:
                discount_percent = coupon.discount_percent
                discount_amount = subtotal * (Decimal(discount_percent) / Decimal(100))

        total = max(Decimal('0.00'), subtotal - discount_amount)

        response = Response({
            "session_key": session_key,
            "cart_count": cart_count,
            "subtotal": round(subtotal, 2),
            "coupon_code": coupon_code if discount_percent > 0 else None,
            "discount_percent": discount_percent,
            "discount_amount": round(discount_amount, 2),
            "total": round(total, 2),
            "items": serializer.data,
        })
        response['X-Session-Key'] = session_key
        return response


class CartItemCreateView(views.APIView):
    """
    POST /api/v1/cart/items/ - Add a product to the cart.
    """
    def post(self, request):
        session_key = get_or_create_session_key(request)
        product_id = request.data.get('product_id')
        product_slug = request.data.get('product_slug')
        license_type = request.data.get('license_type', 'Standard')
        quantity = int(request.data.get('quantity', 1))

        if not product_id and not product_slug:
            return Response(
                {"error": "product_id or product_slug is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if product_id:
            product = get_object_or_404(Product, id=product_id, status='active')
        else:
            product = get_object_or_404(Product, slug=product_slug, status='active')

        # Calculate unit price based on license multiplier
        price_multiplier = Decimal('2.5') if license_type == 'Extended' else Decimal('1.0')
        unit_price = round(product.price * price_multiplier, 2)

        # Prevent duplicate entries - update quantity if item exists
        cart_item, created = CartItem.objects.get_or_create(
            session_key=session_key,
            product=product,
            license_type=license_type,
            defaults={
                'quantity': quantity,
                'unit_price': unit_price,
            }
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.unit_price = unit_price
            cart_item.save(update_fields=['quantity', 'unit_price', 'updated_at'])

        serializer = CartItemSerializer(cart_item)
        response = Response(
            {
                "message": f"Added {product.title} to cart.",
                "item": serializer.data,
            },
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )
        response['X-Session-Key'] = session_key
        return response


class CartItemDetailView(views.APIView):
    """
    PATCH /api/v1/cart/items/{id}/ - Update quantity or license
    DELETE /api/v1/cart/items/{id}/ - Remove item from cart
    """
    def patch(self, request, pk):
        session_key = get_or_create_session_key(request)
        item = get_object_or_404(CartItem, id=pk, session_key=session_key)

        new_qty = request.data.get('quantity')
        new_license = request.data.get('license_type')

        if new_qty is not None:
            new_qty = int(new_qty)
            if new_qty <= 0:
                item.delete()
                return Response({"message": "Item removed from cart."}, status=status.HTTP_200_OK)
            item.quantity = new_qty

        if new_license is not None and new_license in ('Standard', 'Extended'):
            item.license_type = new_license
            multiplier = Decimal('2.5') if new_license == 'Extended' else Decimal('1.0')
            item.unit_price = round(item.product.price * multiplier, 2)

        item.save()
        serializer = CartItemSerializer(item)
        return Response(serializer.data)

    def delete(self, request, pk):
        session_key = get_or_create_session_key(request)
        item = get_object_or_404(CartItem, id=pk, session_key=session_key)
        item.delete()
        return Response({"message": "Item removed from cart."}, status=status.HTTP_200_OK)


class CartClearView(views.APIView):
    """
    DELETE /api/v1/cart/clear/ - Clear all items from current cart
    """
    def delete(self, request):
        session_key = get_or_create_session_key(request)
        deleted_count, _ = CartItem.objects.filter(session_key=session_key).delete()
        return Response({"message": f"Cart cleared. Removed {deleted_count} items."}, status=status.HTTP_200_OK)
