import graphene

from main.gql.types import PizzaType
from main.models import Pizza

class PizzaQueries(graphene.ObjectType):
    get_all_pizzas = graphene.List(PizzaType)

    def resolve_get_all_pizzas(root, info):
        return Pizza.objects.filter(is_shown=True)



