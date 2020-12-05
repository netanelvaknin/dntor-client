import {
  LoginPageStyle,
  LoginCard,
  RegisterForFreeButton,
  IAlreadyHaveAccountText,
  HorizontalLine,
  TextFieldStyle,
  ConnectButton,
} from "./LoginStyle";
import { Grid } from "@material-ui/core";
import { Checkbox, Button } from "../../ui/index";
import { Typography } from "@material-ui/core";
import { ReactComponent as EmailIcon } from "../../assets/icons/mail_icon.svg";
import { ReactComponent as PasswordIcon } from "../../assets/icons/password_icon.svg";

export const Login = () => {
  return (
    <LoginPageStyle>
      <LoginCard>
        <Grid container direction="column" alignItems="center">
          <Grid item md={12}>
            <RegisterForFreeButton>אני רוצה להירשם בחינם</RegisterForFreeButton>
          </Grid>

          <Grid item md={12} container alignItems="center" justify="center">
            <HorizontalLine />
            <IAlreadyHaveAccountText>יש לי כבר חשבון</IAlreadyHaveAccountText>
            <HorizontalLine />
          </Grid>

          <Grid item md={12}>
            <Typography variant="h2">כניסה לאיזור האישי</Typography>
          </Grid>

          <Grid item md={12}>
            <TextFieldStyle
              value=""
              placeholder="מייל"
              onChange={() => null}
              startAdornment={<EmailIcon />}
            />
          </Grid>

          <Grid item md={12}>
            <TextFieldStyle
              value=""
              placeholder="סיסמה"
              onChange={() => null}
              startAdornment={<PasswordIcon />}
            />
          </Grid>

          <Grid
            item
            md={12}
            container
            alignItems="center"
            justify="space-around"
            style={{ margin: "3rem 0", padding: "0 2rem" }}
          >
            <Grid item>
              <Checkbox
                name="remember_me"
                label="זכור אותי"
                checked={false}
                onChange={() => null}
              />
            </Grid>
            <Grid item>
              <Button variant="text">שכחתי סיסמה</Button>
            </Grid>
          </Grid>

          <Grid item>
            <ConnectButton>כניסה</ConnectButton>
          </Grid>
        </Grid>
      </LoginCard>
    </LoginPageStyle>
  );
};

export default Login;
