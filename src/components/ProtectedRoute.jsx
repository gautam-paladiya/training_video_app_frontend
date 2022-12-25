import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../util/util.js";

const ProtectedRoute = ({ user, redirectPath = "/login", children }) => {
  const token = getToken();
  if (token !== null && token !== "undefined") {
    return children;
  }
  return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
