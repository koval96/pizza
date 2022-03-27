import { gql } from "@apollo/client";

export const GET_ALL_PIZZAS = gql`
  query {
    getAllPizzas {
      id
      name
      ingredients {
        name
        type
      }
    }
  }
`;
