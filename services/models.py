from django.db import models

class Service(models.Model):
    slug = models.SlugField(unique=True)  # security, automation, audit, gov
    title = models.CharField(max_length=200)
    short_desc = models.CharField(max_length=300)
    full_desc = models.TextField()
    icon = models.CharField(max_length=50, help_text="Название иконки")
    cover_image = models.ImageField(upload_to='services/', blank=True)
    features = models.JSONField(default=list, help_text="Список преимуществ")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Tariff(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='tariffs')
    name = models.CharField(max_length=100)  # Базовый, Бизнес, Корпоратив
    price = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    features = models.JSONField(default=list)
    is_popular = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.service.title} — {self.name}"