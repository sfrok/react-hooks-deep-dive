// Core
import React, { useEffect, useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";

// Hooks
import { useFetch } from "../../hooks";

// Components
import { Error, Loading, Tags } from "../../components";

// Tools
import { book } from "../book";

// Context
import { CurrentUserContext } from "../../context";

export const Article = ({ match }) => {
  const baseURl = `${book.articles}${match.params.slug}`;
  const [
    {
      response: fetchArticleResponse,
      error: fetchArticleError,
      isLoading: fetchArticleIsLoading,
    },
    fetchArticle,
  ] = useFetch(baseURl);
  const [
    { response: deletedArticleResponse },
    deletedArticleFetcher,
  ] = useFetch(baseURl);
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false);

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) return;
    return (
      fetchArticleResponse.article.author.username ===
      currentUserState.currentUser.username
    );
  };

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  useEffect(() => {
    if (!deletedArticleResponse) return;
    setIsSuccessfulDelete(true);
  }, [deletedArticleResponse]);

  if (fetchArticleIsLoading || !fetchArticleResponse) {
    return <Loading />;
  }

  if (fetchArticleError) {
    return <Error />;
  }

  const deleteArticle = () => {
    deletedArticleFetcher({
      method: "DELETE",
    });
  };

  if (isSuccessfulDelete) {
    return <Redirect to={book.main} />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{fetchArticleResponse.article.title}</h1>
          <div className="article-meta">
            <Link
              to={`${book.profile}${fetchArticleResponse.article.author.username}`}
            >
              <img src={fetchArticleResponse.article.author.image} alt="" />
            </Link>
            <div className="info">
              <Link
                to={`${book.profile}${fetchArticleResponse.article.author.username}`}
              >
                {fetchArticleResponse.article.author.username}
              </Link>
              <span className="date">
                {fetchArticleResponse.article.createdAt}
              </span>
            </div>
            {isAuthor() && (
              <>
                <Link
                  to={`${book.articles}${fetchArticleResponse.article.slug}/edit`}
                  className="btn btn-sm btn-outline-secondary"
                >
                  <i className="ion-edit">Edit Article</i>
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger btn-sm"
                  onClick={deleteArticle}
                >
                  <i className="ion-trash-a">Delete Article</i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            <div>
              <p>{fetchArticleResponse.article.body}</p>
            </div>
            <Tags tagList={fetchArticleResponse.article.tagList} />
          </div>
        </div>
      </div>
    </div>
  );
};
