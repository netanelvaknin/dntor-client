import React, { Suspense } from "react";

import ContextContainer from "../context/ContextContainer";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
  jssPreset,
} from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles";
import theme from "../theme/index";
import { create } from "jss";
import rtl from "jss-rtl";
import "moment/locale/he";
import HttpProvider from "./HttpProvider";

moment.locale("he");

const AppContainer = (props: any) => {
  // Configure JSS
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  function RTL(props: any) {
    return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
  }

  return (
    <ContextContainer>
      <HttpProvider>
        <Suspense fallback={<div>Loading</div>}>
          <Router>
            <MuiPickersUtilsProvider
              libInstance={moment}
              utils={MomentUtils}
              locale="he"
            >
              <StylesProvider injectFirst>
                <MuiThemeProvider theme={theme}>
                  <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <RTL>{props.children}</RTL>
                  </ThemeProvider>
                </MuiThemeProvider>
              </StylesProvider>
            </MuiPickersUtilsProvider>
          </Router>
        </Suspense>
      </HttpProvider>
    </ContextContainer>
  );
};

export default AppContainer;
