# Generated by Django 4.2.16 on 2025-01-26 05:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0007_remove_indication_resident_count_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='regulation',
            name='summ_without_counters',
            field=models.PositiveIntegerField(default=1, verbose_name='Сумма без учета счетчиков'),
            preserve_default=False,
        ),
    ]
