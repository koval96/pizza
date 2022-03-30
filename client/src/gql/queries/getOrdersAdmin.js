import { gql } from "@apollo/client";

export const GET_ORDERS_ADMIN = gql`
query {
    getOrdersAdmin{
          id
          adress
          phone
          pizzas{
            ingredients{
              name
            }
            size
      }
    }
}
`;
