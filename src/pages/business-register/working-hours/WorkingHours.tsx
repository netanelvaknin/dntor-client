import { useState, useContext, useEffect } from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import { TimePicker } from "../../../ui/index";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";
import {
  RightGrid,
  LeftGrid,
  WorkingHourCard,
  ToText,
  HoursSetupHeading,
  MobileAddButton,
  DayCheckbox,
  BreakButton,
} from "./WorkingHoursStyle";
import { useSmallScreen } from "../../../hooks/index";
import TrashIcon from "../../../assets/icons/trash_icon.svg";
import { useForm } from "react-hook-form";
import { CurrentStep } from "../BusinessRegister";
import rootContext from "../../../context/root/rootContext";
import moment from "moment";
import { Delete } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

interface WorkingHoursProps extends CurrentStep {
  showMobileView?: boolean;
  setShowMobileView?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkingHours = ({
  setShowMobileView,
  showMobileView,
}: WorkingHoursProps) => {
  const rootState = useContext(rootContext);
  const { register, errors, reset, getValues, watch, handleSubmit } = useForm();
  const startWorking = watch("start_working", "08:00");
  const endWorking = watch("end_working", "18:00");

  const [canAdd, setCanAdd] = useState(false);
  const [error, setError] = useState("");
  const [breaks, setBreaks] = useState<any>([]);
  const [allDaysChecked, setAllDaysChecked] = useState(false);
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
        !allDaysChecked && setAllDaysChecked(false);
        return day;
      } else {
        return null;
      }
    });

    const workStartTime = moment(startWorking, "hh:mm");
    const workEndTime = moment(endWorking, "hh:mm");
    const startIsBeforeEnd = workStartTime.isBefore(workEndTime);

    if (!startIsBeforeEnd) {
      rootState?.setError("זמן התחלה גדול מזמן סיום");
    }

    const breaks = [];
    let breaksError = false;
    const startBreakOne = getValues("start_break_0");
    const endBreakOne = getValues("end_break_0");
    const startBreakTwo = getValues("start_break_1");
    const endBreakTwo = getValues("end_break_1");
    const startBreakThree = getValues("start_break_2");
    const endBreakThree = getValues("end_break_2");

    const startBreakOneTime = moment(startBreakOne, "hh:mm");
    const endBreakOneTime = moment(endBreakOne, "hh:mm");
    const startBreakTwoTime = moment(startBreakTwo, "hh:mm");
    const endBreakTwoTime = moment(endBreakTwo, "hh:mm");
    const startBreakThreeTime = moment(startBreakThree, "hh:mm");
    const endBreakThreeTime = moment(endBreakThree, "hh:mm");

    const isStartBreakOneValid =
      startBreakOneTime.isBetween(workStartTime, workEndTime) &&
      startBreakOneTime.isAfter(workStartTime) &&
      startBreakOneTime.isBefore(endBreakOneTime);
    const isEndBreakOneValid =
      endBreakOneTime.isBetween(workStartTime, workEndTime) &&
      endBreakOneTime.isBefore(workEndTime) &&
      endBreakOneTime.isBefore(startBreakOneTime);

    const isStartBreakTwoValid =
      startBreakTwoTime.isBetween(workStartTime, workEndTime) &&
      startBreakTwoTime.isAfter(workStartTime) &&
      startBreakTwoTime.isBefore(endBreakTwoTime);
    const isEndBreakTwoValid =
      endBreakTwoTime.isBetween(workStartTime, workEndTime) &&
      endBreakTwoTime.isBefore(workEndTime) &&
      endBreakTwoTime.isBefore(startBreakTwoTime);

    const isStartBreakThreeValid =
      startBreakThreeTime.isBetween(workStartTime, workEndTime) &&
      startBreakThreeTime.isAfter(workStartTime) &&
      startBreakThreeTime.isBefore(endBreakThreeTime);
    const isEndBreakThreeValid =
      endBreakThreeTime.isBetween(workStartTime, workEndTime) &&
      endBreakThreeTime.isBefore(workEndTime) &&
      endBreakThreeTime.isBefore(startBreakThreeTime);

    if (startBreakOne && endBreakOne) {
      breaks.push({
        from: startBreakOne,
        to: endBreakOne,
      });
    }

    if (startBreakTwo && endBreakTwo) {
      breaks.push({
        from: startBreakTwo,
        to: endBreakTwo,
      });
    }

    if (startBreakThree && endBreakThree) {
      breaks.push({
        from: startBreakThree,
        to: endBreakThree,
      });
    }

    if (
      startBreakOne &&
      endBreakOne &&
      !isStartBreakOneValid &&
      !isEndBreakOneValid
    ) {
      breaksError = true;
    }

    if (
      startBreakTwo &&
      endBreakTwo &&
      !isStartBreakTwoValid &&
      !isEndBreakTwoValid
    ) {
      breaksError = true;
    }

    if (
      startBreakThree &&
      endBreakThree &&
      !isStartBreakThreeValid &&
      !isEndBreakThreeValid
    ) {
      breaksError = true;
    }

    if (uniqueDays.length > 0 && startIsBeforeEnd) {
      if (!breaksError) {
        breaksError = false;
        setError("");
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
            breaks,
          },
        ]);

        if (isSmallScreen) {
          setShowMobileView && setShowMobileView(true);
        }

        reset({ start_working: "08:00", end_working: "18:00" });
        setBreaks([]);
      } else if (breaksError) {
        setError(
          "נא לבדוק ששעות ההפסקה שהוגדרו הגיוניות ובין שעות העבודה של העסק"
        );
      }
    } else {
      setError(
        "נא לבדוק שנבחרו ימי עבודה ושזמני תחילת העבודה וסיום העבודה הם תקינים"
      );
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

  const removeBreak = (index: number) => {
    const breaksCopy = [...breaks];
    breaksCopy.splice(index, 1);
    setBreaks(breaksCopy);
  };

  const Break = ({ index }: { index: number }) => {
    return (
      <>
        <Grid
          item
          container={isSmallScreen ? false : true}
          justify="center"
          alignItems="center"
          md={5}
        >
          <TimePicker register={register} name={"start_break_" + index} />
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
          <TimePicker register={register} name={"end_break_" + index} />
        </Grid>
      </>
    );
  };

  useEffect(() => {
    const workingHoursCopy = JSON.stringify(workingHours);
    const days = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
    const allDaysAreChecked = days.every((day: any) => {
      return workingHoursCopy.includes(day);
    });

    setAllDaysChecked(allDaysAreChecked);
  }, [workingHours]);

  useEffect(() => {
    const atLeastOneChecked = Object.values(checkedDay).every((v) => !v);
    setCanAdd(atLeastOneChecked);
  }, [checkedDay]);

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
                  defaultValue={new Date().setHours(8, 0, 0, 0)}
                  register={register}
                  name="start_working"
                  error={errors.start_working}
                  helperText={errors.start_working && "משך עבודה לא תקין"}
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
                  defaultValue={new Date().setHours(18, 0, 0, 0)}
                  register={register}
                  name="end_working"
                  error={errors.end_working}
                  helperText={errors.end_working && "משך עבודה לא תקין"}
                />
              </Grid>
            </Grid>

            {breaks.map((Break: any, index: number) => {
              if (index < 3) {
                return (
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    style={{ marginBottom: "2rem" }}
                    key={index}
                  >
                    <Grid item container justify="center">
                      <Grid item>
                        <Typography variant="h2">
                          הפסקה מספר {index + 1}
                        </Typography>
                      </Grid>
                    </Grid>
                    {Break}
                    <BreakButton
                      variant="text"
                      onClick={() => removeBreak(index)}
                    >
                      <Grid container justify="center" alignItems="center">
                        <Delete style={{ marginLeft: "1rem" }} /> הסרת הפסקה
                        מספר {index + 1}
                      </Grid>
                    </BreakButton>
                  </Grid>
                );
              } else {
                return null;
              }
            })}

            {breaks.length < 3 && (
              <Grid container item md={12} justify="center" alignItems="center">
                <Grid item>
                  <BreakButton
                    variant="text"
                    onClick={() => {
                      setBreaks([...breaks, <Break index={breaks.length} />]);
                    }}
                  >
                    הוסף הפסקה {breaks.length >= 1 && "נוספת"}
                  </BreakButton>
                </Grid>
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
                      <div style={{ marginTop: "1rem" }}>
                        <strong>שעות עבודה:</strong> <br />
                        {workingHour.workingHours.from}
                        <strong style={{ margin: "0 1rem" }}>עד</strong>
                        {workingHour.workingHours.to}
                      </div>

                      <div style={{ marginTop: "1rem" }}>
                        {workingHour.breaks.map((b: any, index: number) => {
                          if (b.from === undefined && b.to === undefined) {
                            return null;
                          } else {
                            return (
                              <div key={index}>
                                <strong>זמני הפסקה {index + 1}:</strong> <br />
                                <div>
                                  {b.from}
                                  <strong style={{ margin: "0 1rem" }}>
                                    {" "}
                                    עד{" "}
                                  </strong>
                                  {b.to}
                                </div>
                              </div>
                            );
                          }
                        })}
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
                        <strong style={{ margin: "0 1rem" }}>עד</strong>
                        {/* {workingHour.breakHours.to} */}
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

        <Grid container style={{ margin: "2rem 0 0" }}>
          <Grid item md={12} xs={12}>
            {error && (
              <Alert
                style={{ maxWidth: "28rem", margin: "0 auto" }}
                severity="error"
              >
                {error}
              </Alert>
            )}
          </Grid>
        </Grid>

        {!showMobileView && (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ margin: "5rem 0 2rem" }}
          >
            <ContinueButtonStyle
              variant="contained"
              onClick={handleAddWorkingHours}
              disabled={allDaysChecked || canAdd || !!error}
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
              type="submit"
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
