import React from "react";
import {  Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function RequireAuth(props) {
  const { logincomponent } = props;

  const currentUser = useSelector((state) => state.verify);
  
  const location = useLocation();

  if (logincomponent === "auth") {
    if (!currentUser.collection) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  if (logincomponent === "login") {
    if (currentUser.collection) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  return props.children;
}

RequireAuth.propTypes = {
  logincomponent: PropTypes.string,
};
