import React, { lazy, useContext } from "react";

import { Switch, Route } from "react-router-dom";
import rootContext from "../context/root/rootContext";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { Navbar } from "../components/index";
import { useLocation } from "react-router-dom";

const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));

const App = () => {
  const rootState = useContext(rootContext);
  const pathname = useLocation().pathname;

  const appRoutes = [
    { path: "/login", component: <Login />, label: "" },
    { path: "/register", component: <Register />, label: "" },
  ];

  return (
    <BlockUi blocking={rootState && rootState.loading} keepInView>
      {appRoutes.map((route) => {
        if (route.path === pathname) {
          return <Navbar label={route.label} key={route.path} />;
        }
      })}

      <Switch>
        {appRoutes.map((route) => {
          return (
            <Route key={route.path} exact path={route.path}>
              {route.component}
            </Route>
          );
        })}
      </Switch>
    </BlockUi>
  );
};

export default App;
