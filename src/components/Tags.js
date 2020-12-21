// Core
import React from "react";

export const Tags = ({ tagList }) => {
  return (
    <ul className="tag-list">
      {tagList.map((tag) => (
        <li key={tag} className="tag-default tag-outline tag-pill">
          {tag}
        </li>
      ))}
    </ul>
  );
};
