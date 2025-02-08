// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("crm-token");
  const userRole = sessionStorage.getItem("crm-role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Get the roles from the matched route
  const { roles } = children.props;

  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
