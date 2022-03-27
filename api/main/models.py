from time import time

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class ExtendedUser(AbstractUser):
    email = models.EmailField(blank=False, unique=True, max_length=255, verbose_name='User Email')
    type = models.CharField(max_length=10)
    liked_pizzas = models.ForeignKey('Pizza', on_delete=models.DO_NOTHING, null=True, blank=True)
    orders = models.ManyToManyField("Order", related_name="user_orders", blank=True)
    cart = models.ManyToManyField("Pizza", related_name="user_cart", blank=True)

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"

class Pizza(models.Model):
    name = models.CharField(max_length=100)
    ingredients = models.ManyToManyField('Ingredient', related_name="pizza_ingredients", blank=True)
    size = models.CharField(max_length=10, blank=True)
    is_shown = models.BooleanField(default=False) # Показывается ли пицца на главном экране
class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    slices = models.IntegerField(default=8)

    def __str__(self):
        return self.name
class Order(models.Model):
    user = models.ForeignKey(ExtendedUser, on_delete=models.CASCADE)
    pizzas = models.ManyToManyField(Pizza, related_name="order_pizzas", blank=True)
    adress = models.CharField(max_length=200, blank=True)
