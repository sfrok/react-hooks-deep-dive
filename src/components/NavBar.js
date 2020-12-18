// Core
import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

// Tools
import { book } from "../pages/book";

// Context
import { CurrentUserContext } from "../context";

export const NavBar = () => {
  const [currentUser] = useContext(CurrentUserContext);
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
          {!currentUser.isLoggedIn ? (
            <>
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
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to={`${book.articles}/new`} className="nav-link">
                  <i className="ion-compose" />
                  &nbsp; New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`${book.profile}${currentUser.currentUser.username}`}
                  className="nav-link"
                >
                  <img
                    className="user-pic"
                    src={currentUser.currentUser.image}
                    alt=""
                  />
                  &nbsp; {currentUser.currentUser.username}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
