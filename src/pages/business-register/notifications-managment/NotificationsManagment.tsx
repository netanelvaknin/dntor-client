import { useContext, useEffect, useState } from "react";
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
import { useHistory } from "react-router-dom";

interface NotificationsManagmentProps extends CurrentStep {}

export const NotificationsManagment = ({
  setCurrentStep,
}: NotificationsManagmentProps) => {
  const { register, watch, handleSubmit } = useForm();
  const [notificationTiming, setNotificationTiming] = useState({
    hourBefore: false,
    dayBefore: false,
    twoDaysBefore: false,
  });
  const [businessData, setBusinessData] = useState<any>();
  const [servicesData, setServicesData] = useState<any>();
  const [workTimesData, setWorkTimesData] = useState<any>();
  const [everyStepsAreAlreadyFilled, setEveryStepsAreAlreadyFilled] = useState(
    false
  );
  const { get, post, response } = useFetch();
  const rootState = useContext(rootContext);
  const history = useHistory();

  const customersNotifications = watch("customerSmsRemainderActive");

  async function getBusinessData() {
    const data = await get("/business");
    if (response.ok) setBusinessData(data);
  }

  async function getWorkTimesData() {
    const data = await get("business/businessWorkTimes");
    if (response.ok) setWorkTimesData(data);
  }

  async function getServicesData() {
    const data = await get("/business/services");
    if (response.ok) setServicesData(data);
  }

  const getAllData = () => {
    getBusinessData();
    getWorkTimesData();
    getServicesData();
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      businessData?.res?.name &&
      servicesData?.res[0]._id &&
      workTimesData?.res?.days?.length > 0
    ) {
      console.log("check");
      setEveryStepsAreAlreadyFilled(true);
    }
  }, [businessData, servicesData, workTimesData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationTiming({
      ...notificationTiming,
      [event.target.name]: event.target.checked,
    });
  };

  const onSubmit = async (data: any) => {
    const dataCopy = data;

    dataCopy.customerSmsRemainderTimes = {
      twoDaysBefore: notificationTiming.twoDaysBefore,
      dayBefore: notificationTiming.dayBefore,
      hourBefore: notificationTiming.hourBefore,
    };

    delete dataCopy.twoDaysBefore;
    delete dataCopy.dayBefore;
    delete dataCopy.hourBefore;

    if (dataCopy.customerSmsRemainderActive) {
      if (
        !notificationTiming.hourBefore &&
        !notificationTiming.dayBefore &&
        !notificationTiming.twoDaysBefore
      ) {
        rootState?.setError("נא לבחור לפחות תזמון תזכורת אחד");
      } else {
        await post("/business/upsert", dataCopy);
      }
    } else {
      await post("/business/upsert", dataCopy);
    }

    if (response.ok && everyStepsAreAlreadyFilled) {
      setCurrentStep(1);
      history.push("/admin-panel");
    } else {
      rootState?.setError("אירעה שגיאה. אנא נסה שנית מאוחר יותר");
    }
  };

  useEffect(() => {
    if (
      notificationTiming.hourBefore ||
      notificationTiming.twoDaysBefore ||
      notificationTiming.dayBefore
    ) {
      rootState?.setError("");
    }
  }, [
    notificationTiming.hourBefore,
    notificationTiming.twoDaysBefore,
    notificationTiming.dayBefore,
    rootState,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                value={notificationTiming.hourBefore}
                label="שעה לפני התור"
                name="hourBefore"
                onChange={handleChange}
              />
            </Box>

            <Box mb="0.5rem">
              <Checkbox
                value={notificationTiming.dayBefore}
                label="יום לפני התור"
                name="dayBefore"
                onChange={handleChange}
              />
            </Box>
            <Checkbox
              value={notificationTiming.twoDaysBefore}
              label="יומיים לפני התור"
              name="twoDaysBefore"
              onChange={handleChange}
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
          בואו נעבור ליומן !
        </ContinueButtonStyle>
      </Grid>
    </form>
  );
};

export default NotificationsManagment;
