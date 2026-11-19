from django.urls import path
from .views import (
    BlogPostListView,
    BlogPostDetailView,
    ContactInquiryCreateView,
    NewsletterSubscribeView,
    NotificationListView,
    NotificationMarkReadView,
    AdminBlogManageView,
    AdminInquiriesManageView,
    AdminSubscribersManageView,
    AdminProductManageView,
    AdminCategoryManageView,
)

app_name = 'content'

urlpatterns = [
    # Blog / Creative Insights
    path('blog/', BlogPostListView.as_view(), name='blog_list'),
    path('blog/<slug:slug>/', BlogPostDetailView.as_view(), name='blog_detail'),

    # Public Communications
    path('contact/', ContactInquiryCreateView.as_view(), name='contact_inquiry'),
    path('newsletter/', NewsletterSubscribeView.as_view(), name='newsletter_subscribe'),

    # Notifications
    path('notifications/', NotificationListView.as_view(), name='notification_list'),
    path('notifications/read/', NotificationMarkReadView.as_view(), name='notification_mark_all_read'),
    path('notifications/<int:pk>/read/', NotificationMarkReadView.as_view(), name='notification_mark_read'),

    # Admin Management
    path('admin/blog/', AdminBlogManageView.as_view(), name='admin_blog_list'),
    path('admin/blog/<int:pk>/', AdminBlogManageView.as_view(), name='admin_blog_detail'),
    path('admin/inquiries/', AdminInquiriesManageView.as_view(), name='admin_inquiries'),
    path('admin/inquiries/<int:pk>/', AdminInquiriesManageView.as_view(), name='admin_inquiry_detail'),
    path('admin/subscribers/', AdminSubscribersManageView.as_view(), name='admin_subscribers'),
    path('admin/products/', AdminProductManageView.as_view(), name='admin_products'),
    path('admin/products/<int:pk>/', AdminProductManageView.as_view(), name='admin_product_detail'),
    path('admin/categories/', AdminCategoryManageView.as_view(), name='admin_categories'),
    path('admin/categories/<int:pk>/', AdminCategoryManageView.as_view(), name='admin_category_detail'),
]
