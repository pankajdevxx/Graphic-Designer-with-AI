from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    """
    Marketplace Design Category (15 Core Disciplines)
    """
    name = models.CharField(max_length=150, unique=True, db_index=True)
    slug = models.SlugField(max_length=180, unique=True, db_index=True)
    description = models.TextField(blank=True, default='')
    icon_name = models.CharField(max_length=100, blank=True, default='Sparkles')
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, default='')
    badge = models.CharField(max_length=50, blank=True, default='Popular')
    accent_color = models.CharField(max_length=30, default='#a855f7')
    sort_order = models.PositiveIntegerField(default=0, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'marketplace_categories'
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['sort_order', 'name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class SubCategory(models.Model):
    """
    Marketplace Sub-discipline or Design Specialization
    """
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='subcategories'
    )
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=180, db_index=True)
    description = models.TextField(blank=True, default='')
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'marketplace_subcategories'
        verbose_name = 'Sub Category'
        verbose_name_plural = 'Sub Categories'
        unique_together = ('category', 'slug')
        ordering = ['category', 'sort_order', 'name']

    def __str__(self):
        return f"{self.category.name} > {self.name}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
