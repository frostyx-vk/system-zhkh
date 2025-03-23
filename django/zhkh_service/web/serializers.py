from rest_framework.serializers import ModelSerializer

from web.models import AboutPortal, Contact, News, Service, DataDeveloper, Documents, LivingArea, Indication, Tariff, \
    Receipt, Payment


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


class LivingAreaSerializer(ModelSerializer):
    class Meta:
        model = LivingArea
        fields = ('address', 'number_ls', 'square', 'type')


class IndicationSerializer(ModelSerializer):
    class Meta:
        model = Indication
        fields = '__all__'


class TariffSerializer(ModelSerializer):
    class Meta:
        model = Tariff
        fields = '__all__'


class ReceiptSerializer(ModelSerializer):
    class Meta:
        model = Receipt
        fields = '__all__'


class PaymentSerializer(ModelSerializer):
    class Meta:
        model = Payment
        fields = ('order_amount', 'date_created')