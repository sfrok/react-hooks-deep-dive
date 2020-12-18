// Core
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

// Tools
import { book } from "../pages/book";

// Context
import { CurrentUserContext } from "../context";

export const FeedToggler = ({ tagName }) => {
  const [currentUser] = useContext(CurrentUserContext);

  return (
    <div className="feed-toggler">
      <ul className="nav nav-pills outline-active">
        {currentUser.isLoggedIn && (
          <li className="nav-item">
            <NavLink to={book.feed} className="nav-link">
              Your feed
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          <NavLink to={book.main} className="nav-link" exact>
            Global feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink to={`${book.tags}${tagName}`} className="nav-link">
              <i className="ion-pound">{tagName}</i>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};
