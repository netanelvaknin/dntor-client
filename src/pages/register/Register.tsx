import {
  RegisterPageStyle,
  RegisterHeading,
  RegisterButton,
  RegisterFieldStyle,
} from "./RegisterStyle";
import { useForm } from "react-hook-form";
import { LoginCard as RegisterCard } from "../../components/index";
import { Grid } from "@material-ui/core";
import { emailPattern } from "../../utils/patterns";

export const Register = () => {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <RegisterPageStyle>
      <RegisterCard>
        <Grid container justify="center" alignItems="center">
          <RegisterHeading variant="h1">כבר מתחילים ...</RegisterHeading>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Grid container justify="center" alignItems="center">
            <RegisterFieldStyle
              name="full_name"
              label="שם מלא"
              register={register({
                required: true,
                minLength: 2,
              })}
              error={!!errors.full_name}
              helperText={errors.full_name && "שם לא תקין"}
            />
          </Grid>

          <Grid container justify="center" alignItems="center">
            <RegisterFieldStyle
              name="email"
              register={register({ required: true, pattern: emailPattern })}
              type="email"
              label="מייל"
              error={!!errors.email}
              helperText={errors.email && 'כתובת דוא"ל לא תקינה'}
            />
          </Grid>

          <Grid container justify="center" alignItems="center">
            <RegisterFieldStyle
              type="text"
              label="נייד"
              name="phone"
              register={register({ required: true })}
              error={!!errors.phone}
              helperText={errors.phone && "מספר טלפון נייד לא תקין"}
            />
          </Grid>

          <Grid container justify="center" alignItems="center">
            <RegisterFieldStyle
              name="password"
              register={register({ required: true, minLength: 6 })}
              error={!!errors.password}
              helperText={errors.password && "סיסמה לא תקינה"}
              type="password"
              label="סיסמה"
            />
          </Grid>

          <Grid container justify="center" alignItems="center">
            <RegisterFieldStyle
              name="password"
              register={register({ required: true, minLength: 6 })}
              error={!!errors.password}
              helperText={errors.password && "סיסמה לא תקינה"}
              type="password"
              label="אימות סיסמה"
            />
          </Grid>
          <Grid container justify="center" alignItems="center">
            <RegisterButton type="submit">הרשמה</RegisterButton>
          </Grid>
        </form>
      </RegisterCard>
    </RegisterPageStyle>
  );
};

export default Register;
