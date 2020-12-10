// Core
import React from "react";
import { BrowserRouter } from "react-router-dom";

// Routes
import { Routes } from "./pages/routes";

// Shared
import { CurrentUserChecker, NavBar } from "./components";

// Providers
import { CurrentUserProvider } from "./context";

export const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <BrowserRouter>
          <NavBar />
          <Routes />
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
};
