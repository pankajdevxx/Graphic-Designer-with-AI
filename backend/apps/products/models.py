from django.db import models
from django.utils.text import slugify
from apps.categories.models import Category, SubCategory

class Tag(models.Model):
    """
    Search and Discovery Tag
    """
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=100, unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'marketplace_tags'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class License(models.Model):
    """
    Digital Asset Commercial License Types
    """
    name = models.CharField(max_length=100, unique=True)  # Standard, Extended Commercial
    slug = models.SlugField(max_length=120, unique=True)
    price_multiplier = models.DecimalField(max_digits=4, decimal_places=2, default=1.0)
    description = models.TextField(blank=True, default='')
    terms = models.TextField(blank=True, default='')
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'marketplace_licenses'
        ordering = ['price_multiplier']

    def __str__(self):
        return f"{self.name} ({self.price_multiplier}x)"


class Product(models.Model):
    """
    Digital Design Asset Product
    """
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('draft', 'Draft'),
        ('archived', 'Archived'),
    )

    title = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    short_description = models.CharField(max_length=500, blank=True, default='')
    description = models.TextField()
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products',
        db_index=True
    )
    subcategory = models.ForeignKey(
        SubCategory,
        on_delete=models.SET_NULL,
        related_name='products',
        null=True,
        blank=True
    )
    price = models.DecimalField(max_digits=10, decimal_places=2, db_index=True)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    discount = models.PositiveIntegerField(default=0, help_text="Discount percentage")
    sku = models.CharField(max_length=64, unique=True, db_index=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active', db_index=True)

    # Merchandising flags
    is_featured = models.BooleanField(default=False, db_index=True)
    is_trending = models.BooleanField(default=False, db_index=True)
    is_new = models.BooleanField(default=True, db_index=True)
    on_sale = models.BooleanField(default=False, db_index=True)

    # Technical Specifications
    file_formats = models.JSONField(default=list, blank=True, help_text="['AI', 'PSD', 'Figma', 'SVG']")
    software_compatibility = models.JSONField(default=list, blank=True, help_text="['Adobe Illustrator', 'Figma']")
    dimensions = models.CharField(max_length=150, default='Scalable Vector (Infinite)')
    license_type = models.CharField(max_length=150, default='Standard Commercial License included')
    what_included = models.JSONField(default=list, blank=True)
    features = models.JSONField(default=list, blank=True)

    # Metrics & discovery
    tags = models.ManyToManyField(Tag, through='ProductTag', related_name='products', blank=True)
    sales_count = models.PositiveIntegerField(default=0)
    sales_label = models.CharField(max_length=50, default='1.2k')
    views_count = models.PositiveIntegerField(default=0)
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.0, db_index=True)
    review_count = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'marketplace_products'
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if self.original_price and self.original_price > self.price:
            self.on_sale = True
            calc_discount = int(((self.original_price - self.price) / self.original_price) * 100)
            self.discount = max(0, calc_discount)
        super().save(*args, **kwargs)


class ProductImage(models.Model):
    """
    Multiple Preview Images per Product
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    image_url = models.URLField(max_length=600, blank=True, default='', help_text="Remote or CDN image URL")
    alt_text = models.CharField(max_length=255, blank=True, default='')
    is_primary = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'marketplace_product_images'
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f"Image for {self.product.title} (Order {self.sort_order})"


class ProductFile(models.Model):
    """
    Deliverable Asset Packages (.ZIP, source vector, mockups)
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='files')
    file_name = models.CharField(max_length=255)
    file_format = models.CharField(max_length=30, default='ZIP')
    file_size_display = models.CharField(max_length=50, default='45 MB')
    file_url = models.URLField(max_length=600, blank=True, default='')
    version = models.CharField(max_length=20, default='1.0')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'marketplace_product_files'
        ordering = ['file_name']

    def __str__(self):
        return f"{self.file_name} ({self.file_format})"


class ProductTag(models.Model):
    """
    Product-Tag Many-to-Many Bridge
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    class Meta:
        db_table = 'marketplace_product_tags'
        unique_together = ('product', 'tag')

    def __str__(self):
        return f"{self.product.title} <-> {self.tag.name}"


class ProductVariant(models.Model):
    """
    Specialized Product Variant or License Package
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    name = models.CharField(max_length=150)
    sku = models.CharField(max_length=64, unique=True)
    price_adjustment = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'marketplace_product_variants'

    def __str__(self):
        return f"{self.product.title} - {self.name}"


class ProductAttribute(models.Model):
    """
    Dynamic Product Technical Attributes (e.g. Color Space, DPI, Resolution)
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True)

    class Meta:
        db_table = 'marketplace_product_attributes'

    def __str__(self):
        return self.name


class ProductAttributeValue(models.Model):
    """
    Values for Product Technical Attributes
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='attribute_values')
    attribute = models.ForeignKey(ProductAttribute, on_delete=models.CASCADE)
    value = models.CharField(max_length=255)

    class Meta:
        db_table = 'marketplace_product_attribute_values'
        unique_together = ('product', 'attribute')

    def __str__(self):
        return f"{self.product.title}: {self.attribute.name} = {self.value}"


class Collection(models.Model):
    """
    Curated Marketplace Design Collections
    """
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    description = models.TextField(blank=True, default='')
    cover_image = models.URLField(max_length=600, blank=True, default='')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'marketplace_collections'

    def __str__(self):
        return self.title


class CollectionProduct(models.Model):
    """
    Collection to Product mapping
    """
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'marketplace_collection_products'
        unique_together = ('collection', 'product')
        ordering = ['sort_order']
