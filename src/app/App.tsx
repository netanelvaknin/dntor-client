import React, { lazy, useContext, useState } from "react";

import { Switch, Route } from "react-router-dom";
import rootContext from "../context/root/rootContext";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";

const Login = lazy(() => import("../pages/login/Login"));

const App = () => {
  const rootState = useContext(rootContext);
  const appRoutes = [
    { path: "/login", component: <Login />, label: "login page" },
  ];

  return (
    <BlockUi blocking={rootState && rootState.loading} keepInView>
      <Switch>
        {appRoutes.map((route) => (
          <Route key={route.path} exact path={route.path}>
            {route.component}
          </Route>
        ))}
      </Switch>
    </BlockUi>
  );
};

export default App;
