# Generated by Django 3.2.8 on 2022-03-30 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_order_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pizza',
            name='size',
            field=models.CharField(blank=True, default='M', max_length=10),
        ),
    ]
