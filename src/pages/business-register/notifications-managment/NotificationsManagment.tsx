import { useState } from "react";
import { Switch, Checkbox } from "../../../ui/index";
import { Grid, Box } from "@material-ui/core";
import {
  NotificationsManagmentHeading,
  SwitchSpan,
  HorizontalSeprator,
} from "./NotificationsManagmentStyle";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";

export const NotificationsManagment = () => {
  const [usersNotifications, setUsersNotifications] = useState(false);

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ maxWidth: "28rem", margin: "0 auto 4rem" }}
      >
        <Grid container justify="center" alignItems="center">
          <NotificationsManagmentHeading variant="h1">
            ניהול התראות
          </NotificationsManagmentHeading>
        </Grid>

        <Grid item container justify="space-between" alignItems="center">
          <SwitchSpan>קבלת התראות ב-SMS</SwitchSpan>
          <Switch name="" checked={true} onChange={() => {}} />
        </Grid>
        <HorizontalSeprator />
        <Grid item container justify="space-between" alignItems="center">
          <SwitchSpan>קבלת התראות במייל</SwitchSpan>
          <Switch name="" checked={true} onChange={() => {}} />
        </Grid>
        <HorizontalSeprator />

        <Grid item container justify="space-between" alignItems="center">
          <SwitchSpan>תזכורת ללקוחות</SwitchSpan>
          <Switch
            name=""
            checked={usersNotifications}
            onChange={() => setUsersNotifications(!usersNotifications)}
          />
        </Grid>

        {usersNotifications && (
          <Grid item container justify="flex-start">
            <Box mt="0.5rem" mb="0.5rem">
              <Checkbox label="שעה לפני התור" name="" />
            </Box>

            <Box mb="0.5rem">
              <Checkbox label="יום לפני התור" name="" />
            </Box>
            <Checkbox label="יומיים לפני התור" name="" />
          </Grid>
        )}
      </Grid>

      <Grid container justify="center" style={{ marginBottom: "3rem" }}>
        <ContinueButtonStyle>המשך</ContinueButtonStyle>
      </Grid>
    </>
  );
};

export default NotificationsManagment;
