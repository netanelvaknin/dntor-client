import { Grid, Typography } from "@material-ui/core";
import { TextField } from "../../../ui/index";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";

export const BusinessProfile = () => {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        <Typography variant="h1" style={{ marginTop: "4rem" }}>
          נעים להכיר
        </Typography>
      </Grid>

      <Grid
        container
        direction="column"
        alignItems="center"
        style={{ marginTop: "2rem" }}
      >
        <Grid item>
          <TextField value="" label="שם העסק" onChange={() => {}} />
        </Grid>

        <Grid item>
          <TextField value="" label="טלפון העסק" onChange={() => {}} />
        </Grid>

        <Grid item>
          <TextField value="" label="מייל" type="email" onChange={() => {}} />
        </Grid>

        <Grid item>
          <TextField value="" label="כתובת" onChange={() => {}} />
        </Grid>
      </Grid>

      <Grid container justify="center" style={{ marginTop: "5rem" }}>
        <Grid item>
          <ContinueButtonStyle>המשך</ContinueButtonStyle>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BusinessProfile;
