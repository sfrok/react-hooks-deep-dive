// Core
import React from "react";
import { NavLink, Link } from "react-router-dom";

// Tools
import { book } from "../pages/book";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to={book.main} className="navbar-brand">
          Blog
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to={book.main} className="nav-link" exact>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={book.login} className="nav-link">
              Sign in
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={book.register} className="nav-link">
              Sign up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
