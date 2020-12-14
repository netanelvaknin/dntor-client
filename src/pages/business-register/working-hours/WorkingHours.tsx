import { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { DaysPicker, Button, Card } from "../../../ui/index";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";
import {
  TimePicker,
  RightGrid,
  LeftGrid,
  WorkingHourCard,
} from "./WorkingHoursStyle";
import { useSmallScreen } from "../../../hooks/index";

type IWorkingHours = Array<{
  days: string[];
  workingHours: { from: string; to: string };
  breakHours: { from: string; to: string };
}>;

export const WorkingHours = () => {
  const [time, setTime] = useState("");
  const [showMobileView, setShowMobileView] = useState(false);
  const [workingHours, setWorkingHours] = useState<any>([
    {
      days: ["א", "ה", "ו"],
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
      <Grid
        md={12}
        justify="center"
        alignItems="center"
        container
        item
        style={{ margin: "4rem 0" }}
      >
        <Typography variant="h1" style={{ textAlign: "center" }}>
          שעות פעילות
        </Typography>
      </Grid>

      {!showMobileView && (
        <RightGrid
          md={6}
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

          <Grid item container>
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
            justify="flex-start"
            spacing={6}
            style={{ marginBottom: "2rem" }}
          >
            <Grid item md={5}>
              <TimePicker
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Grid>

            <Grid item md={2}>
              <span>עד</span>
            </Grid>

            <Grid item md={5}>
              <TimePicker type="time" value="" onChange={() => {}} />
            </Grid>
          </Grid>

          <Grid item container>
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
            justify="flex-start"
            spacing={6}
          >
            <Grid item md={5}>
              <TimePicker type="time" value="" onChange={() => {}} />
            </Grid>

            <Grid item md={2}>
              <span>עד</span>
            </Grid>

            <Grid item md={5}>
              <TimePicker type="time" value="" onChange={() => {}} />
            </Grid>
          </Grid>

          {workingHours.length > 0 && !isSmallScreen && (
            <Grid item style={{ marginTop: "5rem" }}>
              <Button variant="text">הוספה</Button>
            </Grid>
          )}
        </RightGrid>
      )}

      {/* DESKTOP VIEW OF SELECTED HOURS */}
      {!isSmallScreen && workingHours.length > 0 && (
        <LeftGrid
          md={6}
          container
          item
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          {workingHours.map((workingHour: any, index: any) => {
            return (
              <WorkingHourCard key={index}>
                {workingHour.workingHours.from}
                {workingHour.workingHours.to}
                {workingHour.breakHours.from}
                {workingHour.breakHours.to}
              </WorkingHourCard>
            );
          })}
        </LeftGrid>
      )}

      {/* MOBILE VIEW OF SELECTED HOURS */}
      {isSmallScreen && showMobileView && (
        <>
          <Grid item>
            <div onClick={() => setShowMobileView(false)}>Plus</div>
          </Grid>
          <LeftGrid
            md={6}
            container
            item
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            {workingHours.map((workingHour: any, index: any) => {
              return (
                <WorkingHourCard key={index}>
                  {workingHour.workingHours.from}
                  {workingHour.workingHours.to}
                  {workingHour.breakHours.from}
                  {workingHour.breakHours.to}
                </WorkingHourCard>
              );
            })}
          </LeftGrid>

          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ marginBottom: "3rem" }}
          >
            <ContinueButtonStyle>המשך</ContinueButtonStyle>
          </Grid>
        </>
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
