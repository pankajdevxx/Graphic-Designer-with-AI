from decimal import Decimal
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from apps.categories.models import Category
from apps.products.models import Product, ProductImage, Tag
from apps.reviews.models import ProductReview

class MarketplaceAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create Category
        self.category = Category.objects.create(
            name="Logo Design",
            slug="logo-design",
            description="Minimal vector logos.",
            badge="Popular",
            sort_order=1
        )

        # Create Product
        self.product = Product.objects.create(
            title="Lumina Geometric Logo",
            slug="lumina-geometric-logo",
            category=self.category,
            price=Decimal("39.00"),
            original_price=Decimal("69.00"),
            sku="TEST-SKU-001",
            status="active",
            is_featured=True,
            is_trending=True,
            is_new=True,
            description="Test logo product description.",
            file_formats=["AI", "SVG"],
            software_compatibility=["Adobe Illustrator"],
            average_rating=Decimal("4.9"),
            review_count=10
        )

        ProductImage.objects.create(
            product=self.product,
            image_url="https://example.com/test-img.jpg",
            is_primary=True,
            sort_order=1
        )

        tag = Tag.objects.create(name="Vector", slug="vector")
        self.product.tags.add(tag)

        ProductReview.objects.create(
            product=self.product,
            author_name="Alice Designer",
            rating=5,
            title="Great asset",
            comment="Loved it!",
            is_approved=True
        )

    def test_get_categories_list(self):
        response = self.client.get('/api/v1/categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['slug'], 'logo-design')
        self.assertEqual(response.data[0]['product_count'], 1)

    def test_get_category_detail(self):
        response = self.client.get('/api/v1/categories/logo-design/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Logo Design')

    def test_get_products_list(self):
        response = self.client.get('/api/v1/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['slug'], 'lumina-geometric-logo')

    def test_get_product_detail(self):
        response = self.client.get('/api/v1/products/lumina-geometric-logo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Lumina Geometric Logo')
        self.assertEqual(len(response.data['preview_images']), 1)

    def test_product_search(self):
        response = self.client.get('/api/v1/products/?q=Geometric')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)

        response_empty = self.client.get('/api/v1/products/?q=NonExistentKeywordXYZ')
        self.assertEqual(response_empty.status_code, status.HTTP_200_OK)
        self.assertEqual(response_empty.data['count'], 0)

    def test_featured_and_trending_actions(self):
        res_feat = self.client.get('/api/v1/products/featured/')
        self.assertEqual(res_feat.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res_feat.data), 1)

        res_trend = self.client.get('/api/v1/products/trending/')
        self.assertEqual(res_trend.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res_trend.data), 1)

    def test_product_reviews_list_and_create(self):
        res_revs = self.client.get('/api/v1/products/lumina-geometric-logo/reviews/')
        self.assertEqual(res_revs.status_code, status.HTTP_200_OK)
        self.assertEqual(res_revs.data['total_reviews'], 1)

        # Submit new review
        res_post = self.client.post('/api/v1/products/lumina-geometric-logo/reviews/', {
            "author_name": "Bob Reviewer",
            "rating": 4,
            "title": "Good quality",
            "comment": "Nice paths and layers."
        }, format='json')
        self.assertEqual(res_post.status_code, status.HTTP_201_CREATED)
