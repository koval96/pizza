import { gql } from "@apollo/client";

export const ORDER = gql`
  mutation (
    $username: String
    $adress: String!
    $phone: String!
    $pizzas: String!
  ) {
    order(
      username: $username
      adress: $adress
      phone: $phone
      pizzas: $pizzas
    ) {
      order {
        id
        pizzas {
          name
          ingredients {
            name
            type
            slices
          }
          volume
        }
        user {
            username
            firstName
            lastName
        }
        adress
        phone
      }
    }
  }
`;
