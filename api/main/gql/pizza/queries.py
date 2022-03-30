import graphene

from main.gql.types import PizzaType, IngredientType
from main.models import Pizza, Ingredient


class PizzaQueries(graphene.ObjectType):
    get_all_pizzas = graphene.List(PizzaType)
    get_all_ingredients = graphene.List(IngredientType)
    get_pizza_by_id = graphene.Field(PizzaType, id=graphene.ID(required=True))

    def resolve_get_all_pizzas(root, info):
        return Pizza.objects.filter(is_shown=True)

    def resolve_get_all_ingredients(root, info):
        return Ingredient.objects.all()

    def resolve_get_pizza_by_id(root, info, id):
        return Pizza.objects.get(id=id)
