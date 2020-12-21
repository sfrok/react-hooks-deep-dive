// Core
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Hooks
import { useFetch } from "../hooks";

// Components
import { Loading } from "./Loading";
import { Error } from "./Error";

// Utils
import { book } from "../pages/book";

export const PopularTags = () => {
  const baseURL = `${book.tags}`;
  const [{ response, isLoading, error }, fetcher] = useFetch(baseURL);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  if (isLoading || !response) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="sidebar">
      <p>Popular tags</p>
      <div className="tag-list">
        {response.tags.map((tag) => (
          <Link
            to={`${book.tags}${tag}`}
            className="tag-default tag-pill"
            key={tag}
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};
