from rest_framework import generics, views, status
from rest_framework.response import Response
from .models import Banner, Coupon
from .serializers import BannerSerializer, CouponSerializer

class BannerListView(generics.ListAPIView):
    """
    GET /api/v1/promotions/banners/ - Retrieve active promotional banners
    """
    serializer_class = BannerSerializer
    pagination_class = None

    def get_queryset(self):
        return Banner.objects.filter(is_active=True).order_by('sort_order', '-created_at')


class ValidateCouponView(views.APIView):
    """
    POST /api/v1/promotions/validate-coupon/
    Body: {"code": "PIXEL20"}
    """
    def post(self, request):
        code = request.data.get('code', '').strip().upper()
        if not code:
            return Response({"error": "Coupon code is required."}, status=status.HTTP_400_BAD_REQUEST)

        coupon = Coupon.objects.filter(code=code, is_active=True).first()
        if not coupon:
            return Response(
                {"valid": False, "message": "Invalid or expired coupon code."},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response({
            "valid": True,
            "code": coupon.code,
            "discount_percent": coupon.discount_percent,
            "description": coupon.description,
            "message": f"Coupon applied: {coupon.discount_percent}% discount!",
        })
