import { useState } from "react";
import { Switch, Checkbox } from "../../../ui/index";
import { Grid } from "@material-ui/core";
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
        style={{ maxWidth: "28rem", margin: "0 auto" }}
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
            <Checkbox
              label="שעה לפני התור"
              name=""
              checked={true}
              onChange={() => {}}
            />

            <Checkbox
              label="יום לפני התור"
              name=""
              checked={true}
              onChange={() => {}}
            />

            <Checkbox
              label="יומיים לפני התור"
              name=""
              checked={true}
              onChange={() => {}}
            />
          </Grid>
        )}
      </Grid>

      <Grid
        container
        justify="center"
        style={{ position: "absolute", bottom: "3rem" }}
      >
        <ContinueButtonStyle>המשך</ContinueButtonStyle>
      </Grid>
    </>
  );
};

export default NotificationsManagment;
