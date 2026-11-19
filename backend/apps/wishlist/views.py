from decimal import Decimal
from django.shortcuts import get_object_or_404
from rest_framework import views, status
from rest_framework.response import Response
from apps.products.models import Product
from apps.cart.models import CartItem
from apps.cart.views import get_or_create_session_key
from .models import WishlistItem, RecentlyViewed
from .serializers import WishlistItemSerializer, RecentlyViewedSerializer

class WishlistView(views.APIView):
    """
    GET /api/v1/wishlist/ - Retrieve all saved products for the current session.
    """
    def get(self, request):
        session_key = get_or_create_session_key(request)
        items = WishlistItem.objects.filter(session_key=session_key).select_related('product', 'product__category')
        serializer = WishlistItemSerializer(items, many=True)
        response = Response({
            "session_key": session_key,
            "wishlist_count": items.count(),
            "items": serializer.data,
        })
        response['X-Session-Key'] = session_key
        return response


class WishlistItemCreateView(views.APIView):
    """
    POST /api/v1/wishlist/items/ - Add or toggle a product in the wishlist.
    """
    def post(self, request):
        session_key = get_or_create_session_key(request)
        product_id = request.data.get('product_id')
        product_slug = request.data.get('product_slug')

        if not product_id and not product_slug:
            return Response(
                {"error": "product_id or product_slug is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if product_id:
            product = get_object_or_404(Product, id=product_id, status='active')
        else:
            product = get_object_or_404(Product, slug=product_slug, status='active')

        # Check if already in wishlist - toggle behaviour if requested
        existing = WishlistItem.objects.filter(session_key=session_key, product=product).first()
        if existing:
            if request.data.get('toggle', False):
                existing.delete()
                return Response(
                    {"message": f"Removed {product.title} from wishlist.", "in_wishlist": False},
                    status=status.HTTP_200_OK
                )
            return Response(
                {"message": f"{product.title} is already in your wishlist.", "in_wishlist": True},
                status=status.HTTP_200_OK
            )

        item = WishlistItem.objects.create(session_key=session_key, product=product)
        serializer = WishlistItemSerializer(item)
        response = Response(
            {
                "message": f"Added {product.title} to wishlist.",
                "in_wishlist": True,
                "item": serializer.data,
            },
            status=status.HTTP_201_CREATED
        )
        response['X-Session-Key'] = session_key
        return response


class WishlistItemDetailView(views.APIView):
    """
    DELETE /api/v1/wishlist/items/{id}/ - Remove an item from wishlist
    """
    def delete(self, request, pk):
        session_key = get_or_create_session_key(request)
        item = get_object_or_404(WishlistItem, id=pk, session_key=session_key)
        item.delete()
        return Response({"message": "Item removed from wishlist."}, status=status.HTTP_200_OK)


class WishlistMoveToCartView(views.APIView):
    """
    POST /api/v1/wishlist/move-to-cart/ - Move product from wishlist to cart
    """
    def post(self, request):
        session_key = get_or_create_session_key(request)
        product_id = request.data.get('product_id')
        product_slug = request.data.get('product_slug')
        license_type = request.data.get('license_type', 'Standard')

        if product_id:
            product = get_object_or_404(Product, id=product_id, status='active')
        else:
            product = get_object_or_404(Product, slug=product_slug, status='active')

        # Remove from wishlist
        WishlistItem.objects.filter(session_key=session_key, product=product).delete()

        # Add to cart
        multiplier = Decimal('2.5') if license_type == 'Extended' else Decimal('1.0')
        unit_price = round(product.price * multiplier, 2)

        cart_item, created = CartItem.objects.get_or_create(
            session_key=session_key,
            product=product,
            license_type=license_type,
            defaults={'quantity': 1, 'unit_price': unit_price}
        )
        if not created:
            cart_item.quantity += 1
            cart_item.save(update_fields=['quantity', 'updated_at'])

        return Response({
            "message": f"Moved {product.title} to your cart.",
            "cart_item_id": cart_item.id,
        })


class RecentlyViewedView(views.APIView):
    """
    GET /api/v1/wishlist/recently-viewed/
    POST /api/v1/wishlist/recently-viewed/
    """
    def get(self, request):
        session_key = get_or_create_session_key(request)
        recents = RecentlyViewed.objects.filter(session_key=session_key).select_related('product')[:8]
        serializer = RecentlyViewedSerializer(recents, many=True)
        return Response(serializer.data)

    def post(self, request):
        session_key = get_or_create_session_key(request)
        product_slug = request.data.get('product_slug')
        product = get_object_or_404(Product, slug=product_slug, status='active')
        rec, _ = RecentlyViewed.objects.update_or_create(
            session_key=session_key,
            product=product
        )
        return Response({"status": "recorded"}, status=status.HTTP_200_OK)
