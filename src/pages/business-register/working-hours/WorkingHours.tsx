import { Grid, Typography } from "@material-ui/core";
import { DaysPicker } from "../../../ui/index";

export const WorkingHours = () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item style={{ marginTop: "4rem" }}>
        <Typography variant="h1">שעות פעילות</Typography>
      </Grid>

      <Grid item style={{ marginTop: "4rem" }}>
        <DaysPicker onChange={(days) => console.log(days)} />
      </Grid>
    </Grid>
  );
};

export default WorkingHours;
