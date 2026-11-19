from decimal import Decimal
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Count
from rest_framework import generics, status
from rest_framework.response import Response
from apps.products.models import Product
from .models import ProductReview
from .serializers import ProductReviewSerializer

class ProductReviewsAPIView(generics.ListCreateAPIView):
    """
    API endpoint to list and submit reviews for a specific product.
    Endpoint:
    - GET /api/v1/products/{slug}/reviews/
    - POST /api/v1/products/{slug}/reviews/
    """
    serializer_class = ProductReviewSerializer

    def get_product(self):
        slug_or_id = self.kwargs.get('slug')
        if slug_or_id and slug_or_id.isdigit():
            return get_object_or_404(Product, id=int(slug_or_id))
        return get_object_or_404(Product, slug=slug_or_id)

    def get_queryset(self):
        product = self.get_product()
        return ProductReview.objects.filter(product=product, is_approved=True).order_by('-created_at')

    def list(self, request, *args, **kwargs):
        product = self.get_product()
        reviews = self.get_queryset()
        serializer = self.get_serializer(reviews, many=True)

        # Rating Distribution breakdown (1 to 5 stars)
        distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        for rev in reviews:
            if rev.rating in distribution:
                distribution[rev.rating] += 1

        total_reviews = reviews.count()
        avg_rating = reviews.aggregate(Avg('rating'))['rating__avg'] or 5.0

        return Response({
            "product_slug": product.slug,
            "product_title": product.title,
            "average_rating": round(float(avg_rating), 1),
            "total_reviews": total_reviews,
            "distribution": distribution,
            "reviews": serializer.data,
        })

    def perform_create(self, serializer):
        product = self.get_product()
        review = serializer.save(product=product, is_approved=True)

        # Recalculate and update product rating and count
        all_revs = ProductReview.objects.filter(product=product, is_approved=True)
        avg = all_revs.aggregate(Avg('rating'))['rating__avg'] or 5.0
        product.average_rating = round(Decimal(avg), 2)
        product.review_count = all_revs.count()
        product.save(update_fields=['average_rating', 'review_count'])
