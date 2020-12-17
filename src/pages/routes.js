// Core
import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import { GlobalFeed } from "./GlobalFeed";
import { Article } from "./Article";
import { Authentication } from "./Authentication";

// Tools
import { book } from "./book";

export const Routes = () => {
  return (
    <Switch>
      <Route path={book.main} exact component={GlobalFeed} />
      <Route path={book.login} component={Authentication} />
      <Route path={book.register} component={Authentication} />
      <Route path={`${book.articles}:slug`} component={Article} />
    </Switch>
  );
};
