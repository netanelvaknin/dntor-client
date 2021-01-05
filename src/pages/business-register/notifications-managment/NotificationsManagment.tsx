import { useContext, useEffect } from "react";
import { Switch, Checkbox } from "../../../ui/index";
import { Grid, Box } from "@material-ui/core";
import {
  NotificationsManagmentHeading,
  SwitchSpan,
  HorizontalSeprator,
} from "./NotificationsManagmentStyle";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";
import { useForm } from "react-hook-form";
import { CurrentStep } from "../BusinessRegister";
import rootContext from "../../../context/root/rootContext";
import useFetch from "use-http";
import { Alert } from "@material-ui/lab";

export const NotificationsManagment = ({ setCurrentStep }: CurrentStep) => {
  const { register, watch, handleSubmit } = useForm();
  const { post, response } = useFetch();
  const rootState = useContext(rootContext);

  const customersNotifications = watch("customerSmsRemainderActive");
  const hourBefore = watch("hourBefore");
  const dayBefore = watch("dayBefore");
  const twoDaysBefore = watch("twoDaysBefore");

  const onSubmit = async (data: any) => {
    const dataCopy = data;
    dataCopy.customerSmsRemainderTimes = {
      twoDaysBefore: !!dataCopy.twoDaysBefore,
      dayBefore: !!dataCopy.dayBefore,
      hourBefore: !!dataCopy.hourBefore,
    };

    delete dataCopy.twoDaysBefore;
    delete dataCopy.dayBefore;
    delete dataCopy.hourBefore;

    if (dataCopy.customerSmsRemainderActive) {
      if (!hourBefore && !dayBefore && !twoDaysBefore) {
        rootState?.setError("נא לבחור לפחות תזמון תזכורת אחד");
      } else {
        await post("/business/upsert", dataCopy);
      }
    } else {
      await post("/business/upsert", dataCopy);
    }

    if (response.ok) {
      console.log(dataCopy);
    }
  };

  useEffect(() => {
    if (hourBefore || twoDaysBefore || dayBefore) {
      rootState?.setError("");
    }
  }, [hourBefore, twoDaysBefore, dayBefore, rootState]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ maxWidth: "28rem", margin: "0 auto 2rem" }}
      >
        <Grid container justify="center" alignItems="center">
          <NotificationsManagmentHeading variant="h1">
            ניהול התראות
          </NotificationsManagmentHeading>
        </Grid>

        <Grid item container justify="space-between" alignItems="center">
          <SwitchSpan>קבלת התראות ב-SMS</SwitchSpan>
          <Switch name="smsNotificationsActive" register={register} />
        </Grid>
        <HorizontalSeprator />
        <Grid item container justify="space-between" alignItems="center">
          <SwitchSpan>קבלת התראות במייל</SwitchSpan>
          <Switch name="emailNotificationsActive" register={register} />
        </Grid>
        <HorizontalSeprator />

        <Grid item container justify="space-between" alignItems="center">
          <SwitchSpan>תזכורת ללקוחות</SwitchSpan>
          <Switch register={register} name="customerSmsRemainderActive" />
        </Grid>

        {customersNotifications && (
          <Grid item container justify="flex-start">
            <Box mt="0.5rem" mb="0.5rem">
              <Checkbox
                label="שעה לפני התור"
                name="hourBefore"
                register={register}
              />
            </Box>

            <Box mb="0.5rem">
              <Checkbox
                label="יום לפני התור"
                name="dayBefore"
                register={register}
              />
            </Box>
            <Checkbox
              label="יומיים לפני התור"
              name="twoDaysBefore"
              register={register}
            />
          </Grid>
        )}
      </Grid>

      <Grid container style={{ margin: "0rem 0 2rem" }}>
        <Grid item md={12} xs={12}>
          {rootState?.error && (
            <Alert
              style={{ maxWidth: "28rem", margin: "0 auto" }}
              severity="error"
            >
              {rootState?.error}
            </Alert>
          )}
        </Grid>
      </Grid>

      <Grid container justify="center" style={{ paddingBottom: "5rem" }}>
        <ContinueButtonStyle type="submit" disabled={!!rootState?.error}>
          סיימתי, בואו נתחיל !
        </ContinueButtonStyle>
      </Grid>
    </form>
  );
};

export default NotificationsManagment;
