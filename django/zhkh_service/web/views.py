import datetime
import hashlib
import json
from uuid import uuid4

import requests
from django.conf import settings
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import PasswordResetCompleteView
from django.db import transaction
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView, DetailView
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User
from web.models import AboutPortal, Contact, News, Service, Documents, Indication, Tariff, LivingArea, Payment
from web.serializers import AboutPortalSerializer, ContactSerializer, NewsSerializer, ServiceSerializer, \
    DocumentsSerializer, LivingAreaSerializer, PaymentSerializer


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


class DocumentsSerializerAPIView(ListAPIView):
    serializer_class = DocumentsSerializer
    queryset = Documents.objects.all()


class LivingAreaDataAPIView(APIView):
    serializer_class = LivingAreaSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        living_area = get_object_or_404(LivingArea, user=self.request.user)
        serializer = LivingAreaSerializer(instance=living_area)
        return Response({'message': 'House gotten', 'data': serializer.data}, status=status.HTTP_200_OK)


class CountersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_last_indication(self, tariff, indications):
        last_indication = 0
        if indications.exists():
            last_indication = indications.last().last_indication
        return last_indication

    def post(self, request):
        cold_water = request.data.get('coldWater')
        hot_water = request.data.get('hotWater')
        electricity = request.data.get('electricity')

        if not self.request.user.livingarea:
            return Response({'message': 'User has not living area'})

        tariff_cold = get_object_or_404(Tariff, key=Tariff.Keys.cold)
        tariff_hot = get_object_or_404(Tariff, key=Tariff.Keys.hot)
        tariff_electricity = get_object_or_404(Tariff, key=Tariff.Keys.electricity)
        cold_sum, hot_sum, electricity_sum = 'Не определено', 'Не определено', 'Не определено'

        if cold_water:
            indications = Indication.objects.filter(user=self.request.user, tariff=tariff_cold)
            last_indication = self.get_last_indication(tariff_cold, indications)
            current_cold_indication = int(cold_water) - last_indication
            if self.request.user.livingarea.availability_counters_water:
                cold_sum = current_cold_indication * tariff_cold.ratio
        else:
            if not self.request.user.livingarea.availability_counters_water:
                if self.request.user.livingarea.resident_count > 1:
                    norm = tariff_cold.regulations.filter(person_count__gt=1).last()
                else:
                    norm = tariff_cold.regulations.filter(person_count=1).last()
                cold_sum = norm.value * norm.summ_without_counters

        if hot_water:
            indications = Indication.objects.filter(user=self.request.user, tariff=tariff_hot)
            last_indication = self.get_last_indication(tariff_hot, indications)
            current_hot_indication = int(hot_water) - last_indication
            if self.request.user.livingarea.availability_counters_water:
                hot_sum = current_hot_indication * tariff_hot.ratio
        else:
            if not self.request.user.livingarea.availability_counters_water:
                if self.request.user.livingarea.resident_count > 1:
                    norm = tariff_hot.regulations.filter(person_count__gt=1).last()
                else:
                    norm = tariff_hot.regulations.filter(person_count=1).last()
                hot_sum = norm.value * norm.summ_without_counters

        if electricity:
            indications = Indication.objects.filter(user=self.request.user, tariff=tariff_electricity)
            last_indication = self.get_last_indication(tariff_electricity, indications)
            current_electricity_indication = int(electricity) - last_indication
            if self.request.user.livingarea.resident_count > 1:
                norm = tariff_electricity.regulations.filter(person_count__gt=1).last()
            else:
                norm = tariff_electricity.regulations.filter(person_count=1).last()

            if current_electricity_indication <= norm.value:
                electricity_sum = current_electricity_indication * norm.standard_summ
            else:
                electricity_sum = current_electricity_indication * norm.summ_above

        return Response({'message': 'Data success save', 'data': [cold_sum, hot_sum, electricity_sum]})


class PaymentSumAPIView(APIView):
    def get(self, request, *args, **kwargs):
        token = kwargs.get('token')
        user = Token.objects.get(key=token).user
        datetime_now = timezone.now()

        start_month = datetime.datetime(datetime_now.year, datetime_now.month, 1)
        end_month = datetime.datetime(datetime_now.year, datetime_now.month, 28)

        finish_prices = Indication.objects.filter(
            date_updated__gte=start_month,
            date_updated__lte=end_month,
            user=user
        ).values_list('finish_price', flat=True)
        return Response({'message': f'{sum(list(finish_prices))}'})


class PaymentHistoryListAPIView(ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = Token.objects.get(key=self.kwargs['token']).user
        return Payment.objects.filter(user=user)


def yookassa_request(request, value):
    def build_sha1_from_order(order):

        sha1 = hashlib.sha1(settings.FORMAT_TEMPLATE.format(
            account_number=order.user.pk,
            amount=order.order_amount,
            yookassa_sha_salt=settings.YOOKASSA_SHA_SALT,
        ).encode('utf-8')).hexdigest()
        return sha1

    with transaction.atomic():
        token = request.GET.get('token')
        user = Token.objects.get(key=token).user
        order_obj = Payment.objects.create(order_amount=value, user=user)
        ik = str(uuid4())
        headers = {
            'Idempotence-Key': ik,
            'Content-Type': 'application/json',
        }
        json_data = {
            'amount': {
                'value': f'{value}',
                'currency': 'RUB',
            },
            'confirmation': {
                'type': 'embedded',
                'confirmation_token': f'{order_obj.uuid}'
            },
            'capture': True,
            'receipt': {
                'customer': {
                    'full_name': 'PAYMENT',
                    'email': request.GET.get('receipt_email', None),
                    'phone': request.GET.get('receipt_phone', None),
                },
                'items': [
                    {
                        'description': 'Описание',
                        'quantity': 1,
                        'amount': {
                            'value': f'{order_obj.order_amount}',
                            'currency': 'RUB'
                        },
                        'vat_code': 1,
                    }
                ]
            },
            'metadata': {
                'account': f'{order_obj.user.pk}',
                'secret': build_sha1_from_order(order_obj),
            }
        }
        auth = (settings.YOOKASSA_SHOP_ID, settings.YOOKASSA_SECRET_KEY)

        response = requests.post(settings.YOOKASSA_URL, json=json_data, headers=headers, auth=auth)

        response_json = json.loads(response.content)
        order_obj.uuid = response_json['id']
        order_obj.save(update_fields=['uuid'])
        return HttpResponseRedirect(
            reverse('web:payment_widget', kwargs={'ct_token': response_json['confirmation']['confirmation_token'],
                                                       'uuid': response_json['id']}))


class PaymentWidgetView(TemplateView):
    template_name = 'web/yookassa_pay.html'

    def get_context_data(self, **kwargs):
        return super().get_context_data(
            payment=Payment.objects.get(uuid=self.kwargs['uuid']),
            **kwargs
        )


class PaymentSuccessView(DetailView):
    model = Payment
    template_name = 'web/order_detail.html'
    payment_success = False
    payment_failed = False

    def get(self, request, *args, **kwargs):
        if self.payment_success:
            obj = self.get_object()
            obj.active = True
            obj.save()
        return super().get(request, *args, **kwargs)


@method_decorator(csrf_exempt, name='dispatch')
class YooKassaCallbackView(View):
    def post(self, *args, **kwargs):
        data = json.loads(self.request.body)
        sha_from_response = data.get('object', {}).get('metadata', {}).get('secret', None)

        if not sha_from_response or str(sha_from_response) != str(self.build_sha1_from_response(data)):
            print('Ошибка 403', f'sha_from_response - {sha_from_response}', f'self.build_sha1_from_response(data) - {self.build_sha1_from_response(data)}')
            return HttpResponse(status=403)

        payment_id = data['object']['id']
        payment = Payment.objects.get(uuid=payment_id, status=False)
        payment.status = True
        payment.save()
        return HttpResponse(status=200)


    @staticmethod
    def build_sha1_from_response(response_data):
        payment = Payment.objects.get(uuid=response_data['object']['id'])
        account_number = response_data['object']['metadata']['account']
        user = User.objects.filter(pk=account_number)[0]
        sha1 = hashlib.sha1(settings.FORMAT_TEMPLATE.format(
            account_number=user.pk,
            amount=payment.order_amount,
            yookassa_sha_salt=settings.YOOKASSA_SHA_SALT,
        ).encode('utf-8')).hexdigest()
        return sha1