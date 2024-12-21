# Generated by Django 5.1.3 on 2024-12-01 04:55

import django.core.validators
import web.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AboutPortal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Заголовок')),
                ('description', models.TextField(verbose_name='Описание')),
                ('address', models.CharField(max_length=255, verbose_name='Адрес')),
                ('phone_organization', models.CharField(blank=True, max_length=12, verbose_name='Телефон')),
                ('email_organization', models.EmailField(max_length=254, verbose_name='Электронный адрес организации')),
            ],
            options={
                'verbose_name': 'О портале',
                'verbose_name_plural': 'О порталах',
            },
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Имя')),
                ('phone', models.CharField(max_length=12, verbose_name='Телефон')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='Электронный адрес')),
            ],
            options={
                'verbose_name': 'Контакт',
                'verbose_name_plural': 'Контакты',
            },
        ),
        migrations.CreateModel(
            name='DataDeveloper',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
            ],
            options={
                'verbose_name': 'Информация о разработчике',
                'verbose_name_plural': 'Информация о разработчиках',
            },
        ),
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Заголовок')),
                ('description', models.TextField(verbose_name='Содержание')),
                ('image', models.ImageField(blank=True, upload_to='images/news/', verbose_name='Изображение')),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')),
            ],
            options={
                'verbose_name': 'Новость',
                'verbose_name_plural': 'Новости',
                'ordering': ['-date_created'],
            },
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Название')),
                ('description', models.TextField(verbose_name='Содержание')),
                ('price', models.FloatField(validators=[django.core.validators.MinValueValidator(0), web.models.is_nan_validator], verbose_name='Цена')),
                ('order', models.PositiveIntegerField(default=0, verbose_name='Порядок вывода')),
            ],
            options={
                'verbose_name': 'Услуга',
                'verbose_name_plural': 'Услуги',
                'ordering': ['order'],
            },
        ),
    ]
