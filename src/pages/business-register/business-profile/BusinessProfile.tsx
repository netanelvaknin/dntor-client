import { useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
import { TextField } from "../../../ui/index";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";
import { useForm } from "react-hook-form";
import { CurrentStep } from "../BusinessRegister";
import useFetch from "use-http";
import { emailPattern, phoneNumberPattern } from "../../../utils/patterns";
import rootContext from "../../../context/root/rootContext";
import { Alert } from "@material-ui/lab";

export const BusinessProfile = ({ setCurrentStep }: CurrentStep) => {
  const { register, errors, handleSubmit } = useForm();
  const { post, response } = useFetch();
  const rootState = useContext(rootContext);

  const onSubmit = async (formData: any) => {
    await post("/business/upsert", {
      email: formData.business_email.trim(),
      phone: formData.business_phone.trim(),
      name: formData.business_name.trim(),
      address: formData.business_address.trim(),
    });

    if (response.ok) {
      setCurrentStep(2);
    } else {
      rootState?.setError("אופס! משהו השתבש... שננסה שוב ?");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
              register={register({ required: true })}
              error={!!errors.business_name || !!rootState?.error}
              helperText={errors.business_name && "נא למלא שם עסק"}
            />
          </Grid>

          <Grid item>
            <TextField
              label="טלפון העסק"
              name="business_phone"
              register={register({
                required: true,
                pattern: phoneNumberPattern,
              })}
              error={!!errors.business_phone || !!rootState?.error}
              helperText={
                errors.business_phone && "נא למלא מספר טלפון תקין וללא סימנים"
              }
            />
          </Grid>

          <Grid item>
            <TextField
              label="מייל"
              type="email"
              name="business_email"
              register={register({
                pattern: emailPattern,
                required: true,
              })}
              error={!!errors.business_email || !!rootState?.error}
              helperText={errors.business_email && 'כתובת דוא"ל לא תקינה'}
            />
          </Grid>

          <Grid item>
            <TextField
              label="כתובת"
              name="business_address"
              register={register({ required: true })}
              error={!!errors.business_address || !!rootState?.error}
              helperText={errors.business_address && "נא למלא כתובת תקינה"}
            />
          </Grid>
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

        <Grid container justify="center" style={{ margin: "2rem 0" }}>
          <Grid item>
            <ContinueButtonStyle type="submit">המשך</ContinueButtonStyle>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default BusinessProfile;
