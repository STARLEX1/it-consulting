from rest_framework import serializers
from .models import Service, Tariff

class TariffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tariff
        fields = ['id', 'name', 'price', 'old_price', 'features', 'is_popular']

class ServiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['slug', 'title', 'short_desc', 'icon', 'cover_image']

class ServiceDetailSerializer(serializers.ModelSerializer):
    tariffs = TariffSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = ['slug', 'title', 'short_desc', 'full_desc', 'icon', 'cover_image', 'features', 'tariffs']