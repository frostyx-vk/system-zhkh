from django.urls import path

from web.models import Contact
from web.views import AboutPortalAPIView, ContactAPIView, NewsListAPIView, ServiceAPIView, DocumentsSerializerAPIView

app_name = 'web'

urlpatterns = [
    path('news/', NewsListAPIView.as_view(), name='news-list'),
    path('services/', ServiceAPIView.as_view(), name='service-list'),
    path('contacts/', ContactAPIView.as_view(), name='contact-list'),
    path('about-portal/', AboutPortalAPIView.as_view(), name='about-portal'),
    path('documents/', DocumentsSerializerAPIView.as_view(), name='documents'),
]