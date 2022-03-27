# Generated by Django 3.2.8 on 2022-03-27 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_extendeduser_liked_pizzas'),
    ]

    operations = [
        migrations.AddField(
            model_name='extendeduser',
            name='orders',
            field=models.ManyToManyField(blank=True, related_name='user_orders', to='main.Order'),
        ),
        migrations.RemoveField(
            model_name='pizza',
            name='ingredients',
        ),
        migrations.AddField(
            model_name='pizza',
            name='ingredients',
            field=models.ManyToManyField(blank=True, related_name='pizza_ingredients', to='main.Ingredient'),
        ),
    ]
