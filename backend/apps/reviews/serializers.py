from rest_framework import serializers
from .models import ProductReview

class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = [
            'id',
            'author_name',
            'avatar_url',
            'rating',
            'title',
            'comment',
            'is_verified_buyer',
            'helpful_count',
            'created_at',
        ]
        read_only_fields = ['id', 'is_verified_buyer', 'helpful_count', 'created_at']

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be an integer between 1 and 5.")
        return value
