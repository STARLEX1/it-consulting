from rest_framework import generics
from .models import Service
from .serializers import ServiceListSerializer, ServiceDetailSerializer

class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceListSerializer

class ServiceDetailView(generics.RetrieveAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceDetailSerializer
    lookup_field = 'slug'