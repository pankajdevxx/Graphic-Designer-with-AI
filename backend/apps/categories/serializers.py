from rest_framework import serializers
from .models import Category, SubCategory

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'slug', 'description', 'sort_order', 'is_active']


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(read_only=True)
    subcategories = SubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'icon_name',
            'image_url',
            'badge',
            'accent_color',
            'sort_order',
            'is_active',
            'product_count',
            'subcategories',
            'created_at',
        ]
