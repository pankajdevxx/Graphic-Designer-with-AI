from rest_framework import serializers
from apps.products.models import Product
from .models import Order, OrderItem, Payment, DownloadLog, CustomDesignRequest


class OrderItemSerializer(serializers.ModelSerializer):
    product_slug = serializers.CharField(source='product.slug', read_only=True)
    product_thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            'id',
            'product',
            'product_title',
            'product_slug',
            'product_thumbnail',
            'license_type',
            'unit_price',
            'quantity',
            'total_price',
            'license_key',
            'download_count',
            'max_downloads',
            'created_at',
        ]
        read_only_fields = ['license_key', 'download_count', 'max_downloads', 'created_at']

    def get_product_thumbnail(self, obj):
        if obj.product:
            first_img = obj.product.images.first()
            if first_img:
                return first_img.image_url or (first_img.image.url if first_img.image else '')
        return ''


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'order_number',
            'customer_name',
            'customer_email',
            'customer_phone',
            'billing_address',
            'city',
            'country',
            'postal_code',
            'status',
            'payment_status',
            'payment_method',
            'subtotal',
            'discount_amount',
            'tax_amount',
            'total_amount',
            'currency',
            'razorpay_order_id',
            'notes',
            'created_at',
            'items',
        ]
        read_only_fields = [
            'id',
            'order_number',
            'status',
            'payment_status',
            'razorpay_order_id',
            'created_at',
        ]


class CheckoutItemInputSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1, min_value=1)
    license_type = serializers.ChoiceField(choices=['standard', 'extended'], default='standard')


class CheckoutSerializer(serializers.Serializer):
    customer_name = serializers.CharField(max_length=150)
    customer_email = serializers.EmailField()
    customer_phone = serializers.CharField(max_length=30, required=False, allow_blank=True, default='')
    billing_address = serializers.CharField(max_length=255, required=False, allow_blank=True, default='')
    city = serializers.CharField(max_length=100, required=False, allow_blank=True, default='')
    country = serializers.CharField(max_length=100, required=False, allow_blank=True, default='India')
    postal_code = serializers.CharField(max_length=30, required=False, allow_blank=True, default='')
    items = CheckoutItemInputSerializer(many=True)
    coupon_code = serializers.CharField(required=False, allow_blank=True, default='')
    notes = serializers.CharField(required=False, allow_blank=True, default='')


class VerifyPaymentSerializer(serializers.Serializer):
    order_number = serializers.CharField(max_length=50)
    razorpay_order_id = serializers.CharField(max_length=100)
    razorpay_payment_id = serializers.CharField(max_length=100)
    razorpay_signature = serializers.CharField(max_length=255)


class CustomDesignRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomDesignRequest
        fields = [
            'id',
            'name',
            'email',
            'phone',
            'company',
            'service_category',
            'budget_range',
            'timeline',
            'title',
            'description',
            'reference_links',
            'attachment_url',
            'status',
            'quoted_amount',
            'created_at',
        ]
        read_only_fields = ['id', 'status', 'quoted_amount', 'created_at']


class AdminCustomDesignRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomDesignRequest
        fields = '__all__'
