import { useState } from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import { DaysPicker, TimePicker } from "../../../ui/index";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";
import {
  RightGrid,
  LeftGrid,
  WorkingHourCard,
  ToText,
  AddButton,
  HoursSetupHeading,
} from "./WorkingHoursStyle";
import { useSmallScreen } from "../../../hooks/index";
import TrashIcon from "../../../assets/icons/trash_icon.svg";
import PlusIcon from "../../../assets/icons/plus_icon.svg";

// type IWorkingHours = Array<{
//   days: string[];
//   workingHours: { from: string; to: string };
//   breakHours: { from: string; to: string };
// }>;

export const WorkingHours = () => {
  const [time, setTime] = useState<any>(new Date());
  const [showMobileView, setShowMobileView] = useState(false);
  const [workingHours] = useState<any>([
    {
      days: ["א", "ב", "ג"],
      workingHours: { from: "08:00", to: "18:00" },
      breakHours: { from: "12:00", to: "13:00" },
    },
    {
      days: ["א", "ב", "ג"],
      workingHours: { from: "08:00", to: "18:00" },
      breakHours: { from: "12:00", to: "13:00" },
    },
    {
      days: ["א", "ב", "ג"],
      workingHours: { from: "08:00", to: "18:00" },
      breakHours: { from: "12:00", to: "13:00" },
    },
  ]);

  const isSmallScreen = useSmallScreen();

  const handleAddWorkingHours = () => {
    if (isSmallScreen) {
      setShowMobileView(true);
    } else {
      // todo - continue to next step
    }
  };

  return (
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
          <Grid item style={{ marginBottom: "3rem" }}>
            <DaysPicker onChange={(days) => console.log(days)} />
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
              <TimePicker value={time} onChange={setTime} />
            </Grid>

            <Grid item md={2}>
              <ToText>עד</ToText>
            </Grid>

            <Grid item md={5}>
              <TimePicker value={time} onChange={setTime} />
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
              <TimePicker value={time} onChange={setTime} />
            </Grid>

            <Grid item md={2}>
              <ToText>עד</ToText>
            </Grid>

            <Grid item md={5}>
              <TimePicker value={time} onChange={setTime} />
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
              <AddButton variant="text">הוספה</AddButton>
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
                      {workingHour.days.map((day: string, i: number) =>
                        workingHours.length !== i + 1 ? day + ", " : day
                      )}
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
                  <IconButton>
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
          <Grid item container justify="flex-end" style={{ padding: "0 1rem" }}>
            <IconButton onClick={() => setShowMobileView(false)}>
              <img src={PlusIcon} alt="הוספה" />
            </IconButton>
          </Grid>

          <LeftGrid
            md={6}
            container
            item
            direction="row"
            justify="center"
            alignItems="center"
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
                      {workingHour.days.map((day: string, i: number) =>
                        workingHours.length !== i + 1 ? day + ", " : day
                      )}
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
                  <IconButton>
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
          style={{ margin: "4rem 0" }}
        >
          <ContinueButtonStyle onClick={handleAddWorkingHours}>
            {isSmallScreen ? "אישור" : "המשך"}
          </ContinueButtonStyle>
        </Grid>
      )}
    </Grid>
  );
};

export default WorkingHours;
