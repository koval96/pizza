from curses import noecho
import graphene
import graphql_jwt
from main.models import ExtendedUser, Pizza
from main.gql.types import PizzaType

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


class PizzaMutations(graphene.ObjectType):
    add_to_cart = AddToCart.Field()
    delete_from_cart = DeleteFromCart.Field()
    change_volume_cart = ChangeVolumeCart.Field()

