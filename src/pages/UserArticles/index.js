// Core
import React, { useEffect } from "react";
import { stringify } from "query-string";

// Utils
import { getPaginator, limit } from "../../utils";
import { book } from "../book";

// Hooks
import { useFetch } from "../../hooks";

// Components
import { Loading, Error, Feed, Pagination } from "../../components";

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };

  return `${book.articles}?${stringify(params)}`;
};

export const UserArticles = ({ username, location, isFavorites, url }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const baseUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, isLoading, error }, fetcher] = useFetch(baseUrl);

  useEffect(() => {
    fetcher();
  }, [fetcher, isFavorites]);

  return (
    <>
      {isLoading && <Loading />}
      {error && <Error />}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  );
};
