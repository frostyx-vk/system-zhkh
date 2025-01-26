from django.contrib.auth.models import AbstractUser
from django.db import models



class User(AbstractUser):
    middle_name = models.CharField('Отчество', max_length=50, blank=True)
    phone = models.CharField('Телефон', max_length=12, blank=True)
    REQUIRED_FIELDS = ['last_name', 'first_name', 'middle_name', 'phone', 'email',  'is_active', 'password']

    def __str__(self):
        return self.username