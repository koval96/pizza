import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation (
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!,
    $email: String!
  ) {
    register(
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName,
      email: $email,
    ) {
      ok
    }
  }
`;
