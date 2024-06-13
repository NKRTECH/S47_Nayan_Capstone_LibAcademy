// utils/RoleBasedLazyLoad.js
import { jwtDecode } from "jwt-decode";
import React, { Suspense, lazy } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const RoleBasedLazyLoad = (importFunc, allowedRoles, userRole) => {
  const LazyComponent = lazy(importFunc);
  const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : "";
    const role = decodedToken ? decodedToken.role : "user";

  const LazyLoadedComponent = (props) =>
    allowedRoles.includes(userRole)? (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    ) : (
      navigate("/unauthorized", { state: { role } })
    );

  LazyLoadedComponent.displayName = 'LazyLoadedComponent'; // Assigning a display name

  return LazyLoadedComponent;
};