# Generated by Django 4.2.16 on 2025-05-31 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0018_livingarea_home_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='indication',
            name='status_payment',
            field=models.BooleanField(default=False, verbose_name='Статус оплаты'),
        ),
        migrations.AlterField(
            model_name='tariff',
            name='key',
            field=models.CharField(choices=[('coldWater', 'Холодная вода'), ('hotWater', 'Горячая вода'), ('disposal', 'Водоотведение'), ('electricity', 'Электроэнергия'), ('otherService', 'Дополнительные услуги')], max_length=255, verbose_name='Ключ'),
        ),
    ]
