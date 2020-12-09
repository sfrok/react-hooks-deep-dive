// Core
import React from "react";
import { BrowserRouter } from "react-router-dom";

// Routes
import { Routes } from "./pages/routes";

// Shared
import { NavBar } from "./components";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
};
