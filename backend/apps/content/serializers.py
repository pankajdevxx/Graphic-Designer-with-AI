from rest_framework import serializers
from .models import BlogPost, ContactInquiry, NewsletterSubscriber, Notification
from apps.products.models import Product, ProductImage
from apps.categories.models import Category


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'


class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']


class AdminContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = '__all__'


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'is_active', 'subscribed_at']
        read_only_fields = ['id', 'subscribed_at']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


class AdminProductManageSerializer(serializers.ModelSerializer):
    category_title = serializers.CharField(source='category.name', read_only=True)
    images_count = serializers.IntegerField(source='images.count', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'title',
            'slug',
            'category',
            'category_title',
            'price',
            'original_price',
            'discount',
            'sku',
            'status',
            'short_description',
            'description',
            'file_formats',
            'is_featured',
            'is_trending',
            'sales_count',
            'average_rating',
            'review_count',
            'images_count',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'sales_count', 'average_rating', 'review_count', 'created_at', 'updated_at']
