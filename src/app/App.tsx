import React, { lazy, useContext } from "react";

import { Switch, Route } from "react-router-dom";
import rootContext from "../context/root/rootContext";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { Navbar } from "../components/index";

const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const BusinessRegister = lazy(() =>
  import("../pages/business-register/BusinessRegister")
);

const App = () => {
  const rootState = useContext(rootContext);

  const appRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/register", component: <Register /> },
    { path: "/business-register", component: <BusinessRegister /> },
  ];

  return (
    <BlockUi blocking={rootState && rootState.loading} keepInView>
      <Navbar />

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
