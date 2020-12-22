// Core
import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { Redirect } from "react-router-dom";

// Components
import { Catcher } from "./Catcher";

// Context
import { CurrentUserContext } from "../context";

// Tools
import { book } from "../pages/book";

export const ArticleForm = ({ onSubmit, errors, initialValues }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");
  const [tagList, setTagList] = useState("");

  const [currentUserState] = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const article = {
      title,
      body,
      description,
      tagList,
    };

    onSubmit(article);
  };

  useEffect(() => {
    if (!initialValues) return;
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setBody(initialValues.body);
    setTagList(initialValues.tagList.join(" "));
  }, [initialValues]);

  if (!currentUserState.isLoggedIn) {
    return <Redirect to={book.main} />;
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <Catcher errors={errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write a body (in markdown)"
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter tags"
                    value={tagList}
                    onChange={(event) => setTagList(event.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <button
                    type="submit"
                    className="btn btn-lg pull-xs-right btn-primary"
                  >
                    Publish
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
