from django.urls import path
from .views import (
    WishlistView,
    WishlistItemCreateView,
    WishlistItemDetailView,
    WishlistMoveToCartView,
    RecentlyViewedView,
)

urlpatterns = [
    path('wishlist/', WishlistView.as_view(), name='wishlist-summary'),
    path('wishlist/items/', WishlistItemCreateView.as_view(), name='wishlist-item-create'),
    path('wishlist/items/<int:pk>/', WishlistItemDetailView.as_view(), name='wishlist-item-detail'),
    path('wishlist/move-to-cart/', WishlistMoveToCartView.as_view(), name='wishlist-move-to-cart'),
    path('wishlist/recently-viewed/', RecentlyViewedView.as_view(), name='wishlist-recently-viewed'),
]
