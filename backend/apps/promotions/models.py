from django.db import models

class Banner(models.Model):
    """
    Promotional Hero or Campaign Banner
    """
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True, default='')
    badge = models.CharField(max_length=100, blank=True, default='Limited Offer')
    link_url = models.CharField(max_length=300, default='/marketplace/products')
    image_url = models.URLField(max_length=600, blank=True, default='')
    coupon_code = models.CharField(max_length=50, blank=True, default='PIXEL20')
    discount_text = models.CharField(max_length=100, default='20% OFF')
    is_active = models.BooleanField(default=True, db_index=True)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'marketplace_promotional_banners'
        ordering = ['sort_order', '-created_at']

    def __str__(self):
        return self.title


class Coupon(models.Model):
    """
    Discount Promotional Coupon
    """
    code = models.CharField(max_length=50, unique=True, db_index=True)
    discount_percent = models.PositiveIntegerField(help_text="Percentage discount (e.g. 20 for 20%)")
    description = models.CharField(max_length=255, blank=True, default='')
    is_active = models.BooleanField(default=True, db_index=True)
    valid_from = models.DateTimeField(null=True, blank=True)
    valid_to = models.DateTimeField(null=True, blank=True)
    max_uses = models.PositiveIntegerField(null=True, blank=True)
    times_used = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'marketplace_coupons'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.code} (-{self.discount_percent}%)"

    def save(self, *args, **kwargs):
        self.code = self.code.strip().upper()
        super().save(*args, **kwargs)
