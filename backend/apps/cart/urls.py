from django.urls import path
from .views import CartView, CartItemCreateView, CartItemDetailView, CartClearView

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart-summary'),
    path('cart/items/', CartItemCreateView.as_view(), name='cart-item-create'),
    path('cart/items/<int:pk>/', CartItemDetailView.as_view(), name='cart-item-detail'),
    path('cart/clear/', CartClearView.as_view(), name='cart-clear'),
]
