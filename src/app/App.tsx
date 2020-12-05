import React, { lazy, useContext, useState } from "react";

import { Switch, Route } from "react-router-dom";
import rootContext from "../context/root/rootContext";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";

// const Home = lazy(() => import("./pages/home/Home"));

import { DaysPicker, Checkbox } from "../ui";

const App = () => {
  const [checked, setChecked] = useState(false);
  const rootState = useContext(rootContext);
  const appRoutes = [{ path: "/", component: <div></div>, label: "דף הבית" }];

  return (
    <BlockUi blocking={rootState && rootState.loading} keepInView>
      <Checkbox
        name="Netanel"
        checked={checked}
        label="זכור אותי"
        onChange={(e) => {
          setChecked(e.target.checked);
          console.log(checked);
        }}
      />
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
