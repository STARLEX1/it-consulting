from django.urls import path
from .views import LeadCreateView, LeadListView, MyLeadListView

urlpatterns = [
    path('', LeadCreateView.as_view(), name='lead-create'),
    path('list/', LeadListView.as_view(), name='lead-list'),
    path('my/', MyLeadListView.as_view(), name='my-leads'),
]