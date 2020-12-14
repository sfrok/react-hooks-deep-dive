// Core
import React from "react";
import { BrowserRouter } from "react-router-dom";

// Routes
import { Routes } from "./pages/routes";

// Shared
import { CurrentUserChecker, NavBar } from "./components";

// Providers
import { CurrentUserProvider } from "./context";

// Hot
import { hot } from "react-hot-loader/root";

const Main = () => {
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

export const App = hot(Main);
