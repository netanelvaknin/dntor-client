import React, { lazy, useContext } from "react";

import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "../framework/ProtectedRoute";
import rootContext from "../context/root/rootContext";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { Navbar } from "../ui/index";
import { Loader } from "../animations/index";

const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const BusinessRegister = lazy(() =>
  import("../pages/business-register/BusinessRegister")
);

const App = () => {
  const rootState = useContext(rootContext);

  const publicRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/register", component: <Register /> },
  ];

  const protectedRoutes = [
    { path: "/business-register", component: <BusinessRegister /> },
  ];

  return (
    <BlockUi loader={<Loader />} blocking={rootState?.loading} keepInView>
      <Navbar />

      <Switch>
        {publicRoutes.map((route) => {
          return (
            <Route key={route.path} exact path={route.path}>
              {route.component}
            </Route>
          );
        })}

        {protectedRoutes.map((route) => {
          return (
            <ProtectedRoute
              key={route.path}
              exact
              component={route.component}
              path={route.path}
            />
          );
        })}
      </Switch>
    </BlockUi>
  );
};

export default App;
