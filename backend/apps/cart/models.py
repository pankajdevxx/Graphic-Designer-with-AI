from django.db import models
from apps.products.models import Product

class CartItem(models.Model):
    """
    Session-based Persistent Cart Item (guest-ready, prepared for user FK in Phase 5)
    """
    session_key = models.CharField(max_length=64, db_index=True)
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='cart_items'
    )
    license_type = models.CharField(max_length=50, default='Standard')  # Standard or Extended
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'marketplace_cart_items'
        unique_together = ('session_key', 'product', 'license_type')
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.quantity}x {self.product.title} ({self.license_type}) [{self.session_key[:8]}]"

    @property
    def total_price(self):
        return self.unit_price * self.quantity
