import graphene
import graphql_jwt
from django.contrib.auth.models import Permission

from main.gql.auth.queries import AuthQueries
from main.gql.auth.mutations import AuthMutations


class Query(AuthQueries):
    pass


class Mutation(AuthMutations):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
