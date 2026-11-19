from django.urls import path
from .views import (
    CheckoutCreateOrderView,
    VerifyPaymentView,
    UserOrdersView,
    UserOrderDetailView,
    UserDownloadsView,
    DownloadAssetView,
    CustomDesignRequestCreateView,
    AdminOrdersListView,
    AdminOrderDetailView,
    AdminCustomRequestsView,
    AdminAnalyticsView,
)

app_name = 'orders'

urlpatterns = [
    # Checkout and Payment Processing
    path('orders/checkout/', CheckoutCreateOrderView.as_view(), name='checkout_create_order'),
    path('orders/verify-payment/', VerifyPaymentView.as_view(), name='verify_payment'),

    # User Order History & Downloads
    path('orders/my-orders/', UserOrdersView.as_view(), name='my_orders'),
    path('orders/my-downloads/', UserDownloadsView.as_view(), name='my_downloads'),
    path('orders/detail/<str:order_number>/', UserOrderDetailView.as_view(), name='order_detail'),
    path('orders/downloads/<str:license_key>/', DownloadAssetView.as_view(), name='download_asset'),

    # Custom Design Commission Requests
    path('orders/custom-request/', CustomDesignRequestCreateView.as_view(), name='custom_design_request'),

    # Admin Management
    path('orders/admin/orders/', AdminOrdersListView.as_view(), name='admin_orders_list'),
    path('orders/admin/orders/<int:pk>/', AdminOrderDetailView.as_view(), name='admin_orders_detail'),
    path('orders/admin/custom-requests/', AdminCustomRequestsView.as_view(), name='admin_custom_requests_list'),
    path('orders/admin/custom-requests/<int:pk>/', AdminCustomRequestsView.as_view(), name='admin_custom_requests_detail'),
    path('orders/admin/analytics/', AdminAnalyticsView.as_view(), name='admin_analytics'),
]
