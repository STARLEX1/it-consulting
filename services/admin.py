from django.contrib import admin
from .models import Service, Tariff


class TariffInline(admin.TabularInline):
    model = Tariff
    extra = 1


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'is_active']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [TariffInline]
    list_filter = ['is_active']
    search_fields = ['title', 'short_desc']


@admin.register(Tariff)
class TariffAdmin(admin.ModelAdmin):
    list_display = ['name', 'service', 'price', 'is_popular', 'is_active']
    list_filter = ['service', 'is_popular', 'is_active']
    search_fields = ['name']