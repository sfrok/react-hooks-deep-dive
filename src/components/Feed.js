// Core
import React from "react";
import { Link } from "react-router-dom";

// Tools
import { book } from "../pages/book";

// Components
import { Tags } from "./Tags";
import { AddToFavorite } from "./AddToFavorite";

export const Feed = ({ articles }) => {
  return (
    <>
      {articles.map((article, index) => (
        <div className="article-preview" key={index}>
          <div className="article-meta">
            <Link to={`${book.profile}${article.author.username}`}>
              <img src={article.author.image} alt="" />
            </Link>
            <div className="info">
              <Link
                to={`${book.profile}${article.author.username}`}
                className="author"
              >
                {article.author.username}
              </Link>
              <span className="date">{article.createdAt}</span>
            </div>
            <div className="pull-xs-right">
              <AddToFavorite
                isFavorited={article.favorited}
                favoritesCount={article.favoritesCount}
                articleSlug={article.slug}
              />
            </div>
          </div>
          <Link to={`${book.articles}${article.slug}`} className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
            <Tags tagList={article.tagList} />
          </Link>
        </div>
      ))}
    </>
  );
};
