# Generated by Django 4.2.16 on 2025-03-25 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communication', '0002_chat_chatmessage'),
    ]

    operations = [
        migrations.AddField(
            model_name='messageproblem',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to='files/', verbose_name='Файл'),
        ),
    ]
