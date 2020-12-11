import {
  RegisterPageStyle,
  RegisterHeading,
  RegisterButton,
  RegisterFieldStyle,
} from "./RegisterStyle";
import { LoginCard as RegisterCard } from "../../components/index";
import { Grid } from "@material-ui/core";

export const Register = () => {
  return (
    <RegisterPageStyle>
      <RegisterCard>
        <Grid container justify="center" alignItems="center">
          <RegisterHeading variant="h1">כבר מתחילים ...</RegisterHeading>
        </Grid>

        <Grid container justify="center" alignItems="center">
          <RegisterFieldStyle
            value=""
            type="text"
            label="שם מלא"
            onChange={() => {}}
          />
        </Grid>

        <Grid container justify="center" alignItems="center">
          <RegisterFieldStyle
            value=""
            type="email"
            label="מייל"
            onChange={() => {}}
          />
        </Grid>

        <Grid container justify="center" alignItems="center">
          <RegisterFieldStyle
            value=""
            type="text"
            label="נייד"
            onChange={() => {}}
          />
        </Grid>

        <Grid container justify="center" alignItems="center">
          <RegisterFieldStyle
            value=""
            type="password"
            label="סיסמה"
            onChange={() => {}}
          />
        </Grid>

        <Grid container justify="center" alignItems="center">
          <RegisterFieldStyle
            value=""
            type="password"
            label="אימות סיסמה"
            onChange={() => {}}
          />
        </Grid>

        <Grid container justify="center" alignItems="center">
          <RegisterButton>הרשמה</RegisterButton>
        </Grid>
      </RegisterCard>
    </RegisterPageStyle>
  );
};

export default Register;
