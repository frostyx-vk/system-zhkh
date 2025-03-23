from django.conf import settings
from django.contrib.auth.views import PasswordResetCompleteView
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from web.models import AboutPortal, Contact, News, Service, Documents, Indication, Tariff, LivingArea, Appeal
from web.serializers import AboutPortalSerializer, ContactSerializer, NewsSerializer, ServiceSerializer, \
    DocumentsSerializer, LivingAreaSerializer, AppealSerializer


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


class AppealCreateAPIView(CreateAPIView):
    serializer_class = AppealSerializer
    queryset = Appeal.objects.all()