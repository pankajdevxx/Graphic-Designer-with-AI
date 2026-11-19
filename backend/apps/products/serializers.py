from rest_framework import serializers
from apps.categories.models import Category
from apps.categories.serializers import CategorySerializer
from .models import (
    Product, ProductImage, ProductFile, Tag, License,
    ProductVariant, ProductAttributeValue, Collection
)

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image_url', 'alt_text', 'is_primary', 'sort_order']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


class LicenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = License
        fields = ['id', 'name', 'slug', 'price_multiplier', 'description', 'terms']


class ProductListSerializer(serializers.ModelSerializer):
    """
    Lightweight serializer for product grids, searches, and catalog browsing
    """
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    preview_images = serializers.SerializerMethodField()
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')

    class Meta:
        model = Product
        fields = [
            'id',
            'title',
            'slug',
            'category_name',
            'category_slug',
            'price',
            'original_price',
            'discount',
            'sku',
            'is_featured',
            'is_trending',
            'is_new',
            'on_sale',
            'average_rating',
            'review_count',
            'sales_count',
            'sales_label',
            'preview_images',
            'file_formats',
            'software_compatibility',
            'dimensions',
            'tags',
            'created_at',
        ]

    def get_preview_images(self, obj):
        # Return image_url list sorted by sort_order
        images = obj.images.all()
        return [img.image_url for img in images if img.image_url]


class ProductDetailSerializer(serializers.ModelSerializer):
    """
    Comprehensive serializer for detailed product pages
    """
    category = CategorySerializer(read_only=True)
    preview_images = serializers.SerializerMethodField()
    images = ProductImageSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    related_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'title',
            'slug',
            'short_description',
            'description',
            'category',
            'price',
            'original_price',
            'discount',
            'sku',
            'status',
            'is_featured',
            'is_trending',
            'is_new',
            'on_sale',
            'file_formats',
            'software_compatibility',
            'dimensions',
            'license_type',
            'what_included',
            'features',
            'sales_count',
            'sales_label',
            'views_count',
            'average_rating',
            'review_count',
            'preview_images',
            'images',
            'tags',
            'related_products',
            'created_at',
            'updated_at',
        ]

    def get_preview_images(self, obj):
        images = obj.images.all()
        return [img.image_url for img in images if img.image_url]

    def get_related_products(self, obj):
        related = Product.objects.filter(
            category=obj.category,
            status='active'
        ).exclude(id=obj.id).order_by('-average_rating')[:4]
        return ProductListSerializer(related, many=True).data


class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and updating products with validation
    """
    class Meta:
        model = Product
        fields = [
            'id',
            'title',
            'slug',
            'short_description',
            'description',
            'category',
            'subcategory',
            'price',
            'original_price',
            'discount',
            'sku',
            'status',
            'is_featured',
            'is_trending',
            'is_new',
            'file_formats',
            'software_compatibility',
            'dimensions',
            'license_type',
            'what_included',
            'features',
        ]

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than zero.")
        return value

    def validate_sku(self, value):
        instance = getattr(self, 'instance', None)
        if Product.objects.filter(sku=value).exclude(id=instance.id if instance else None).exists():
            raise serializers.ValidationError("A product with this SKU already exists.")
        return value
