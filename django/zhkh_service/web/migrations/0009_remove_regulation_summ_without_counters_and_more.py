# Generated by Django 4.2.16 on 2025-01-26 06:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0008_regulation_summ_without_counters'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='regulation',
            name='summ_without_counters',
        ),
        migrations.AddField(
            model_name='regulation',
            name='standard_summ',
            field=models.PositiveIntegerField(default=1, verbose_name='Стандартная сумма'),
            preserve_default=False,
        ),
    ]
