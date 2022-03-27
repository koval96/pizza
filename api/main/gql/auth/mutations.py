import graphene
import graphql_jwt
from main.models import ExtendedUser
from main.gql.types import UserType


class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)


class Register(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        email = graphene.String(required=True)

    ok = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, username, password, first_name, last_name, email):
        user = ExtendedUser.objects.create(
            username=username, first_name=first_name, last_name=last_name, email=email)
        user.set_password(password)
        user.save()
        return Register(ok=True)


class AuthMutations(graphene.ObjectType):
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revokeToken = graphql_jwt.Revoke.Field()
    register = Register.Field()
