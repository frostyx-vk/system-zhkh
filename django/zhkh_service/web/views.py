from django.conf import settings
from django.contrib.auth.views import PasswordResetCompleteView
from rest_framework.generics import ListAPIView

from web.models import AboutPortal, Contact, News, Service
from web.serializers import AboutPortalSerializer, ContactSerializer, NewsSerializer, ServiceSerializer


class PasswordResetCompleteCustomView(PasswordResetCompleteView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["login_url"] = settings.FRONTEND_LINK
        return context


class NewsListAPIView(ListAPIView):
    serializer_class = NewsSerializer
    queryset = News.objects.all()


class ServiceAPIView(ListAPIView):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()


class ContactAPIView(ListAPIView):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()


class AboutPortalAPIView(ListAPIView):
    serializer_class = AboutPortalSerializer
    queryset = AboutPortal.objects.all()

