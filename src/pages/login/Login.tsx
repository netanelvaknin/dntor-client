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
import { useForm } from "react-hook-form";

export const Login = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <LoginPageStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                register={register}
                name="email"
                placeholder="מייל"
                startAdornment={<EmailIcon />}
              />
            </Grid>

            <Grid item md={12}>
              <TextFieldStyle
                register={register}
                name="password"
                type="password"
                placeholder="סיסמה"
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
                  register={register}
                />
              </Grid>
              <Grid item>
                <Button variant="text">שכחתי סיסמה</Button>
              </Grid>
            </GridStyle>

            <Grid item>
              <ConnectButton type="submit">כניסה</ConnectButton>
            </Grid>
          </Grid>
        </LoginCardStyle>
      </form>
    </LoginPageStyle>
  );
};

export default Login;
