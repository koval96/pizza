# Generated by Django 3.2.8 on 2022-03-30 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_auto_20220328_2040'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(blank=True, default='waiting', max_length=50),
        ),
    ]
