from uuid import uuid4

from django.contrib.contenttypes.fields import GenericForeignKey
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models

from accounts.models import User


def is_nan_validator(value):
    import math
    if math.isnan(value):
        raise ValidationError('Недопустимое значение поля. Поле не может быть NaN')

def validate_file_extension(value):
    import os
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.pdf']
    if not ext in valid_extensions:
        raise ValidationError(u'Доступно только PDF')


class LivingArea(models.Model):
    class TypeProperty(models.TextChoices):
        HABITABLE = 'HABITABLE', 'Жилое'
        NOT_RESIDENTIAL = 'NOT_RESIDENTIAL', 'Не жилое'
        PARKING = 'PARKING', 'Парковочное место'

    class TubeCount(models.TextChoices):
        ONE = 'ONE', 'Один водосток'
        TWO = 'TWO', 'Два водостока'

    address = models.CharField(verbose_name='Адрес', max_length=255, unique=True)
    home_number = models.PositiveIntegerField(verbose_name='Номер квартиры', blank=True, null=True)
    number_ls = models.PositiveIntegerField(verbose_name='Номер лицевого счета', unique=True)
    square = models.PositiveIntegerField(verbose_name='Площадь')
    type = models.CharField(choices=TypeProperty.choices, default=TypeProperty.HABITABLE, max_length=255)
    tube = models.CharField(choices=TubeCount.choices, default='', max_length=255, null=True, blank=True)
    resident_count = models.PositiveIntegerField(verbose_name='Кол-во прописанных человек', default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='Пользователь')

    class Meta:
        verbose_name = 'Жилая площадь'
        verbose_name_plural = 'Жилые площади'

    def __str__(self):
        return self.address


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


class Tariff(models.Model):
    class Keys(models.TextChoices):
        cold = 'coldWater', 'Холодная вода'
        hot = 'hotWater', 'Горячая вода'
        disposal = 'disposal', 'Водоотведение'
        electricity = 'electricity', 'Электроэнергия'

    name = models.CharField(verbose_name='Название', max_length=100)
    ratio = models.FloatField(verbose_name='Кол-во рублей за ед.', max_length=15, blank=True)
    key = models.CharField(verbose_name='Ключ', max_length=255, choices=Keys.choices)
    unit = models.CharField(verbose_name='Единица измерения', null=True, blank=True, max_length=255)


    class Meta:
        verbose_name = 'Тариф'
        verbose_name_plural = 'Тарифы'

    def __str__(self):
        return self.name


class Regulation(models.Model):
    name = models.CharField(verbose_name='Название', max_length=100)
    value = models.PositiveIntegerField(verbose_name='Норма')
    person_count = models.PositiveIntegerField(verbose_name='Кол-во человек', default=1)
    standard_summ = models.PositiveIntegerField(verbose_name='Стандартная сумма')
    summ_above = models.PositiveIntegerField(verbose_name='Сумма сверх тарифа')
    tariff = models.ForeignKey(Tariff, on_delete=models.CASCADE, verbose_name='Тариф', related_name='regulations')

    class Meta:
        verbose_name = 'Норма'
        verbose_name_plural = 'Нормы'

    def __str__(self):
        return self.name


class Receipt(models.Model):
    file = models.FileField(verbose_name='Квитанция', upload_to='receipts/', validators=[validate_file_extension])
    date_created = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    living_area = models.ForeignKey(LivingArea, on_delete=models.CASCADE, verbose_name='Жил. площадь')

    class Meta:
        verbose_name = 'Платежный документ'
        verbose_name_plural = 'Платежный документы'

    def __str__(self):
        return self.living_area.address


class IndicationType(models.Model):
    class TubeType(models.TextChoices):
        FIRST = 'FIRST', 'Первый водосток'
        SECOND = 'SECOND', 'Второй водосток'

    name = models.CharField(verbose_name='Название', max_length=100)
    tube_type = models.CharField(verbose_name='Тип водостока', choices=TubeType.choices, blank=True, max_length=100)

    class Meta:
        verbose_name = 'Тип показателя'
        verbose_name_plural = 'Типы показателей'

    def __str__(self):
        return self.name



class Indication(models.Model):
    last_indication = models.FloatField(verbose_name='Последний показатель', max_length=55)
    date_updated = models.DateTimeField(verbose_name='Дата обновления', auto_now=True)
    type = models.ForeignKey(IndicationType, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    tariff = models.ForeignKey(Tariff, on_delete=models.CASCADE, verbose_name='Тариф')
    finish_price = models.FloatField(verbose_name='Итоговая сумма')

    class Meta:
        verbose_name = 'Показание'
        verbose_name_plural = 'Показания'

    def __str__(self):
        return str(self.last_indication)


class Payment(models.Model):
    order_amount = models.FloatField('Сумма')
    uuid = models.CharField('ID заказа', max_length=64, default=uuid4)
    date_created = models.DateTimeField('Дата создания', auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    active = models.BooleanField('Статус оплаты', default=False)

    def __str__(self):
        return f'{self.user} - {self.pk}'

    class Meta:
        verbose_name = 'Оплата'
        verbose_name_plural = 'Оплаты'


class Appeal(models.Model):
    class Statuses(models.TextChoices):
        IN_WORK = 'IN_WORK', 'В работе'
        MODERATION = 'MODERATION', 'На рассмотрении'
        COMPLETED = 'COMPLETED', 'Выполнено'

    name = models.CharField(max_length=255, verbose_name='Название')
    text = models.TextField(verbose_name='Текст обращения')
    file = models.FileField(verbose_name='Файл', upload_to='appeals/', blank=True, null=True)
    sender = models.ForeignKey('accounts.User', on_delete=models.CASCADE, verbose_name='Отправитель', related_name='sender_appeals')
    status = models.CharField(max_length=255, verbose_name='Статус', choices=Statuses.choices, default=Statuses.MODERATION)
    responsible = models.ForeignKey('accounts.User', on_delete=models.CASCADE, verbose_name='Ответственный',
                                    blank=True, null=True, related_name='responsible_appeals')
    date_created = models.DateTimeField(verbose_name='Дата обращения', auto_now=True)

    class Meta:
        verbose_name = 'Обращение'
        verbose_name_plural = 'Обращения'

    def __str__(self):
        return self.name
