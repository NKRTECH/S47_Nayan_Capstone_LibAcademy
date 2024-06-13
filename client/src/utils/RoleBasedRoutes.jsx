// utils/roleBasedRoutes.js
import React, { Suspense } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import Unauthorized from "../Unauthorized";
import { TutorRoutes } from "../routes/TutorRoutes";
import { LearnerRoutes } from "../routes/LearnerRoutes";
import { UserRoutes } from "../routes/UserRoutes";


const getRoutesByRole = (role) => {
  switch (role) {
    case "user":
      return UserRoutes;
    case "tutor":
      return TutorRoutes;
    case "learner":
      return LearnerRoutes;
    default:
      return [];
  }
};

export const RoleBasedRoutes = ({ userRole }) => {
  const routes = getRoutesByRole(userRole);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
        <Route path="*" element={<div>404 Not Found </div>} />
      </Routes>
    </Suspense>
  );
};
