// Core
import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import { GlobalFeed } from "./GlobalFeed";
import { Article } from "./Article";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={GlobalFeed} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  );
};
