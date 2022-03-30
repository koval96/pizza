import { gql } from "@apollo/client";

export const TOKEN_AUTH = gql`
  mutation ($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
      user {
        id
        username
        firstName
        lastName
        type
        isStaff
        cart {
          id
          name
          ingredients {
            name
            type
          }
          slices
          size
          volume
        }
      }
    }
  }
`;
