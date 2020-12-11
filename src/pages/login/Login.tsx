import {
  LoginPageStyle,
  LoginCardStyle,
  RegisterForFreeButton,
  IAlreadyHaveAccountText,
  HorizontalLine,
  TextFieldStyle,
  ConnectButton,
  GridStyle,
} from "./LoginStyle";
import { Grid } from "@material-ui/core";
import { Checkbox, Button } from "../../ui/index";
import { Typography } from "@material-ui/core";
import { ReactComponent as EmailIcon } from "../../assets/icons/mail_icon.svg";
import { ReactComponent as PasswordIcon } from "../../assets/icons/password_icon.svg";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const history = useHistory();

  return (
    <LoginPageStyle>
      <LoginCardStyle>
        <Grid container direction="column" alignItems="center">
          <Grid item md={12}>
            <RegisterForFreeButton onClick={() => history.push("/register")}>
              אני רוצה להירשם בחינם
            </RegisterForFreeButton>
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

          <GridStyle
            item
            md={12}
            container
            alignItems="center"
            justify="space-around"
            style={{ margin: "3rem 0" }}
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
          </GridStyle>

          <Grid item>
            <ConnectButton>כניסה</ConnectButton>
          </Grid>
        </Grid>
      </LoginCardStyle>
    </LoginPageStyle>
  );
};

export default Login;
