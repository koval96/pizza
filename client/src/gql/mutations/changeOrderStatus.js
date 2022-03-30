import { gql } from "@apollo/client";

export const CHANGE_ORDER_STATUS = gql`
  mutation ($status: String!, $id: ID!) {
    changeOrderStatus(status: $status, id: $id) {
      order {
        id
        pizzas {
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
        adress
        phone
        status
      }
    }
  }
`;
