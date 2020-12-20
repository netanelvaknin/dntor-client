import { Grid, Typography } from "@material-ui/core";
import { TextField } from "../../../ui/index";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";
import { useForm } from "react-hook-form";

export const BusinessProfile = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <TextField
              label="שם העסק"
              name="business_name"
              register={register}
            />
          </Grid>

          <Grid item>
            <TextField
              label="טלפון העסק"
              name="business_phone"
              register={register}
            />
          </Grid>

          <Grid item>
            <TextField
              label="מייל"
              type="email"
              name="business_email"
              register={register}
            />
          </Grid>

          <Grid item>
            <TextField
              label="כתובת"
              name="business_address"
              register={register}
            />
          </Grid>
        </Grid>

        <Grid container justify="center" style={{ marginTop: "5rem" }}>
          <Grid item>
            <ContinueButtonStyle type="submit">המשך</ContinueButtonStyle>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default BusinessProfile;
