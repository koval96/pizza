import { gql } from "@apollo/client";

export const REVOKE_TOKEN = gql`
  mutation ($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      revoked
    }
  }
`;
