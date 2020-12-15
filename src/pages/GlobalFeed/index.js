// Core
import React, { useEffect } from "react";
import { stringify } from "query-string";

// Hooks
import { useFetch } from "../../hooks";

// Components
import { Feed } from "../../components";
import { Pagination } from "../../components";

// Utils
import { limit, getPaginator } from "../../utils";

export const GlobalFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const url = match.url;
  const stringifiedParams = stringify({
    limit,
    offset,
  });
  const baseURL = `/articles?${stringifiedParams}`;
  const [{ response, isLoading, error }, fetcher] = useFetch(baseURL);

  useEffect(() => {
    fetcher();
  }, [fetcher, currentPage]);

  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1>Blog</h1>
            <p>A place to share knowledge</p>
          </div>
        </div>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              {isLoading && <div>Loading...</div>}
              {error && <div>Something went wrong...</div>}
              {!isLoading && response && (
                <>
                  <Feed articles={response.articles} />
                  <Pagination
                    total={response.articlesCount}
                    limit={limit}
                    currentPage={currentPage}
                    url={url}
                  />
                </>
              )}
            </div>
            <div className="col-md-3">Popular tags</div>
          </div>
        </div>
      </div>
    </>
  );
};
