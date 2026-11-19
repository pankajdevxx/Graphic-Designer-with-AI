import time
from datetime import datetime, timezone
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class HealthCheckView(APIView):
    """
    Health check API endpoint verifying service status and live database connectivity.
    """
    permission_classes = []

    def get(self, request, *args, **kwargs):
        start_time = time.time()
        db_connected = False
        db_latency_ms = None
        db_error = None

        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1;")
                row = cursor.fetchone()
                if row and row[0] == 1:
                    db_connected = True
                    db_latency_ms = round((time.time() - start_time) * 1000, 2)
        except Exception as exc:
            db_connected = False
            db_error = str(exc)

        is_healthy = db_connected
        http_status = status.HTTP_200_OK if is_healthy else status.HTTP_503_SERVICE_UNAVAILABLE

        response_payload = {
            "status": "healthy" if is_healthy else "degraded",
            "service": "PixelGenCreativity Backend API",
            "version": "1.0.0",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "database": {
                "connected": db_connected,
                "engine": connection.vendor,
                "latency_ms": db_latency_ms,
                "error": db_error,
            },
            "environment": "development" if connection.settings_dict.get('DEBUG', True) else "production",
        }

        return Response(response_payload, status=http_status)
