import { gql } from "@apollo/client";

export const CREATE_PIZZA_FROM_CART = gql`
  mutation (
    $name: String!
    $slices: Int!
    $size: String!
    $ingredients: String!
  ) {
    createPizzaForCart(
      name: $name
      slices: $slices
      ingredients: $ingredients
      size: $size
    ) {
      pizza {
        id
        name
        ingredients {
          name
          type
        }
        slices
        size
      }
    }
  }
`;
