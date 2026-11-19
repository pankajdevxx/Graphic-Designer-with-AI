from decimal import Decimal
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from apps.categories.models import Category
from apps.products.models import Product
from apps.orders.models import Order, OrderItem
from apps.orders.razorpay_client import razorpay_client


class OrdersAndPaymentTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(
            name='Logo Design',
            slug='logo-design',
            description='Test category'
        )
        self.product = Product.objects.create(
            category=self.category,
            title='Cyberpunk Vector Logo Kit',
            slug='cyberpunk-vector-logo-kit',
            sku='TEST-CYBER-001',
            price=Decimal('49.00'),
            description='Test product description',
            status='active'
        )

    def test_checkout_and_payment_verification(self):
        # 1. Checkout Create Order
        checkout_payload = {
            'customer_name': 'Dev Tester',
            'customer_email': 'dev@pixelgen.com',
            'customer_phone': '+91 99999 88888',
            'items': [
                {
                    'product_id': self.product.id,
                    'quantity': 1,
                    'license_type': 'standard',
                }
            ]
        }
        checkout_res = self.client.post('/api/v1/orders/checkout/', checkout_payload, format='json')
        self.assertEqual(checkout_res.status_code, status.HTTP_201_CREATED)
        self.assertIn('order', checkout_res.data)
        self.assertIn('razorpay', checkout_res.data)

        order_number = checkout_res.data['order']['order_number']
        razorpay_order_id = checkout_res.data['razorpay']['order_id']
        razorpay_payment_id = 'pay_test_payment_123'

        # Generate cryptographic HMAC-SHA256 signature matching backend secret
        import hmac, hashlib
        from django.conf import settings
        secret = getattr(settings, 'RAZORPAY_KEY_SECRET', 'pixelgen_secret_demo_test').encode('utf-8')
        msg = f"{razorpay_order_id}|{razorpay_payment_id}".encode('utf-8')
        real_signature = hmac.new(secret, msg, hashlib.sha256).hexdigest()

        # 2. Verify Payment
        verify_payload = {
            'order_number': order_number,
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_signature': real_signature,
        }
        verify_res = self.client.post('/api/v1/orders/verify-payment/', verify_payload, format='json')
        self.assertEqual(verify_res.status_code, status.HTTP_200_OK)
        self.assertEqual(verify_res.data['order']['payment_status'], 'paid')

        # 3. Test Download License Certificate & Asset
        order = Order.objects.get(order_number=order_number)
        item = order.items.first()
        license_key = item.license_key

        dl_res = self.client.get(f'/api/v1/orders/downloads/{license_key}/')
        self.assertEqual(dl_res.status_code, status.HTTP_200_OK)
        self.assertEqual(dl_res['Content-Type'], 'application/zip')
