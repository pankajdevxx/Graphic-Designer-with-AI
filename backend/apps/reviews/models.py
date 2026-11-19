from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.products.models import Product

class ProductReview(models.Model):
    """
    Customer Reviews and Ratings
    """
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='reviews',
        db_index=True
    )
    author_name = models.CharField(max_length=150)
    author_email = models.EmailField(blank=True, default='')
    avatar_url = models.URLField(max_length=500, blank=True, default='')
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Rating score between 1 and 5"
    )
    title = models.CharField(max_length=200, blank=True, default='')
    comment = models.TextField()
    is_verified_buyer = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=True, db_index=True)
    helpful_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'marketplace_product_reviews'
        verbose_name = 'Product Review'
        verbose_name_plural = 'Product Reviews'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.rating}★ by {self.author_name} on {self.product.title}"
