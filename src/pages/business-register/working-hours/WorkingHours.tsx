import { useState, useContext } from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import { TimePicker } from "../../../ui/index";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";
import {
  RightGrid,
  LeftGrid,
  WorkingHourCard,
  ToText,
  AddButton,
  HoursSetupHeading,
  MobileAddButton,
  DayCheckbox,
} from "./WorkingHoursStyle";
import { useSmallScreen } from "../../../hooks/index";
import TrashIcon from "../../../assets/icons/trash_icon.svg";
import { useForm } from "react-hook-form";
import { CurrentStep } from "../BusinessRegister";
import rootContext from "../../../context/root/rootContext";
import moment from "moment";
// import { Alert } from "@material-ui/lab";

interface WorkingHoursProps extends CurrentStep {
  showMobileView?: boolean;
  setShowMobileView?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkingHours = ({
  setShowMobileView,
  showMobileView,
}: WorkingHoursProps) => {
  const rootState = useContext(rootContext);
  const { register, errors, watch, handleSubmit } = useForm();
  const startWorking = watch("start_working");
  const endWorking = watch("end_working");
  const startBreak = watch("start_break");
  const endBreak = watch("end_break");

  const [checkedDay, setCheckedDay] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });

  const [disabledDays, setDisabledDays] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });
  const [workingHours, setWorkingHours] = useState<any>([]);

  const isSmallScreen = useSmallScreen();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedDay({ ...checkedDay, [event.target.name]: event.target.checked });
  };

  const handleAddWorkingHours = () => {
    const hebrewDays = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

    const translatedDays = Object.entries(checkedDay).map(
      ([key, value], index) => {
        if (value && value !== undefined) {
          return hebrewDays[index];
        } else {
          return null;
        }
      }
    );

    const uniqueDays = translatedDays.filter((day: any) => {
      const workingHoursCopy = JSON.stringify(workingHours);
      if (!workingHoursCopy.includes(day)) {
        return day;
      } else {
        return null;
      }
    });

    const workStartTime = moment(startWorking, "HH:mm:ss");
    const workEndTime = moment(endWorking, "HH:mm:ss");

    var difWork = moment.duration(workEndTime.diff(workStartTime));
    // @ts-ignore
    const isWorkMoreThanTwentyMin = difWork._milliseconds >= 1200000;

    if (!isWorkMoreThanTwentyMin) {
      rootState?.setError("אתה עובד פחות מ-20 דק' ביום ? אתה בטוח?");
    } else {
      rootState?.setError("");
    }

    if (uniqueDays.length > 0 && isWorkMoreThanTwentyMin) {
      const checkedDays = { ...checkedDay };
      setDisabledDays(checkedDays);

      // Set new working days & working times & breaks times
      setWorkingHours([
        ...workingHours,
        {
          days: uniqueDays,
          workingHours: {
            from: startWorking,
            to: endWorking,
          },
          breakHours: {
            from: startBreak,
            to: endBreak,
          },
        },
      ]);

      if (isSmallScreen) {
        setShowMobileView && setShowMobileView(true);
      }
    }
  };

  const removeWorkingHours = (index: number) => {
    const translatedDays = {
      sunday: "א",
      monday: "ב",
      tuesday: "ג",
      wednesday: "ד",
      thursday: "ה",
      friday: "ו",
      saturday: "ש",
    };

    const daysBeforeRemove = workingHours[index].days;
    const newDays = {};

    Object.entries(translatedDays).forEach(([key, value], index) => {
      if (daysBeforeRemove.includes(value)) {
        Object.assign(newDays, { [key]: false });
      }
    });

    setCheckedDay({
      ...checkedDay,
      ...newDays,
    });

    setDisabledDays({
      ...disabledDays,
      ...newDays,
    });

    const workingHoursCopy = [...workingHours];
    workingHoursCopy.splice(index, 1);
    setWorkingHours(workingHoursCopy);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="row">
        <Grid md={12} justify="center" alignItems="center" container item>
          <HoursSetupHeading variant="h1" style={{ textAlign: "center" }}>
            הגדרת שעות
          </HoursSetupHeading>
        </Grid>

        {!showMobileView && (
          <RightGrid
            md={6}
            sm={6}
            container
            item
            direction="column"
            justify="center"
            alignItems="center"
            $workingHoursLength={workingHours.length}
            style={{ margin: "0 auto" }}
          >
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              direction="column"
              style={{ marginBottom: "3rem" }}
            >
              <Grid item>נא לסמן את הימים בהם העסק עובד</Grid>
              <Grid item style={{ maxWidth: "28rem" }}>
                <DayCheckbox
                  value={checkedDay.sunday}
                  label="א"
                  labelPlacement="top"
                  name="sunday"
                  disabled={disabledDays.sunday}
                  onChange={handleChange}
                />
                <DayCheckbox
                  value={checkedDay.monday}
                  label="ב"
                  labelPlacement="top"
                  name="monday"
                  register={register}
                  disabled={disabledDays.monday}
                  onChange={handleChange}
                />
                <DayCheckbox
                  value={checkedDay.tuesday}
                  label="ג"
                  labelPlacement="top"
                  name="tuesday"
                  register={register}
                  disabled={disabledDays.tuesday}
                  onChange={handleChange}
                />
                <DayCheckbox
                  value={checkedDay.wednesday}
                  label="ד"
                  labelPlacement="top"
                  name="wednesday"
                  register={register}
                  disabled={disabledDays.wednesday}
                  onChange={handleChange}
                />
                <DayCheckbox
                  value={checkedDay.thursday}
                  label="ה"
                  labelPlacement="top"
                  name="thursday"
                  register={register}
                  disabled={disabledDays.thursday}
                  onChange={handleChange}
                />
                <DayCheckbox
                  value={checkedDay.friday}
                  label="ו"
                  labelPlacement="top"
                  name="friday"
                  register={register}
                  disabled={disabledDays.friday}
                  onChange={handleChange}
                />
                <DayCheckbox
                  value={checkedDay.saturday}
                  label="ש"
                  labelPlacement="top"
                  name="saturday"
                  register={register}
                  disabled={disabledDays.saturday}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Grid item container justify="center">
              <Grid item>
                <Typography variant="h2" style={{ marginBottom: "2rem" }}>
                  שעות עבודה
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              container
              alignItems="center"
              justify="center"
              style={{ marginBottom: "2rem" }}
            >
              <Grid
                item
                container={isSmallScreen ? false : true}
                justify="center"
                alignItems="center"
                md={5}
              >
                <TimePicker
                  register={register}
                  name="start_working"
                  error={!!rootState?.error || errors.start_working}
                  helperText={rootState?.error && "משך עבודה לא תקין"}
                />
              </Grid>

              <Grid
                item
                container={isSmallScreen ? false : true}
                justify="center"
                alignItems="center"
                md={2}
              >
                <ToText>עד</ToText>
              </Grid>

              <Grid
                item
                container={isSmallScreen ? false : true}
                justify="center"
                alignItems="center"
                md={5}
              >
                <TimePicker
                  register={register}
                  name="end_working"
                  error={!!rootState?.error || errors.end_working}
                  helperText={rootState?.error && "משך עבודה לא תקין"}
                />
              </Grid>
            </Grid>

            <Grid item container justify="center">
              <Grid item>
                <Typography variant="h2" style={{ marginBottom: "2rem" }}>
                  זמן הפסקה
                </Typography>
              </Grid>
            </Grid>

            <Grid item container alignItems="center" justify="center">
              <Grid
                item
                container={isSmallScreen ? false : true}
                justify="center"
                alignItems="center"
                md={5}
              >
                <TimePicker register={register} name="start_break" />
              </Grid>

              <Grid
                item
                container={isSmallScreen ? false : true}
                justify="center"
                alignItems="center"
                md={2}
              >
                <ToText>עד</ToText>
              </Grid>

              <Grid
                item
                container={isSmallScreen ? false : true}
                justify="center"
                alignItems="center"
                md={5}
              >
                <TimePicker register={register} name="end_break" />
              </Grid>
            </Grid>

            {workingHours.length > 0 && !isSmallScreen && (
              <Grid
                container
                justify="center"
                item
                xs={12}
                md={12}
                style={{ marginTop: "3rem" }}
              >
                <AddButton variant="text">הוספת שעות פעילות נוספות</AddButton>
              </Grid>
            )}
          </RightGrid>
        )}

        {/* DESKTOP VIEW OF SELECTED HOURS */}
        {!isSmallScreen && workingHours.length > 0 && (
          <LeftGrid
            md={6}
            sm={6}
            container
            item
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <div
              style={{
                maxHeight: "30rem",
                overflow: "auto",
                padding: ".5rem .5rem .5rem 2rem",
              }}
            >
              {workingHours.map((workingHour: any, index: any) => {
                return (
                  <Grid container alignItems="center" key={index}>
                    <WorkingHourCard>
                      <div>
                        {workingHour.days.map((day: any, dayIndex: number) => {
                          if (day) {
                            return <span key={dayIndex}>{day + " "}</span>;
                          }

                          return null;
                        })}
                      </div>
                      <div>
                        {workingHour.workingHours.from}
                        <strong style={{ margin: "0 1rem" }}>עד</strong>
                        {workingHour.workingHours.to}
                      </div>
                      <div>
                        {workingHour.breakHours.from}
                        <strong style={{ margin: "0 1rem" }}>עד</strong>
                        {workingHour.breakHours.to}
                      </div>
                    </WorkingHourCard>
                    <IconButton onClick={() => removeWorkingHours(index)}>
                      <img src={TrashIcon} alt="מחיקה" />
                    </IconButton>
                  </Grid>
                );
              })}
            </div>
          </LeftGrid>
        )}

        {/* MOBILE VIEW OF SELECTED HOURS */}
        {isSmallScreen && showMobileView && (
          <Grid container>
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              style={{ padding: "1rem 3rem 3rem" }}
            >
              <MobileAddButton
                variant="contained"
                onClick={() => setShowMobileView && setShowMobileView(false)}
              >
                הוספת שעת פעילות
              </MobileAddButton>
            </Grid>

            <LeftGrid
              md={6}
              container
              item
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                maxHeight: "30rem",
                overflowY: "auto",
                width: "95%",
                padding: "1rem 0",
              }}
            >
              {workingHours.map((workingHour: any, index: any) => {
                return (
                  <Grid
                    container
                    alignItems="center"
                    key={index}
                    style={{ maxWidth: "32rem" }}
                  >
                    <WorkingHourCard>
                      <div>
                        {workingHour.days.map((day: any, dayIndex: number) => {
                          if (day) {
                            return <span key={dayIndex}>{day + " "}</span>;
                          }

                          return null;
                        })}
                      </div>
                      <div>
                        {workingHour.workingHours.from}
                        <strong style={{ margin: "0 1rem" }}>עד</strong>
                        {workingHour.workingHours.to}
                      </div>
                      <div>
                        {workingHour.breakHours.from}
                        <strong style={{ margin: "0 1rem" }}>עד</strong>
                        {workingHour.breakHours.to}
                      </div>
                    </WorkingHourCard>
                    <IconButton
                      onClick={() => removeWorkingHours(index)}
                      style={{ marginRight: "1.5rem" }}
                    >
                      <img src={TrashIcon} alt="מחיקה" />
                    </IconButton>
                  </Grid>
                );
              })}
            </LeftGrid>

            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ margin: "3rem 0" }}
            >
              <ContinueButtonStyle>המשך</ContinueButtonStyle>
            </Grid>
          </Grid>
        )}

        {!showMobileView && (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ margin: "8rem 0 2rem" }}
          >
            <ContinueButtonStyle
              variant="contained"
              onClick={handleAddWorkingHours}
              disabled={false}
            >
              הוספה
            </ContinueButtonStyle>
          </Grid>
        )}

        {!showMobileView && (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ margin: "0rem 0 6rem" }}
          >
            <ContinueButtonStyle
              onClick={handleAddWorkingHours}
              disabled={workingHours.length === 0}
            >
              המשך לשלב הבא
            </ContinueButtonStyle>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default WorkingHours;
