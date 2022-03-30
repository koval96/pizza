import { gql } from "@apollo/client";

export const GET_ORDER_ID = gql`
query ($id: ID!)
{
    getOrderId(id: $id){
          id
          adress
          phone
          status
          pizzas{
            name
            ingredients{
              name
            }
            size
      }
    }
}
`;
