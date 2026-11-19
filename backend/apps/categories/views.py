from django.db.models import Count, Q
from rest_framework import viewsets
from .models import Category
from .serializers import CategorySerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for retrieving all 15 categories with product counts and details.
    Endpoints:
    - GET /api/v1/categories/
    - GET /api/v1/categories/{slug}/
    """
    lookup_field = 'slug'
    serializer_class = CategorySerializer
    pagination_class = None  # Categories directory returns full list without page chunking

    def get_queryset(self):
        return (
            Category.objects.filter(is_active=True)
            .annotate(
                product_count=Count('products', filter=Q(products__status='active'))
            )
            .prefetch_related('subcategories')
            .order_by('sort_order', 'name')
        )
