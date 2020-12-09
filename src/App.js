// Core
import React from "react";
import { BrowserRouter } from "react-router-dom";

// Routes
import { Routes } from "./pages/routes";

export const App = () => {
  return (
    <div>
      <h1>App</h1>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
};
