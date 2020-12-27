// Core
import React, { useEffect } from "react";
import cn from "classnames";

// Hooks
import { useFetch } from "../hooks";

// Tools
import { book } from "../pages/book";

export const AddToFavorite = ({ isFavorited, favoritesCount, articleSlug }) => {
  const baseUrl = `${book.articles}${articleSlug}/favorite`;

  const [{ response, error, isLoading }, fetcher] = useFetch(baseUrl);

  const favoriteCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;
  const isFavoritedWithResponse = response
    ? response.article.favorited
    : isFavorited;

  const buttonClasses = cn({
    btn: true,
    "btn-sm": true,
    "btn-primary": isFavoritedWithResponse,
    "btn-outline-primary": !isFavoritedWithResponse,
  });

  const handleLike = (e) => {
    e.preventDefault();
    fetcher({
      method: isFavoritedWithResponse ? "DELETE" : "POST",
    });
  };

  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className="ion-heart"></i>
      <span>&nbsp; {favoriteCountWithResponse}</span>
    </button>
  );
};
