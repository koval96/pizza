import { gql } from "@apollo/client";

export const UPDATE_REFRESH_TOKEN = gql`
  mutation ($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
      payload
    }
  }
`;
