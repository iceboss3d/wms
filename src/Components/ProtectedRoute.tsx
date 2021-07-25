import jwtDecode from "jwt-decode";
import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthDispatch, AuthContext } from "../Context";
const user = window.localStorage.getItem("user");
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authenticated = useContext(AuthContext);
  const authDispatch = useContext(AuthDispatch);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
};
export default ProtectedRoute;
