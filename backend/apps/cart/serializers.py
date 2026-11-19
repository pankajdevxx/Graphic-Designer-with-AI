from decimal import Decimal
from rest_framework import serializers
from apps.products.models import Product
from apps.products.serializers import ProductListSerializer
from .models import CartItem

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.filter(status='active'),
        write_only=True,
        source='product'
    )
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = [
            'id',
            'product',
            'product_id',
            'license_type',
            'quantity',
            'unit_price',
            'total_price',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'unit_price', 'total_price', 'created_at', 'updated_at']

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError("Quantity must be at least 1.")
        if value > 100:
            raise serializers.ValidationError("Maximum 100 licenses per order.")
        return value
