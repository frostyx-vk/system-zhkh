from django.contrib import admin

from .models import AboutPortal, Contact, DataDeveloper, News, Service, Documents, Tariff, Indication, LivingArea, \
    Regulation, Payment
from .forms import DocumentAdminForm


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_created')
    search_fields = ('title', 'description')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'price')
    search_fields = ('title', 'description')


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone')


@admin.register(AboutPortal)
class AboutPortalAdmin(admin.ModelAdmin):
    list_display = ('title',)


@admin.register(DataDeveloper)
class DataDeveloperAdmin(admin.ModelAdmin):
    list_display = ('text',)


@admin.register(Documents)
class DocumentsAdmin(admin.ModelAdmin):
    list_display = ('title',)
    form = DocumentAdminForm


class RegulationAdminInline(admin.TabularInline):
    model = Regulation
    extra = 1


@admin.register(Tariff)
class TariffAdmin(admin.ModelAdmin):
    list_display = ('name', )
    inlines = (RegulationAdminInline, )


@admin.register(Indication)
class IndicationAdmin(admin.ModelAdmin):
    list_display = ('last_indication', 'date_updated')
    list_filter = ('tariff', )


@admin.register(LivingArea)
class LivingAreaAdmin(admin.ModelAdmin):
    list_display = ('address', 'number_ls', 'square', 'type')

admin.site.register(Payment)