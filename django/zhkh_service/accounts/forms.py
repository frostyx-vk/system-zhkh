from django.contrib.auth.forms import UserChangeForm, UsernameField, UserCreationForm

from accounts.models import User


class UserAdminForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = ('password', 'username', 'first_name', 'middle_name', 'last_name', 'email', 'is_staff', 'is_active',
                  'date_joined', 'phone')
        field_classes = {"username": UsernameField}


class UserCreationAdminForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('password', 'username', 'first_name', 'middle_name', 'last_name', 'email', 'is_staff', 'is_active',
                  'date_joined', 'phone')
        field_classes = {"username": UsernameField}