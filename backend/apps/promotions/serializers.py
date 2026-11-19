from rest_framework import serializers
from .models import Banner, Coupon

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = [
            'id',
            'title',
            'subtitle',
            'badge',
            'link_url',
            'image_url',
            'coupon_code',
            'discount_text',
            'is_active',
            'sort_order',
        ]


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = [
            'id',
            'code',
            'discount_percent',
            'description',
            'is_active',
        ]
