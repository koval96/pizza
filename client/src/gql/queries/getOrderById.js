import { gql } from "@apollo/client";

export const GET_ORDER_BY_ID = gql`
  query ($id: ID!) {
    getOrderById(id: $id) {
      id
      adress
      status
      phone
      pizzas {
        id
        name
        ingredients {
          id
          name
          type
        }
        slices
        size
      }
    }
  }
`;
