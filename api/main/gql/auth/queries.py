import graphene

from main.gql.types import UserType
from main.models import ExtendedUser

class AuthQueries(graphene.ObjectType):
    get_user_info = graphene.Field(UserType, username=graphene.String(required=True))
    get_user_perm = graphene.Field(graphene.String, username=graphene.Argument(graphene.String, required=True))
    # get_user_all =  graphene.List(UserType)

    # def resolve_get_user_all(root, info):
    #     return ExtendedUser.objects.all()

    def resolve_get_user_info(root, info, username):
        return ExtendedUser.objects.get(username=username)

    def resolve_get_user_perm(root, info, username):
        user = ExtendedUser.objects.get(username=username)
        return user.is_superuser


