// Core
import React, { useEffect } from "react";
import { stringify } from "query-string";

// Hooks
import { useFetch } from "../../hooks";

// Components
import {
  Error,
  Feed,
  Loading,
  Pagination,
  PopularTags,
  FeedToggler,
} from "../../components";

// Utils
import { limit, getPaginator } from "../../utils";

export const TagFeed = ({ location, match }) => {
  const tagName = match.params.slug;
  const { offset, currentPage } = getPaginator(location.search);
  const url = match.url;
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName,
  });
  const baseURL = `/articles?${stringifiedParams}`;
  const [{ response, isLoading, error }, fetcher] = useFetch(baseURL);

  useEffect(() => {
    fetcher();
  }, [fetcher, currentPage, tagName]);

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
              <FeedToggler tagName={tagName} />
              {isLoading && <Loading />}
              {error && <Error />}
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
            <div className="col-md-3">{<PopularTags />}</div>
          </div>
        </div>
      </div>
    </>
  );
};
