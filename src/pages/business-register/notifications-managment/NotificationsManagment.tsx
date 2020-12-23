import { useState } from "react";
import { Switch, Checkbox } from "../../../ui/index";
import { Grid, Box } from "@material-ui/core";
import {
  NotificationsManagmentHeading,
  SwitchSpan,
  HorizontalSeprator,
} from "./NotificationsManagmentStyle";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";
import { useForm } from "react-hook-form";

export const NotificationsManagment = () => {
  const { register, watch, handleSubmit } = useForm();
  const customersNotifications = watch("customers_notifications");

  const [, setNotifications] = useState<any>();

  const onSubmit = (data: any) => {
    setNotifications(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <Switch name="sms_notifications" register={register} />
        </Grid>
        <HorizontalSeprator />
        <Grid item container justify="space-between" alignItems="center">
          <SwitchSpan>קבלת התראות במייל</SwitchSpan>
          <Switch name="email_notifications" register={register} />
        </Grid>
        <HorizontalSeprator />

        <Grid item container justify="space-between" alignItems="center">
          <SwitchSpan>תזכורת ללקוחות</SwitchSpan>
          <Switch register={register} name="customers_notifications" />
        </Grid>

        {customersNotifications && (
          <Grid item container justify="flex-start">
            <Box mt="0.5rem" mb="0.5rem">
              <Checkbox
                label="שעה לפני התור"
                name="hour_before"
                register={register}
              />
            </Box>

            <Box mb="0.5rem">
              <Checkbox
                label="יום לפני התור"
                name="day_before"
                register={register}
              />
            </Box>
            <Checkbox
              label="יומיים לפני התור"
              name="two_days_before"
              register={register}
            />
          </Grid>
        )}
      </Grid>

      <Grid container justify="center" style={{ marginBottom: "3rem" }}>
        <ContinueButtonStyle type="submit">המשך</ContinueButtonStyle>
      </Grid>
    </form>
  );
};

export default NotificationsManagment;
