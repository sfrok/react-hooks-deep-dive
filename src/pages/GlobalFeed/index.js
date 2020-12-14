// Core
import React, { useEffect } from "react";

// Hooks
import { useFetch } from "../../hooks";

// Components
import { Feed } from "../../components/Feed";

export const GlobalFeed = () => {
  const baseURL = "/articles?limit=10&offset=0";
  const [{ response, isLoading, error }, fetcher] = useFetch(baseURL);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

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
              {!isLoading && response && <Feed articles={response.articles} />}
            </div>
            <div className="col-md-3">Popular tags</div>
          </div>
        </div>
      </div>
    </>
  );
};
