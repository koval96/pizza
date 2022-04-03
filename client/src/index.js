import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

import App from "./App";
import AuthLayer from "./components/auth/AuthLayer";
import "./static/css/core.css";

const DEV = true

// APOLLO CONFIGURATION
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    if (graphQLErrors[0].message == "Signature has expired") {
      localStorage.setItem("auth", "expired token");
      window.dispatchEvent(new Event("storage"));
      if (localStorage.getItem("reloaded") == false) {
        localStorage.setItem("reloaded", true);
      } else {
        console.log("not exp");
      }
    }
    DEV && console.log("graphQLErrors", graphQLErrors);
  }
  if (networkError) {
    DEV && console.log("networkError", networkError);
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: DEV
      ? "http://localhost:8000/graphql/"
      : "https://piz2a.herokuapp.com/graphql/",
    credentials: "include",
  }),
]);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("accessToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    {" "}
    <React.StrictMode>
      <AuthLayer>
        <App />
      </AuthLayer>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals();
