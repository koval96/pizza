from graphene_django import DjangoObjectType

from main.models import ExtendedUser, Pizza, Order, Ingredient


class UserType(DjangoObjectType):
    class Meta:
        model = ExtendedUser


class PizzaType(DjangoObjectType):
    class Meta:
        model = Pizza


class OrderType(DjangoObjectType):
    class Meta:
        model = Order


class IngredientType(DjangoObjectType):
    class Meta:
        model = Ingredient
