import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./app/App";

import ContextContainer from "./context/ContextContainer";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
  jssPreset,
} from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles";
import theme from "./theme/index";
import { create } from "jss";
import rtl from "jss-rtl";

const AppContainer = (props: any) => {
  // Configure JSS
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  function RTL(props: any) {
    return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
  }

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Router>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <RTL>
                <ContextContainer>{props.children}</ContextContainer>
              </RTL>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </Router>
    </Suspense>
  );
};

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById("root")
);
