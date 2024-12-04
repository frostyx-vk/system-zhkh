from django.contrib.auth.models import AbstractUser
from django.db import models



class User(AbstractUser):
    class TypeProperty(models.TextChoices):
        HABITABLE = 'HABITABLE', 'Жилое'
        NOT_RESIDENTIAL = 'NOT_RESIDENTIAL', 'Не жилое'
        PARKING = 'PARKING', 'Парковочное место'

    middle_name = models.CharField('Отчество', max_length=50, blank=True)
    phone = models.CharField('Телефон', max_length=12, blank=True)
    number_ls = models.PositiveIntegerField(verbose_name='Номер лицевого счета', blank=True)
    address = models.CharField(verbose_name='Адрес', max_length=255, blank=True)
    square = models.PositiveIntegerField(verbose_name='Площадь', blank=True)
    type = models.CharField(choices=TypeProperty.choices, default=TypeProperty.HABITABLE, max_length=255, blank=True)

    REQUIRED_FIELDS = ['last_name', 'first_name', 'middle_name', 'phone', 'email', 'number_ls', 'address', 'square',
                       'type', 'is_active']

    def __str__(self):
        return self.username