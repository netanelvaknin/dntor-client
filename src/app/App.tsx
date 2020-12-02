import React, { lazy, useContext } from "react";

import { Switch, Route } from "react-router-dom";
import rootContext from "../context/root/rootContext";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";

import { Button, Card } from "../ui";
// const Home = lazy(() => import("./pages/home/Home"));

const App = () => {
  const rootState = useContext(rootContext);

  const appRoutes = [{ path: "/", component: <div></div>, label: "דף הבית" }];

  return (
    <BlockUi blocking={rootState && rootState.loading} keepInView>
      <br />
      <br />
      <br />
      <br />
      <Card expandable cardTitle="כותרת לכרטיסיה">
        <Button variant="text" onClick={() => console.log("lol")}>
          נסיון
        </Button>
        <br />
        <br />
        <Button variant="outlined">נסיון</Button>
        <br />
        <br />
        <br />
        <br />
      </Card>
      <br />
      <br />
      <br />
      <Card>
        <Button variant="contained">נסיון</Button>
      </Card>

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
