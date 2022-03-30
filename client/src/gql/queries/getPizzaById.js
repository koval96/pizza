import { gql } from "@apollo/client";

export const GET_PIZZA_BY_ID = gql`
  query ($id: ID!) {
    getPizzaById(id: $id) {
      id
      name
      ingredients {
        id
        name
        type
      }
    }
  }
`;
