from decimal import Decimal
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from apps.categories.models import Category
from apps.products.models import Product
from apps.promotions.models import Coupon
from apps.cart.models import CartItem
from apps.wishlist.models import WishlistItem

class CartAndWishlistAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.category = Category.objects.create(
            name="Brand Identity",
            slug="brand-identity",
            sort_order=1
        )

        self.product = Product.objects.create(
            title="Velox Brand Guidelines",
            slug="velox-brand-guidelines",
            category=self.category,
            price=Decimal("50.00"),
            sku="TEST-SKU-002",
            status="active"
        )

        Coupon.objects.create(
            code="PIXEL20",
            discount_percent=20,
            is_active=True
        )

    def test_cart_workflow(self):
        # 1. Add item to cart
        add_res = self.client.post('/api/v1/cart/items/', {
            "product_slug": "velox-brand-guidelines",
            "license_type": "Standard",
            "quantity": 1
        }, format='json', HTTP_X_SESSION_KEY="test-session-123")
        self.assertEqual(add_res.status_code, status.HTTP_201_CREATED)

        # 2. Get cart summary
        cart_res = self.client.get('/api/v1/cart/', HTTP_X_SESSION_KEY="test-session-123")
        self.assertEqual(cart_res.status_code, status.HTTP_200_OK)
        self.assertEqual(cart_res.data['cart_count'], 1)
        self.assertEqual(cart_res.data['subtotal'], 50.0)

        # 3. Apply coupon
        coupon_res = self.client.get('/api/v1/cart/?coupon=PIXEL20', HTTP_X_SESSION_KEY="test-session-123")
        self.assertEqual(coupon_res.data['discount_percent'], 20)
        self.assertEqual(coupon_res.data['total'], 40.0)

        # 4. Remove item
        item_id = cart_res.data['items'][0]['id']
        del_res = self.client.delete(f'/api/v1/cart/items/{item_id}/', HTTP_X_SESSION_KEY="test-session-123")
        self.assertEqual(del_res.status_code, status.HTTP_200_OK)

        # 5. Cart should be empty
        empty_res = self.client.get('/api/v1/cart/', HTTP_X_SESSION_KEY="test-session-123")
        self.assertEqual(empty_res.data['cart_count'], 0)

    def test_wishlist_workflow(self):
        # 1. Add item to wishlist
        add_res = self.client.post('/api/v1/wishlist/items/', {
            "product_slug": "velox-brand-guidelines"
        }, format='json', HTTP_X_SESSION_KEY="test-session-123")
        self.assertEqual(add_res.status_code, status.HTTP_201_CREATED)

        # 2. Retrieve wishlist
        get_res = self.client.get('/api/v1/wishlist/', HTTP_X_SESSION_KEY="test-session-123")
        self.assertEqual(get_res.status_code, status.HTTP_200_OK)
        self.assertEqual(get_res.data['wishlist_count'], 1)

        # 3. Move to cart
        move_res = self.client.post('/api/v1/wishlist/move-to-cart/', {
            "product_slug": "velox-brand-guidelines",
            "license_type": "Standard"
        }, format='json', HTTP_X_SESSION_KEY="test-session-123")
        self.assertEqual(move_res.status_code, status.HTTP_200_OK)

        # 4. Wishlist should now be empty and cart should have 1 item
        wish_after = self.client.get('/api/v1/wishlist/', HTTP_X_SESSION_KEY="test-session-123")
        self.assertEqual(wish_after.data['wishlist_count'], 0)

        cart_after = self.client.get('/api/v1/cart/', HTTP_X_SESSION_KEY="test-session-123")
        self.assertEqual(cart_after.data['cart_count'], 1)
