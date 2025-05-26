import datetime
import hashlib
import json
from uuid import uuid4

from aiohttp.http_exceptions import HttpBadRequest
import requests
from django.db.models import Window, F
from django.db.models.functions import Lag
from django.http import HttpRequest, HttpResponseBadRequest, JsonResponse, HttpResponse, HttpResponseRedirect
from django.db import transaction
from django.conf import settings
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import PasswordResetCompleteView
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView, DetailView
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User
from web.models import AboutPortal, Contact, News, Service, Documents, Indication, Tariff, LivingArea, Receipt, Payment, \
    Appeal, IndicationType
from web.serializers import AboutPortalSerializer, ContactSerializer, NewsSerializer, ServiceSerializer, \
    DocumentsSerializer, LivingAreaSerializer, PaymentSerializer, IndicationSerializer, TariffSerializer, ReceiptSerializer, \
    AppealSerializer


class PasswordResetCompleteCustomView(PasswordResetCompleteView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["login_url"] = settings.FRONTEND_LINK
        return context


class NewsListAPIView(ListAPIView):
    serializer_class = NewsSerializer
    queryset = News.objects.all()


class  NewsCreateAPIView(CreateAPIView):
    serializer_class = NewsSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return HttpResponseBadRequest()
        return Response({'message': 'Новость добавлена'})


class ServiceAPIView(ListAPIView):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()


class ServiceCreateAPIView(CreateAPIView):
    serializer_class = ServiceSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return HttpResponseBadRequest()
        return Response({'message': 'Услуга добавлена'})


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
        if indications:
            last_indication = indications.last().last_indication
        return last_indication

    def create_indication(self, data):
        indication_serializer = IndicationSerializer(data=data)
        if indication_serializer.is_valid():
            indication_serializer.save()
        else:
            return JsonResponse({'error': indication_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def check_correct_indication(self, indication, last_indication):
        return indication > last_indication

    def save_indication(self, indication, last_indication, tariff, type_tube):
        current_indication_first = int(indication) - last_indication
        total_sum = current_indication_first * tariff.ratio
        if type_tube == 'standard':
            indication_type = IndicationType.objects.get(tube_type='')
        elif type_tube == 'first_tube':
            indication_type = IndicationType.objects.get(tube_type=IndicationType.TubeType.FIRST)
        else:
            indication_type = IndicationType.objects.get(tube_type=IndicationType.TubeType.SECOND)

        data = {
            'last_indication': indication,
            'user': self.request.user.pk,
            'tariff': tariff.pk,
            'finish_price': total_sum,
            'type': indication_type.pk,
        }
        self.create_indication(data)
        return total_sum

    def save_indication_water_by_type(self, water1, water2, waters, tariff, total_sum):
        last_indication, last_indication_first, last_indication_second = 0, 0, 0
        indications_first, indications, indications_second = self.check_data_water(
            water1, water2, waters, tariff
        )
        if indications:
            last_indication = self.get_last_indication(tariff, indications)
        else:
            last_indication_first = self.get_last_indication(tariff, indications_first)
            last_indication_second = self.get_last_indication(tariff, indications_second)

        if len(waters) == 1:
            check = self.check_correct_indication(int(water1), last_indication)
            if not check:
                return Response({'message': 'Indication cold water entered incorrectly'},
                                status=status.HTTP_400_BAD_REQUEST)
            total_sum.append(self.save_indication(water1, last_indication, tariff, 'standard'))
        else:
            check_first = self.check_correct_indication(int(water1), last_indication_first)
            check_second = self.check_correct_indication(int(water2), last_indication_second)
            if not check_first or not check_second:
                return Response({'message': 'Indication cold water entered incorrectly'},
                                status=status.HTTP_400_BAD_REQUEST)
            total_sum.append(self.save_indication(water1, last_indication_first, tariff, 'first_tube'))
            total_sum.append(self.save_indication(water2, last_indication_second, tariff, 'second_tube'))

    def check_data_water(self, water1, water2, waters, tariff):
        indications_first, indications, indications_second = None, None, None
        if water1 and water2:
            if self.request.user.livingarea.tube != LivingArea.TubeCount.TWO:
                raise ValueError('Tube count dose not match')
            waters.append(water1)
            waters.append(water2)
            indications_first = Indication.objects.filter(
                user=self.request.user, tariff=tariff,
                type=IndicationType.objects.get(tube_type=IndicationType.TubeType.FIRST)
            )
            indications_second = Indication.objects.filter(
                user=self.request.user, tariff=tariff,
                type=IndicationType.objects.get(tube_type=IndicationType.TubeType.SECOND)
            )
        elif water1 and not water2:
            if self.request.user.livingarea.tube == LivingArea.TubeCount.TWO:
                raise ValueError('Data water is not valid')
            waters.append(water1)
            indications = Indication.objects.filter(
                user=self.request.user, tariff=tariff,
                type=IndicationType.objects.get(tube_type=IndicationType.TubeType.FIRST)
            )
        elif not water1 and water2 or not water1 and not water2:
            raise ValueError('Data water is not valid')

        return indications_first, indications_second, indications

    @transaction.atomic
    def post(self, request):
        cold_water = request.data.get('coldWater')
        hot_water = request.data.get('hotWater')
        electricity = request.data.get('electricity')

        cold_water2 = request.data.get('coldWater2')
        hot_water2 = request.data.get('hotWater2')

        if not self.request.user.livingarea:
            return Response({'message': 'User has not living area'})

        tariff_cold = get_object_or_404(Tariff, key=Tariff.Keys.cold)
        tariff_hot = get_object_or_404(Tariff, key=Tariff.Keys.hot)
        tariff_electricity = get_object_or_404(Tariff, key=Tariff.Keys.electricity)

        cold_waters, hot_waters, total_sum = [], [], []
        electricity_sum = 'Не определено'

        if self.request.user.livingarea.type != LivingArea.TypeProperty.PARKING:
            self.save_indication_water_by_type(cold_water, cold_water2, cold_waters, tariff_cold, total_sum)
            self.save_indication_water_by_type(hot_water, hot_water2, hot_waters, tariff_hot, total_sum)

        if electricity:
            indications = Indication.objects.filter(user=self.request.user, tariff=tariff_electricity)
            last_indication = self.get_last_indication(tariff_electricity, indications)
            check = self.check_correct_indication(int(electricity), last_indication)
            if check:
                current_electricity_indication = int(electricity) - last_indication
                if self.request.user.livingarea.resident_count > 1:
                    norm = tariff_electricity.regulations.filter(person_count__gt=1).last()
                else:
                    norm = tariff_electricity.regulations.filter(person_count=1).last()
                if not norm:
                    return Response({'message': 'Indication has not norm'}, status=status.HTTP_400_BAD_REQUEST)
                if current_electricity_indication <= norm.value:
                    electricity_sum = current_electricity_indication * norm.standard_summ
                else:
                    electricity_sum = current_electricity_indication * norm.summ_above
                indication_type = IndicationType.objects.get(tube_type='')
                data = {
                    'last_indication': electricity,
                    'user': self.request.user.pk,
                    'tariff': tariff_electricity.pk,
                    'finish_price': electricity_sum,
                    'type': indication_type.pk,
                }
                self.create_indication(data)
            else:
                return Response({'message': 'Indication electricity entered incorrectly'},
                                status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Data success save', 'data': total_sum + [electricity_sum]})


class TariffsAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TariffSerializer
    queryset = Tariff.objects.all()


class ReceiptListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ReceiptSerializer

    def get_queryset(self):
        return Receipt.objects.filter(living_area__user=self.request.user)


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
        return Payment.objects.filter(user=user, active=True)


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
            Payment.objects.filter(user=obj.user, active=False).delete()
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


class AppealCreateAPIView(CreateAPIView):
    serializer_class = AppealSerializer
    queryset = Appeal.objects.all()

    def post(self, request, *args, **kwargs):
        sender = Token.objects.get(key=request.data['token']).user
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(sender=sender)
        else:
            return HttpResponseBadRequest()
        return Response({'message': 'Обращение успешно отправлено!'})


class AppealListAPIView(ListAPIView):
    serializer_class = AppealSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = Token.objects.get(key=self.kwargs['token']).user
        return Appeal.objects.filter(sender=user)


class IndicationsHistory(ListAPIView):
    serializer_class = IndicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = Token.objects.get(key=self.kwargs['token']).user
        return Indication.objects.annotate(
            previous_indication=Window(
                expression=Lag('last_indication'),
                partition_by=[F('user_id'), F('type_id')],
                order_by=F('date_updated').asc()
            ),
            difference=F('last_indication') - Window(
                expression=Lag('last_indication'),
                partition_by=[F('user_id'), F('type_id')],
                order_by=F('date_updated').asc()
            )
        ).filter(user=user)
