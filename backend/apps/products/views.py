from decimal import Decimal
from django.db.models import Q
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Product, ProductImage, Tag, License
from .serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
    ProductCreateUpdateSerializer,
    ProductImageSerializer,
    LicenseSerializer,
)

class StandardProductPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 50


class ProductViewSet(viewsets.ModelViewSet):
    """
    Comprehensive Product Management & Discovery ViewSet.
    Endpoints:
    - GET /api/v1/products/ (Search, filter, and sort)
    - POST /api/v1/products/ (Create product)
    - GET /api/v1/products/{slug_or_id}/ (Product detail)
    - PATCH /api/v1/products/{id}/ (Update product)
    - DELETE /api/v1/products/{id}/ (Delete product)
    - GET /api/v1/products/featured/
    - GET /api/v1/products/trending/
    - GET /api/v1/products/new-arrivals/
    - GET /api/v1/products/search/
    - GET /api/v1/products/{slug}/related/
    """
    pagination_class = StandardProductPagination
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = (
            Product.objects.filter(status='active')
            .select_related('category', 'subcategory')
            .prefetch_related('images', 'tags')
        )

        params = self.request.query_params

        # 1. Full-text Multi-field Search
        search_query = params.get('q', '').strip()
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(short_description__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(category__name__icontains=search_query) |
                Q(category__slug__icontains=search_query) |
                Q(tags__name__icontains=search_query)
            ).distinct()

        # 2. Category Filter
        category_param = params.get('category', '').strip()
        if category_param and category_param.lower() != 'all':
            queryset = queryset.filter(
                Q(category__slug__iexact=category_param) |
                Q(category__name__iexact=category_param)
            )

        # 3. Price Range Filter
        min_price = params.get('min_price')
        if min_price is not None:
            try:
                queryset = queryset.filter(price__gte=Decimal(min_price))
            except (ValueError, TypeError):
                pass

        max_price = params.get('max_price')
        if max_price is not None:
            try:
                queryset = queryset.filter(price__lte=Decimal(max_price))
            except (ValueError, TypeError):
                pass

        # 4. Rating Filter
        min_rating = params.get('min_rating')
        if min_rating is not None:
            try:
                queryset = queryset.filter(average_rating__gte=Decimal(min_rating))
            except (ValueError, TypeError):
                pass

        # 5. Merchandising Flags
        if params.get('featured') in ('true', '1', 'True'):
            queryset = queryset.filter(is_featured=True)
        if params.get('trending') in ('true', '1', 'True'):
            queryset = queryset.filter(is_trending=True)
        if params.get('on_sale') in ('true', '1', 'True'):
            queryset = queryset.filter(on_sale=True)
        if params.get('is_new') in ('true', '1', 'True'):
            queryset = queryset.filter(is_new=True)

        # 6. Sorting
        sort_by = params.get('sort', 'popular')
        if sort_by == 'price_asc' or sort_by == 'price-low':
            queryset = queryset.order_by('price')
        elif sort_by == 'price_desc' or sort_by == 'price-high':
            queryset = queryset.order_by('-price')
        elif sort_by == 'rating':
            queryset = queryset.order_by('-average_rating', '-review_count')
        elif sort_by == 'newest':
            queryset = queryset.order_by('-created_at')
        elif sort_by == 'oldest':
            queryset = queryset.order_by('created_at')
        else:
            # Popular default
            queryset = queryset.order_by('-review_count', '-sales_count')

        return queryset

    def get_serializer_class(self):
        if self.action in ('list', 'featured', 'trending', 'new_arrivals', 'search'):
            return ProductListSerializer
        elif self.action == 'retrieve':
            return ProductDetailSerializer
        elif self.action in ('create', 'update', 'partial_update'):
            return ProductCreateUpdateSerializer
        return ProductDetailSerializer

    def retrieve(self, request, *args, **kwargs):
        # Support lookup by both slug and numeric ID
        lookup_value = kwargs.get('slug')
        if lookup_value and lookup_value.isdigit():
            try:
                instance = Product.objects.get(id=int(lookup_value))
                serializer = self.get_serializer(instance)
                # Increment views counter
                Product.objects.filter(id=instance.id).update(views_count=instance.views_count + 1)
                return Response(serializer.data)
            except Product.DoesNotExist:
                pass

        response = super().retrieve(request, *args, **kwargs)
        # Increment views counter
        Product.objects.filter(slug=lookup_value).update(views_count=Product.objects.get(slug=lookup_value).views_count + 1)
        return response

    @action(detail=False, methods=['get'])
    def featured(self, request):
        limit = int(request.query_params.get('limit', 8))
        queryset = Product.objects.filter(status='active', is_featured=True).order_by('-average_rating')[:limit]
        serializer = ProductListSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def trending(self, request):
        limit = int(request.query_params.get('limit', 8))
        queryset = Product.objects.filter(status='active', is_trending=True).order_by('-sales_count')[:limit]
        serializer = ProductListSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='new-arrivals')
    def new_arrivals(self, request):
        limit = int(request.query_params.get('limit', 8))
        queryset = Product.objects.filter(status='active', is_new=True).order_by('-created_at')[:limit]
        serializer = ProductListSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def search(self, request):
        return self.list(request)

    @action(detail=True, methods=['get'])
    def related(self, request, slug=None):
        product = self.get_object()
        limit = int(request.query_params.get('limit', 4))
        related = (
            Product.objects.filter(category=product.category, status='active')
            .exclude(id=product.id)
            .order_by('-average_rating')[:limit]
        )
        serializer = ProductListSerializer(related, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def licenses(self, request):
        licenses = License.objects.filter(is_active=True).order_by('price_multiplier')
        serializer = LicenseSerializer(licenses, many=True)
        return Response(serializer.data)
