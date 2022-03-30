import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query {
    getAllOrders {
      id
      adress
      phone
      status
      pizzas {
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
