import uuid
from decimal import Decimal
from django.db import models
from django.contrib.auth.models import User
from apps.products.models import Product


def generate_order_number():
    return f"ORD-{uuid.uuid4().hex[:8].upper()}"


def generate_license_key():
    return f"LIC-2026-{uuid.uuid4().hex[:6].upper()}-{uuid.uuid4().hex[:4].upper()}"


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Payment'),
        ('paid', 'Paid & Processing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('unpaid', 'Unpaid'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    order_number = models.CharField(max_length=50, unique=True, default=generate_order_number, db_index=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    customer_name = models.CharField(max_length=150)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=30, blank=True, default='')
    billing_address = models.CharField(max_length=255, blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    country = models.CharField(max_length=100, blank=True, default='India')
    postal_code = models.CharField(max_length=30, blank=True, default='')

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', db_index=True)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='unpaid', db_index=True)
    payment_method = models.CharField(max_length=50, default='razorpay')

    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'))
    discount_amount = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'))
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'))
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'))
    currency = models.CharField(max_length=10, default='INR')

    razorpay_order_id = models.CharField(max_length=100, blank=True, default='', db_index=True)
    razorpay_payment_id = models.CharField(max_length=100, blank=True, default='')

    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'marketplace_orders'
        ordering = ['-created_at']
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def __str__(self):
        return f"{self.order_number} ({self.customer_name}) - {self.total_amount} {self.currency}"


class OrderItem(models.Model):
    LICENSE_CHOICES = [
        ('standard', 'Standard Commercial License (1 Project)'),
        ('extended', 'Extended Enterprise License (Unlimited)'),
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name='order_items')
    product_title = models.CharField(max_length=255)
    license_type = models.CharField(max_length=20, choices=LICENSE_CHOICES, default='standard')
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    license_key = models.CharField(max_length=60, unique=True, default=generate_license_key, db_index=True)
    download_count = models.PositiveIntegerField(default=0)
    max_downloads = models.PositiveIntegerField(default=25)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'marketplace_order_items'
        verbose_name = 'Order Item'
        verbose_name_plural = 'Order Items'

    def __str__(self):
        return f"{self.product_title} [{self.license_key}]"


class Payment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='payments')
    razorpay_order_id = models.CharField(max_length=100, db_index=True)
    razorpay_payment_id = models.CharField(max_length=100, unique=True, db_index=True)
    razorpay_signature = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=10, default='INR')
    status = models.CharField(max_length=30, default='captured')
    method = models.CharField(max_length=50, blank=True, default='')
    verified_at = models.DateTimeField(auto_now_add=True)
    raw_payload = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = 'marketplace_payments'
        ordering = ['-verified_at']
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'

    def __str__(self):
        return f"Payment {self.razorpay_payment_id} for {self.order.order_number}"


class DownloadLog(models.Model):
    order_item = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name='download_logs')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=500, blank=True, default='')
    downloaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'marketplace_download_logs'
        ordering = ['-downloaded_at']
        verbose_name = 'Download Log'
        verbose_name_plural = 'Download Logs'


class CustomDesignRequest(models.Model):
    STATUS_CHOICES = [
        ('new', 'New Request'),
        ('reviewing', 'Under Review'),
        ('quoted', 'Quotation Sent'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('declined', 'Declined'),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True, default='')
    company = models.CharField(max_length=150, blank=True, default='')
    service_category = models.CharField(max_length=100)
    budget_range = models.CharField(max_length=100)
    timeline = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    description = models.TextField()
    reference_links = models.TextField(blank=True, default='')
    attachment_url = models.URLField(max_length=500, blank=True, default='')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='new', db_index=True)
    quoted_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    admin_notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'marketplace_custom_design_requests'
        ordering = ['-created_at']
        verbose_name = 'Custom Design Request'
        verbose_name_plural = 'Custom Design Requests'

    def __str__(self):
        return f"{self.title} - {self.name} ({self.get_status_display()})"
