import graphene
import graphql_jwt
from main.models import ExtendedUser
from main.gql.types import PizzaType

class AddToCart(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        items = graphene.String(required=True)

    ok = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, username, items):
        user = ExtendedUser.objects.get(username=username)
        cart_items = items.split(",")
        for item in cart_items:
            pass
        user.save()
        return Register(ok=True)


class PizzaMutations(graphene.ObjectType):
    register = Register.Field()
