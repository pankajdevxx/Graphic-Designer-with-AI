"""
URL configuration for PixelGenCreativity project.
Includes Phase 1 telemetry and Phase 4 Marketplace REST API v1.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# API v1 Router aggregates
api_v1_patterns = [
    path('auth/', include('apps.users.urls')),
    path('', include('apps.categories.urls')),
    path('', include('apps.products.urls')),
    path('', include('apps.reviews.urls')),
    path('', include('apps.cart.urls')),
    path('', include('apps.wishlist.urls')),
    path('', include('apps.promotions.urls')),
    path('', include('apps.orders.urls')),
    path('', include('apps.content.urls')),
]

urlpatterns = [
    # Admin Interface
    path('admin/', admin.site.urls),

    # Phase 4 & Phase 5 REST API v1
    path('api/v1/', include(api_v1_patterns)),

    # Legacy & Telemetry Health Probe Endpoints
    path('api/', include('apps.core.urls', namespace='core')),
    path('api/creations/', include('apps.creations.urls', namespace='creations')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
