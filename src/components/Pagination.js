// Core
import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

// Utils
import { range } from "../utils";

const PaginationItem = ({ page, currentPage, url }) => {
  const liClasses = cn({
    "page-item": true,
    active: currentPage === page,
  });

  return (
    <li className={liClasses}>
      <Link to={`${url}?page=${page}`} className="page-link">
        {page}
      </Link>
    </li>
  );
};

export const Pagination = ({ total, limit, url, currentPage }) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <PaginationItem
          page={page}
          currentPage={currentPage}
          url={url}
          key={page}
        />
      ))}
    </ul>
  );
};
