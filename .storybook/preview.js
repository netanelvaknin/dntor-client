import React from "react";

import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@material-ui/core/styles";
import "moment/locale/he";
moment.locale("he");
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import theme from "../src/theme";

addDecorator((story) => (
  <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="he">
    <ThemeProvider theme={theme}>{story()}</ThemeProvider>
  </MuiPickersUtilsProvider>
));
