import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
  query ($username: String!) {
    getUserInfo(username: $username) {
      id
      username
      firstName
      lastName
      type
      isStaff
      cart {
        id
        name
        ingredients {
          name
          type
          slices
        }
        volume
      }

      orders {
        id
        phone
        adress
        pizzas {
          name
          ingredients {
            name
            type
            slices
          }
          volume
        }
      }
    }
  }
`;
