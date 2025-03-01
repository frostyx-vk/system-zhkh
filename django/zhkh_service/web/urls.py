from django.urls import path

from web.views import AboutPortalAPIView, ContactAPIView, NewsListAPIView, ServiceAPIView, DocumentsSerializerAPIView, \
    CountersAPIView, LivingAreaDataAPIView

app_name = 'web'

urlpatterns = [
    path('news/', NewsListAPIView.as_view(), name='news-list'),
    path('services/', ServiceAPIView.as_view(), name='service-list'),
    path('contacts/', ContactAPIView.as_view(), name='contact-list'),
    path('about-portal/', AboutPortalAPIView.as_view(), name='about-portal'),
    path('documents/', DocumentsSerializerAPIView.as_view(), name='documents'),
    path('set-counters/', CountersAPIView.as_view(), name='set-counters'),
    path('get-living-area-data/', LivingAreaDataAPIView.as_view(), name='living-area-data')
]