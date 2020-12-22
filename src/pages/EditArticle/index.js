// Core
import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";

// Hooks
import { useFetch } from "../../hooks";

// Components
import { ArticleForm } from "../../components";

// Tools
import { book } from "../book";

// Context
import { CurrentUserContext } from "../../context";

export const EditArticle = ({ match }) => {
  const slug = match.params.slug;
  const baseURL = `${book.articles}${slug}`;

  const [{ response: fetchArticleResponse }, articleFetcher] = useFetch(
    baseURL
  );
  const [
    { response: updatedArticleResponse, error: updateArticleError },
    updatedArticleFetcher,
  ] = useFetch(baseURL);

  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);

  const handleSubmit = (article) => {
    updatedArticleFetcher({
      method: "PUT",
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    if (!currentUserState.isLoggedIn) {
      return <Redirect to={book.main} />;
    }
  }, [currentUserState]);

  useEffect(() => {
    if (!updatedArticleResponse) return;
    setIsSuccessfulSubmit(true);
  }, [updatedArticleResponse]);

  useEffect(() => {
    articleFetcher();
  }, [articleFetcher]);

  useEffect(() => {
    if (!fetchArticleResponse) return;
    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList,
    });
  }, [fetchArticleResponse]);

  if (isSuccessfulSubmit) {
    return <Redirect to={`${book.articles}${slug}`} />;
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  );
};
