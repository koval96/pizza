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
        user {
          username
          firstName
          lastName
        }
        adress
        phone
        status
      }
    }
  }
`;
