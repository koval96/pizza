import { gql } from "@apollo/client";

export const GET_ALL_INGREDIENTS = gql`
  query {
    getAllIngredients {
      id
      name
      type
    }
  }
`;
