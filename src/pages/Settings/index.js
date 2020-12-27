// Core
import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// Hooks
import { useFetch, useLocalStorage } from "../../hooks";

// Context
import { CurrentUserContext } from "../../context";

// Components
import { Catcher } from "../../components";

// Tools
import { book } from "../book";

export const Settings = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  const baseUrl = "/user";
  const [{ response, error }, fetcher] = useFetch(baseUrl);
  const [, setToken] = useLocalStorage("token");

  const [imageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successfulLogout, setSuccessfulLogout] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetcher({
      method: "PUT",
      data: {
        user: {
          ...currentUserState.currentUser,
          imageUrl,
          username,
          bio,
          email,
          password,
        },
      },
    });
  };
  const logout = (e) => {
    e.preventDefault();
    setToken("");
    dispatch({ type: "LOGOUT" });
    setSuccessfulLogout(true);
  };

  useEffect(() => {
    if (!currentUserState.currentUser) return;
    const currentUser = currentUserState.currentUser;

    setImageUrl(currentUser.image === null ? "" : currentUser.image);
    setUsername(currentUser.username);
    setBio(currentUser.bio === null ? "" : currentUser.bio);
    setEmail(currentUser.email);
  }, [currentUserState.currentUser]);

  useEffect(() => {
    if (!response) return;
    dispatch({ type: "SET_AUTHORIZED", payload: response.user });
  }, [response, dispatch]);

  if (successfulLogout) {
    return <Redirect to={book.main} />;
  }

  if (!currentUserState.currentUser) {
    return <Redirect to={book.main} />;
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your settings</h1>
            {error && <Catcher errors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="URL of profile picture"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </fieldset>
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
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              To logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
