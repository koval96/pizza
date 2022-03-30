import graphene

from main.gql.types import PizzaType, IngredientType, OrderType
from main.models import Pizza, Ingredient, Order


class PizzaQueries(graphene.ObjectType):
    get_all_pizzas = graphene.List(PizzaType)
    get_all_ingredients = graphene.List(IngredientType)
    get_pizza_by_id = graphene.Field(PizzaType, id=graphene.ID(required=True))
    get_all_orders = graphene.List(OrderType)
    get_order_by_id = graphene.Field(OrderType, id=graphene.ID(required=True))

    def resolve_get_all_pizzas(root, info):
        return Pizza.objects.filter(is_shown=True)

    def resolve_get_all_ingredients(root, info):
        return Ingredient.objects.all()

    def resolve_get_pizza_by_id(root, info, id):
        return Pizza.objects.get(id=id)

    def resolve_get_all_orders(root, info):
        return Order.objects.all()

    def resolve_get_order_by_id(root, info, id):
        return Order.objects.get(id=id)
