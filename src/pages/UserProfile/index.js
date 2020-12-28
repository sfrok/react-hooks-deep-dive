// Core
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

// Hooks
import { useFetch } from "../../hooks";

// Tools
import { book } from "../book";

// Components
import { Loading } from "../../components";
import { UserArticles } from "../UserArticles";

export const UserProfile = ({ location, match }) => {
  const slug = match.params.slug;
  const isFavoritesPage = location.pathname.includes("favorites");

  const baseUrl = `${book.profile}${slug}`;
  const [{ response }, fetcher] = useFetch(baseUrl);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  if (!response) return <Loading />;

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img className="user-img" src={response.profile.image} alt="" />
              <h4>{response.profile.username}</h4>
              <p>{response.profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    to={`${book.profile}${response.profile.username}`}
                    className="nav-link"
                    exact
                  >
                    My Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`${book.profile}${response.profile.username}/favorites`}
                    className="nav-link"
                  >
                    Favorites Posts
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticles
              username={response.profile.username}
              location={location}
              isFavorites={isFavoritesPage}
              url={match.url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
