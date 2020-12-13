import { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { DaysPicker } from "../../../ui/index";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";
import { TimePicker } from "./WorkingHoursStyle";

export const WorkingHours = () => {
  const [time, setTime] = useState("");

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ margin: "0 auto", maxWidth: "28rem" }}
    >
      <Grid item style={{ marginTop: "4rem" }}>
        <Typography variant="h1">שעות פעילות</Typography>
      </Grid>

      <Grid item style={{ margin: "4rem 0" }}>
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

      <Grid item container alignItems="center" justify="flex-start" spacing={6}>
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

      <Grid item style={{ marginTop: "5rem" }}>
        <ContinueButtonStyle>אישור</ContinueButtonStyle>
      </Grid>
    </Grid>
  );
};

export default WorkingHours;
