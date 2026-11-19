from django.db import models
from apps.products.models import Product

class WishlistItem(models.Model):
    """
    Session-based Saved Wishlist Item (guest-ready, prepared for user FK in Phase 5)
    """
    session_key = models.CharField(max_length=64, db_index=True)
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='wishlist_items'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'marketplace_wishlist_items'
        unique_together = ('session_key', 'product')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.product.title} in wishlist [{self.session_key[:8]}]"


class RecentlyViewed(models.Model):
    """
    Customer Recently Viewed Design Assets
    """
    session_key = models.CharField(max_length=64, db_index=True)
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='recent_views'
    )
    viewed_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'marketplace_recently_viewed'
        unique_together = ('session_key', 'product')
        ordering = ['-viewed_at']

    def __str__(self):
        return f"{self.product.title} viewed by [{self.session_key[:8]}]"
