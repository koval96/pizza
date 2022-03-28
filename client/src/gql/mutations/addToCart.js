import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation ($username: String!, $id: ID!) {
    addToCart(username: $username, id: $id) {
      cart {
        id
        name
        ingredients {
          name
          type
          slices
        }
        volume
      }
    }
  }
`;
