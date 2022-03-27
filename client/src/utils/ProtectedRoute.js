import { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

import { UserContext } from "../components/auth/AuthLayer";

function ProtectedRoute({ children, ...rest }) {
  const { user } = useContext(UserContext);
  return (
    <>
      <Route
        {...rest}
        render={({ location }) =>
          user.username ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    </>
  );
}

export default ProtectedRoute;
