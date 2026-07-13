import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoutes = () => {
   const token = Cookies.get("token");
console.log(token, "public route token");
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default PublicRoutes;
