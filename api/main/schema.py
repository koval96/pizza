import graphene
import graphql_jwt
from django.contrib.auth.models import Permission

from main.gql.order.queries import OrderQueries

from main.gql.auth.queries import AuthQueries
from main.gql.auth.mutations import AuthMutations

from main.gql.pizza.queries import PizzaQueries
from main.gql.pizza.mutations import PizzaMutations


class Query(AuthQueries, PizzaQueries, OrderQueries):
    pass


class Mutation(AuthMutations, PizzaMutations):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
