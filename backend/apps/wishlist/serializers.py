from rest_framework import serializers
from apps.products.models import Product
from apps.products.serializers import ProductListSerializer
from .models import WishlistItem, RecentlyViewed

class WishlistItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.filter(status='active'),
        write_only=True,
        source='product'
    )

    class Meta:
        model = WishlistItem
        fields = ['id', 'product', 'product_id', 'created_at']
        read_only_fields = ['id', 'created_at']


class RecentlyViewedSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)

    class Meta:
        model = RecentlyViewed
        fields = ['id', 'product', 'viewed_at']
