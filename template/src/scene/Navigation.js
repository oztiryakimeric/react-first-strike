import React from "react";
import { Routes, Route } from "react-router-dom";

import TrackedComponent from "common/component/TrackedComponent";
import HomePage from "./home/HomePage";

function Navigation() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <TrackedComponent event="PAGE_OPEN" params={{ path: "/" }}>
            <HomePage />
          </TrackedComponent>
        }
      />
    </Routes>
  );
}

export default Navigation;
