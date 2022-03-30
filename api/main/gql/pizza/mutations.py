import graphene
import graphql_jwt
import json

from main.models import ExtendedUser, Ingredient, Pizza, Order as OrderModel
from main.gql.types import PizzaType, OrderType


class AddToCart(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        id = graphene.ID(required=True)

    cart = graphene.List(PizzaType)

    @classmethod
    def mutate(cls, root, info, username, id):
        user = ExtendedUser.objects.get(username=username)
        item = Pizza.objects.get(id=id)
        item.pk = None
        item.is_shown = False
        item.save()
        for ingredient in Pizza.objects.get(id=id).ingredients.all():
            item.ingredients.add(ingredient)
        user.cart.add(item)
        user.save()
        print(user.cart)
        return AddToCart(cart=user.cart.all())


class DeleteFromCart(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        id = graphene.ID(required=True)

    cart = graphene.List(PizzaType)

    @classmethod
    def mutate(cls, root, info, username, id):
        user = ExtendedUser.objects.get(username=username)
        item = Pizza.objects.get(id=id)
        user.cart.remove(item)
        user.save()
        return DeleteFromCart(cart=user.cart.all())


class ChangeVolumeCart(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        id = graphene.ID(required=True)
        action = graphene.Boolean(required=True)

    cart = graphene.List(PizzaType)

    @classmethod
    def mutate(cls, root, info, username, id, action):
        user = ExtendedUser.objects.get(username=username)
        item = Pizza.objects.get(id=id)
        if action:
            item.volume += 1
        else:
            item.volume -= 1
        item.save()
        return ChangeVolumeCart(cart=user.cart.all())


class Order(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=False)
        adress = graphene.String(required=True)
        phone = graphene.String(required=True)
        pizzas = graphene.String(required=True)

    order = graphene.Field(OrderType)

    @classmethod
    def mutate(cls, root, info, adress, phone, pizzas, username=None):
        order = OrderModel.objects.create(phone=phone, adress=adress)
        if username:
            user = ExtendedUser.objects.get(username=username)
            for item in user.cart.all():
                user.cart.remove(item)
            order.user = user
            user.orders.add(order)

        pizzas = json.loads(pizzas)
        for pizza in pizzas:
            pizza = Pizza.objects.get(id=int(pizza['id']))
            order.pizzas.add(pizza)
        order.save()
        return Order(order=order)


class CreatePizzaForCart(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        ingredients = graphene.String(required=True)
        size = graphene.String(required=True)
        slices = graphene.Int(required=True)

    pizza = graphene.Field(PizzaType)

    @classmethod
    def mutate(cls, root, info, name, ingredients, size, slices):
        pizza = Pizza.objects.create(
            name=name, size=size, slices=slices, is_shown=False)

        ingredients = json.loads(ingredients)
        for ingredient in ingredients:
            ingredient = Ingredient.objects.get(id=int(ingredient['id']))
            pizza.ingredients.add(ingredient)
        pizza.save()
        return CreatePizzaForCart(pizza=pizza)


class ChangeOrderStatus(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        status = graphene.String(required=True)

    order = graphene.Field(OrderType)

    @classmethod
    def mutate(cls, root, info, id, status):
        order = OrderModel.objects.get(id=id)
        order.status = status
        order.save()

        return ChangeOrderStatus(order=order)


class PizzaMutations(graphene.ObjectType):
    add_to_cart = AddToCart.Field()
    delete_from_cart = DeleteFromCart.Field()
    change_volume_cart = ChangeVolumeCart.Field()
    order = Order.Field()
    create_pizza_for_cart = CreatePizzaForCart.Field()
    change_order_status = ChangeOrderStatus.Field()
