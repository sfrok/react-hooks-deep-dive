// Core
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Components
import { GlobalFeed } from "./GlobalFeed";
import { Article } from "./Article";
import { Authentication } from "./Authentication";
import { TagFeed } from "./TagFeed";
import { UserFeed } from "./UserFeed";
import { CreateArticle } from "./CreateArticle";
import { EditArticle } from "./EditArticle";
import { Settings } from "./Settings";

// Tools
import { book } from "./book";

export const Routes = () => {
  return (
    <Switch>
      <Route path={book.main} exact component={GlobalFeed} />
      <Route path={book.feed} component={UserFeed} />
      <Route path={`${book.tags}:slug`} component={TagFeed} />
      <Route path={book.login} component={Authentication} />
      <Route path={book.register} component={Authentication} />
      <Route path={book.settings} component={Settings} />
      <Route path={`${book.articles}new`} component={CreateArticle} />
      <Route path={`${book.articles}:slug`} exact component={Article} />
      <Route path={`${book.articles}:slug/edit`} component={EditArticle} />
      <Redirect to={book.main} />
    </Switch>
  );
};
