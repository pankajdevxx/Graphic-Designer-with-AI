from django.urls import path
from .views import BannerListView, ValidateCouponView

urlpatterns = [
    path('promotions/banners/', BannerListView.as_view(), name='promotions-banners'),
    path('promotions/validate-coupon/', ValidateCouponView.as_view(), name='validate-coupon'),
]
