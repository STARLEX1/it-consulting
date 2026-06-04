from rest_framework import generics, permissions
from rest_framework.throttling import AnonRateThrottle
from .models import Lead
from .serializers import LeadCreateSerializer, LeadSerializer

class LeadRateThrottle(AnonRateThrottle):
    rate = '3/minute'

class LeadCreateView(generics.CreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadCreateSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [LeadRateThrottle]

class LeadListView(generics.ListAPIView):
    """Все заявки (для админов)"""
    queryset = Lead.objects.all().order_by('-created_at')
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

class MyLeadListView(generics.ListAPIView):
    """Заявки текущего пользователя"""
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Возвращаем только заявки текущего пользователя
        user = self.request.user
        return Lead.objects.filter(user=user).order_by('-created_at')