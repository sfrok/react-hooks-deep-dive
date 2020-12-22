// Core
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// Components
import { ArticleForm } from "../../components";

// Tools
import { book } from "../book";

// Hooks
import { useFetch } from "../../hooks";

export const CreateArticle = () => {
  const baseUrl = book.articles;
  const [{ response, error, isLoading }, fetcher] = useFetch(baseUrl);
  const [isSubmit, setIsSuccessfulSubmit] = useState(false);

  const initialValues = {
    title: "",
    description: "",
    body: "",
    tagList: [],
  };

  const handleSubmit = (article) => {
    fetcher({
      method: "POST",
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    if (!response) return;
    setIsSuccessfulSubmit(true);
  }, [response, setIsSuccessfulSubmit]);

  if (isSubmit) {
    return <Redirect to={`${book.articles}${response.article.slug}`} />;
  }

  return (
    <ArticleForm
      errors={(error && error.errors) || {}}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
};
