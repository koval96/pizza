import graphene

from main.gql.types import OrderType
from main.models import Order

class OrderQueries(graphene.ObjectType):
    get_orders_admin = graphene.List(OrderType)
    get_order_id = graphene.Field(OrderType, id=graphene.ID(required=True))
    def resolve_get_orders_admin(root, info):
        return Order.objects.all()

    def resolve_get_order_id(root, info, id):
        return Order.objects.get(id=id)