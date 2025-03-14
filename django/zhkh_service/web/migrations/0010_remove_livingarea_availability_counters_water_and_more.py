# Generated by Django 4.2.16 on 2025-03-10 01:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0009_remove_regulation_summ_without_counters_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='livingarea',
            name='availability_counters_water',
        ),
        migrations.CreateModel(
            name='Receipt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='receipts/', verbose_name='Квитанция')),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('living_area', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='web.livingarea', verbose_name='Жил. площадь')),
            ],
            options={
                'verbose_name': 'Платежный документ',
                'verbose_name_plural': 'Платежный документы',
            },
        ),
    ]
