import { gql } from "@apollo/client";

export const DELETE_FROM_CART = gql`
  mutation ($username: String!, $id: ID!) {
    deleteFromCart(username: $username, id: $id) {
      cart {
        id
        name
        ingredients {
          name
          type
        }
        volume
        slices
        size
      }
    }
  }
`;
