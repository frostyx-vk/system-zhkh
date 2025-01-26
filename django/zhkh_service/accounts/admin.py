from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from accounts.forms import UserAdminForm, UserCreationAdminForm
from accounts.models import User


class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name')
    list_filter = ('is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email', 'phone')}),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                    'groups',
                    'user_permissions',
                ),
            },
        ),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ('wide',),
                "fields": ('username', 'password1', 'password2', 'first_name', 'last_name', 'email', 'phone'),
            },
        ),
    )
    form = UserAdminForm
    add_form = UserCreationAdminForm


admin.site.register(User, CustomUserAdmin)