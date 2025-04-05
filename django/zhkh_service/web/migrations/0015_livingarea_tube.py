# Generated by Django 4.2.16 on 2025-04-05 11:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0014_merge_20250405_1652'),
    ]

    operations = [
        migrations.AddField(
            model_name='livingarea',
            name='tube',
            field=models.CharField(blank=True, choices=[('ONE', 'Один водосток'), ('TWO', 'Два водостока')], default='', max_length=255, null=True),
        ),
    ]
