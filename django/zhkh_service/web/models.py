from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models


def is_nan_validator(value):
    import math
    if math.isnan(value):
        raise ValidationError('Недопустимое значение поля. Поле не может быть NaN')


class News(models.Model):
    title = models.CharField('Заголовок', max_length=100)
    description = models.TextField('Содержание')
    image = models.ImageField('Изображение', upload_to='images/news/', blank=True)
    date_created = models.DateTimeField('Дата добавления', auto_now_add=True)

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'
        ordering = ['-date_created']

    def __str__(self):
        return self.title


class Service(models.Model):
    title = models.CharField('Название', max_length=100)
    description = models.TextField('Содержание')
    price = models.FloatField('Цена', validators=[MinValueValidator(0), is_nan_validator])
    order = models.PositiveIntegerField('Порядок вывода', default=0)

    class Meta:
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'
        ordering = ['order']

    def __str__(self):
        return self.title


class Contact(models.Model):
    name = models.CharField('Имя', max_length=100)
    phone = models.CharField('Телефон', max_length=12)
    email = models.EmailField(verbose_name='Электронный адрес', unique=True)

    class Meta:
        verbose_name = 'Контакт'
        verbose_name_plural = 'Контакты'

    def __str__(self):
        return self.name


class AboutPortal(models.Model):
    title = models.CharField('Заголовок', max_length=100)
    description = models.TextField('Описание')
    address = models.CharField('Адрес', max_length=255)
    phone_organization = models.CharField('Телефон', max_length=12, blank=True)
    email_organization = models.EmailField(verbose_name='Электронный адрес организации')

    class Meta:
        verbose_name = 'О портале'
        verbose_name_plural = 'О порталах'

    def __str__(self):
        return self.title


class DataDeveloper(models.Model):
    text = models.TextField()

    class Meta:
        verbose_name = 'Информация о разработчике'
        verbose_name_plural = 'Информация о разработчиках'

    def __str__(self):
        return self.text


class Documents(models.Model):
    title = models.CharField(verbose_name='Название', max_length=100)
    description = models.TextField(verbose_name='Описание', blank=True)
    file = models.FileField(verbose_name='Документ', upload_to='documents/')

    class Meta:
        verbose_name = 'Документ'
        verbose_name_plural = 'Документы'

    def __str__(self):
        return self.title
