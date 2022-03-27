import React, { useState, useEffect, useContext } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";

import { UPDATE_REFRESH_TOKEN } from "../../gql/mutations/refreshToken";
import { GET_USER_INFO } from "../../gql/queries/getUserInfo";

export const UserContext = React.createContext();

function AuthLayer({ children }) {
  const [user, setUser] = useState({});

  const [getUserInfo, { loading: infoLoading }] = useLazyQuery(GET_USER_INFO, {
    onCompleted: (data) => {
      setUser(Object.assign({}, data.getUserInfo, user));
      console.log(data.getUserInfo)
      localStorage.setItem("auth", "success");
    },
    fetchPolicy: "cache-and-network",
  });

  const [refreshToken, { loading }] = useMutation(UPDATE_REFRESH_TOKEN, {
    onCompleted: (data) => {
      setUser(data.refreshToken.payload);

      localStorage.setItem("accessToken", data.refreshToken.token);
      localStorage.setItem("refreshToken", data.refreshToken.refreshToken);
      localStorage.setItem("reloaded", false);

      getUserInfo({
        variables: { username: data.refreshToken.payload.username },
      });

      setTimeout(() => {
        refreshToken({
          variables: { refreshToken: localStorage.getItem("refreshToken") },
        });
      }, 290000);
    },
    onError: (error) => {
      localStorage.setItem("reloaded", true);
      setUser("notAuthorised");
    },
  });

  function checkToken() {
    let refresh = localStorage.getItem("refreshToken");
    if (localStorage.getItem("auth") == "expired token") {
      refreshToken({
        variables: { refreshToken: refresh },
      });
    }
  }

  useEffect(() => {
    let refresh = localStorage.getItem("refreshToken");
    refreshToken({
      variables: { refreshToken: refresh },
    });

    window.addEventListener("storage", checkToken);
    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, infoLoading }}>
      <>
        {/*<Loader loading={loading} />*/}
        {children}
      </>
    </UserContext.Provider>
  );
}

export default AuthLayer;
