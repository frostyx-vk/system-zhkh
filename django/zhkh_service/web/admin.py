from django.contrib import admin

from .models import AboutPortal, Contact, DataDeveloper, News, Service, Documents
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