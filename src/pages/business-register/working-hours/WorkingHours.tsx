import { useState, useEffect } from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import { TimePicker, Checkbox } from "../../../ui/index";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";
import {
  RightGrid,
  LeftGrid,
  WorkingHourCard,
  ToText,
  AddButton,
  HoursSetupHeading,
  MobileAddButton,
} from "./WorkingHoursStyle";
import { useSmallScreen } from "../../../hooks/index";
import TrashIcon from "../../../assets/icons/trash_icon.svg";
import { useForm } from "react-hook-form";
import { CurrentStep } from "../BusinessRegister";

interface WorkingHoursProps extends CurrentStep {
  showMobileView?: boolean;
  setShowMobileView?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkingHours = ({
  setShowMobileView,
  showMobileView,
}: WorkingHoursProps) => {
  const { register, getValues, setValue, handleSubmit } = useForm();
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
  const initialTime = "00:00";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedDay({ ...checkedDay, [event.target.name]: event.target.checked });
  };

  const handleAddWorkingHours = () => {
    const hebrewDays = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

    const checkedDays = { ...checkedDay };
    setDisabledDays(checkedDays);

    const translatedDays = Object.entries(checkedDay).map(
      ([key, value], index) => {
        if (value && value !== undefined) {
          return hebrewDays[index];
        }
      }
    );

    const uniqueDays = translatedDays.filter((day: any) => {
      const workingHoursCopy = JSON.stringify(workingHours);
      if (!workingHoursCopy.includes(day)) {
        return day;
      }
    });

    if (uniqueDays.length > 0) {
      // Set new working days & working times & breaks times
      setWorkingHours([
        ...workingHours,
        {
          days: uniqueDays,
          workingHours: {
            from: getValues("start_working"),
            to: getValues("end_working"),
          },
          breakHours: {
            from: getValues("start_break"),
            to: getValues("end_break"),
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
              direction="column"
              style={{ marginBottom: "3rem" }}
            >
              <Grid item>נא לסמן את הימים בהם העסק עובד</Grid>
              <Grid item>
                <Checkbox
                  value={checkedDay.sunday}
                  label="א"
                  name="sunday"
                  disabled={disabledDays.sunday}
                  onChange={handleChange}
                />
                <Checkbox
                  value={checkedDay.monday}
                  label="ב"
                  name="monday"
                  register={register}
                  disabled={disabledDays.monday}
                  onChange={handleChange}
                />
                <Checkbox
                  value={checkedDay.tuesday}
                  label="ג"
                  name="tuesday"
                  register={register}
                  disabled={disabledDays.tuesday}
                  onChange={handleChange}
                />
                <Checkbox
                  value={checkedDay.wednesday}
                  label="ד"
                  name="wednesday"
                  register={register}
                  disabled={disabledDays.wednesday}
                  onChange={handleChange}
                />
                <Checkbox
                  value={checkedDay.thursday}
                  label="ה"
                  name="thursday"
                  register={register}
                  disabled={disabledDays.thursday}
                  onChange={handleChange}
                />
                <Checkbox
                  value={checkedDay.friday}
                  label="ו"
                  name="friday"
                  register={register}
                  disabled={disabledDays.friday}
                  onChange={handleChange}
                />
                <Checkbox
                  value={checkedDay.saturday}
                  label="ש"
                  name="saturday"
                  register={register}
                  disabled={disabledDays.saturday}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Grid
              item
              container
              justify={isSmallScreen ? "center" : "flex-start"}
            >
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
              justify={isSmallScreen ? "center" : "flex-start"}
              style={{ marginBottom: "2rem" }}
            >
              <Grid item md={5}>
                <TimePicker register={register} name="start_working" />
              </Grid>

              <Grid item md={2}>
                <ToText>עד</ToText>
              </Grid>

              <Grid item md={5}>
                <TimePicker register={register} name="end_working" />
              </Grid>
            </Grid>

            <Grid
              item
              container
              justify={isSmallScreen ? "center" : "flex-start"}
            >
              <Grid item>
                <Typography variant="h2" style={{ marginBottom: "2rem" }}>
                  זמן הפסקה
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              container
              alignItems="center"
              justify={isSmallScreen ? "center" : "flex-start"}
            >
              <Grid item md={5}>
                <TimePicker register={register} name="start_break" />
              </Grid>

              <Grid item md={2}>
                <ToText>עד</ToText>
              </Grid>

              <Grid item md={5}>
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

                          return;
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
                        {workingHour.days.map((day: any, index: number) => {
                          if (day.active) {
                            if (workingHour.days.length === index + 1) {
                              return `${day.day} `;
                            } else {
                              return `${day.day} ,`;
                            }
                          }

                          return undefined;
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
                    <IconButton style={{ marginRight: "1.5rem" }}>
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
            style={{ margin: "8rem 0 6rem" }}
          >
            <ContinueButtonStyle onClick={handleAddWorkingHours}>
              {workingHours.length > 0 ? "המשך לשלב הבא" : "הוספה"}
            </ContinueButtonStyle>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default WorkingHours;
