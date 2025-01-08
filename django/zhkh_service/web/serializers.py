from rest_framework.serializers import ModelSerializer

from web.models import AboutPortal, Contact, News, Service, DataDeveloper, Documents


class NewsSerializer(ModelSerializer):
    class Meta:
        model = News
        fields = ('title', 'description', 'image', 'date_created')


class ServiceSerializer(ModelSerializer):
    class Meta:
        model = Service
        fields = ('title', 'description', 'price', 'order')


class ContactSerializer(ModelSerializer):
    class Meta:
        model = Contact
        fields = ('name', 'phone', 'email')


class AboutPortalSerializer(ModelSerializer):
    class Meta:
        model = AboutPortal
        fields = ('title', 'description', 'address', 'phone_organization', 'email_organization')


class DataDeveloperSerializer(ModelSerializer):
    class Meta:
        model = DataDeveloper
        fields = ('text', )


class DocumentsSerializer(ModelSerializer):
    class Meta:
        model = Documents
        fields = ('title', 'file')