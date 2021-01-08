import { useContext, useEffect } from "react";
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
import { emailPattern } from "../../utils/patterns";
import useFetch from "use-http";
import rootContext from "../../context/root/rootContext";
import { Alert } from "@material-ui/lab";
import { useCookies } from "react-cookie";
import moment from "moment";

export const Login = () => {
  const history = useHistory();
  const rootState = useContext(rootContext);
  const [cookies, setCookie] = useCookies(["token"]);
  const { control, register, errors, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { post, response } = useFetch();

  useEffect(() => {
    if (cookies.token) {
      history.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (formData: any) => {
    const data = await post("/user/signin", {
      email: formData.email.trim(),
      password: formData.password.trim(),
    });

    if (response.ok) {
      const sevenDaysFromNow = moment().add(7, "d").format("YYYY-MM-DD");
      const dateToRemoveCookie = new Date().setTime(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      );

      setCookie("token", data.res, {
        path: "/",
        expires: new Date(dateToRemoveCookie),
      });
      setCookie("token-expired-date", sevenDaysFromNow, {
        expires: new Date(dateToRemoveCookie),
      });

      history.push("/business-register");
    } else {
      rootState?.setError("שם משתמש או סיסמה לא נכונים");
    }
  };

  return (
    <LoginPageStyle>
      <LoginCardStyle>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                control={control}
                name="email"
                placeholder="מייל"
                register={register}
                required
                pattern={emailPattern}
                error={!!errors.email || !!rootState?.error}
                helperText={errors.email && 'כתובת דוא"ל לא תקינה'}
                startAdornment={<EmailIcon />}
              />
            </Grid>

            <Grid item md={12}>
              <TextFieldStyle
                name="password"
                type="password"
                placeholder="סיסמה"
                register={register}
                required
                minLength={6}
                error={!!errors.password || !!rootState?.error}
                helperText={errors.password && "סיסמה לא תקינה"}
                startAdornment={<PasswordIcon />}
                control={control}
              />
            </Grid>

            <GridStyle
              item
              md={12}
              container
              alignItems="center"
              justify="space-around"
              style={{ margin: "3rem 0 2rem" }}
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

            <Grid item>
              <ConnectButton type="submit">כניסה</ConnectButton>
            </Grid>
          </Grid>
        </form>
      </LoginCardStyle>
    </LoginPageStyle>
  );
};

export default Login;
