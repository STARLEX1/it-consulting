from rest_framework import serializers
from .models import Lead
from services.models import Service

class LeadCreateSerializer(serializers.ModelSerializer):
    service = serializers.SlugRelatedField(
        slug_field='slug',
        queryset=Service.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Lead
        fields = ['name', 'email', 'phone', 'company', 'service', 'message']
        read_only_fields = ['user']

    def create(self, validated_data):
        # Если пользователь авторизован, привязываем заявку к нему
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['user'] = request.user
        return super().create(validated_data)

class LeadSerializer(serializers.ModelSerializer):
    service_title = serializers.CharField(source='service.title', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = Lead
        fields = '__all__'