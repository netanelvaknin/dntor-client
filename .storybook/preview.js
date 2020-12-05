import React from "react";

import { addDecorator } from "@storybook/react";
import "moment/locale/he";
moment.locale("he");
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import theme from "../src/theme";
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
  jssPreset,
} from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import { create } from "jss";
import rtl from "jss-rtl";

addDecorator((story) => {
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  function RTL(props) {
    return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
  }

  return (
    <MuiPickersUtilsProvider
      libInstance={moment}
      utils={MomentUtils}
      locale="he"
    >
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <RTL>{story()}</RTL>
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </MuiPickersUtilsProvider>
  );
});
