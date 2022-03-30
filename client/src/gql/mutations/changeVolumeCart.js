import { gql } from "@apollo/client";

export const CHANGE_VOLUME_CART = gql`
  mutation ($username: String!, $id: ID!, $action: Boolean!) {
    changeVolumeCart(username: $username, id: $id, action: $action) {
      cart {
        id
        name
        ingredients {
          name
          type
        }
        slices
        size
        volume
      }
    }
  }
`;
