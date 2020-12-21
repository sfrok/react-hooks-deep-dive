// Core
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Hooks
import { useFetch } from "../../hooks";

// Components
import { Error, Loading, Tags } from "../../components";

// Tools
import { book } from "../book";

export const Article = ({ match }) => {
  const baseURl = `${book.articles}${match.params.slug}`;
  const [{ response, error, isLoading }, fetcher] = useFetch(baseURl);

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
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{response.article.title}</h1>
          <div className="article-meta">
            <Link to={`${book.profile}${response.article.author.username}`}>
              <img src={response.article.author.image} alt="" />
            </Link>
            <div className="info">
              <Link to={`${book.profile}${response.article.author.username}`}>
                {response.article.author.username}
              </Link>
              <span className="date">{response.article.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            <div>
              <p>{response.article.body}</p>
            </div>
            <Tags tagList={response.article.tagList} />
          </div>
        </div>
      </div>
    </div>
  );
};
