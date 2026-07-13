import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const isAuthenticate = useSelector((state) => state.auth.user);

  if (isAuthenticate) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default PublicRoutes;
