from django.contrib import admin
from .models import ExtendedUser, Pizza, Order, Ingredient
admin.site.register(ExtendedUser)
admin.site.register(Pizza)
admin.site.register(Order)
admin.site.register(Ingredient)
