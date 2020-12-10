// Core
import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";

// Tools
import { book } from "../book";

// Hooks
import { useFetch, useLocalStorage } from "../../hooks";

// Context
import { CurrentUserContext } from "../../context";

// Components
import { Catcher } from "./components/Catcher";

export const Authentication = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === book.login;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);
  const [, setCurrentUserState] = useContext(CurrentUserContext);

  const apiUrl = isLoginPage ? "users/login" : "/users";
  const [{ isLoading, response, error }, fetcher] = useFetch(apiUrl);
  const [, setToken] = useLocalStorage("token");

  const pageTitle = isLoginPage ? "Sign In" : "Sign Up";
  const pageLink = isLoginPage ? book.register : book.login;
  const description = isLoginPage ? "Register" : "Login in";

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = isLoginPage
      ? { email, password }
      : { email, password, username };

    fetcher({
      method: "post",
      data: {
        user,
      },
    });
  };

  useEffect(() => {
    if (!response) return;
    setToken(response.user.token);
    setIsSuccessfulSubmit(true);
    setCurrentUserState((state) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUserState: response.user,
    }));
  }, [response, setToken, setCurrentUserState]);

  if (isSuccessfulSubmit) {
    return <Redirect to={book.main} />;
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={pageLink}>{description}</Link>
            </p>
            <form onSubmit={handleSubmit}>
              {error && <Catcher errors={error.errors} />}
              <fieldset>
                {!isLoginPage && (
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
