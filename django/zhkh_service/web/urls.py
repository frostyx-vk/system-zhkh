from django.urls import path, include

from web.serializers import IndicationSerializer
from web.views import AboutPortalAPIView, ContactAPIView, NewsListAPIView, ServiceAPIView, DocumentsSerializerAPIView, \
    CountersAPIView, LivingAreaDataAPIView, TariffsAPIView, ReceiptListAPIView, yookassa_request, PaymentWidgetView, \
    PaymentSuccessView, \
    YooKassaCallbackView, PaymentSumAPIView, PaymentHistoryListAPIView, AppealCreateAPIView, AppealListAPIView, \
    IndicationsHistory, DataDeveloperListAPIView

app_name = 'web'

urlpatterns = [
    path('news/', NewsListAPIView.as_view(), name='news-list'),
    path('services/', ServiceAPIView.as_view(), name='service-list'),
    path('contacts/', ContactAPIView.as_view(), name='contact-list'),
    path('about-portal/', AboutPortalAPIView.as_view(), name='about-portal'),
    path('documents/', DocumentsSerializerAPIView.as_view(), name='documents'),
    path('set-counters/', CountersAPIView.as_view(), name='set-counters'),
    path('get-living-area-data/', LivingAreaDataAPIView.as_view(), name='living-area-data'),
    path('tariffs/', TariffsAPIView.as_view(), name='tariffs'),
    path('receipts/', ReceiptListAPIView.as_view(), name='receipts'),
    path('get-living-area-data/', LivingAreaDataAPIView.as_view(), name='living-area-data'),
    path('indications-history/<str:token>/', IndicationsHistory.as_view(), name='indications-history'),

    path('get-sum-payment/<str:token>/', PaymentSumAPIView.as_view(), name='get-sum-payment'),

    path('pay/', include([
        path('yk/<int:value>/', yookassa_request, name='pay'),
        path('wg/<str:ct_token>/<str:uuid>/', PaymentWidgetView.as_view(), name='payment_widget'),
        path('success/<int:pk>/', PaymentSuccessView.as_view(payment_success=True), name='payment_success'),
        path('success/<int:pk>/', PaymentSuccessView.as_view(payment_success=False), name='payment_fail'),
        path('payment-history/<str:token>/', PaymentHistoryListAPIView.as_view(), name='payment-history'),
    ])),
    path('ykcb/', YooKassaCallbackView.as_view(), name='yookassa_callback'),
    path('appeal-create/', AppealCreateAPIView.as_view(), name='appeal-create'),
    path('appeals/<str:token>/', AppealListAPIView.as_view(), name='appeal-list'),
    path('developers/', DataDeveloperListAPIView.as_view(), name='developers'),
]