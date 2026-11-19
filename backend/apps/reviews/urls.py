from django.urls import path
from .views import ProductReviewsAPIView

urlpatterns = [
    path('products/<str:slug>/reviews/', ProductReviewsAPIView.as_view(), name='product-reviews'),
]
