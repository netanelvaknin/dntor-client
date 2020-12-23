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

export const Login = () => {
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm();

  const { get, response, loading, error } = useFetch();

  const onSubmit = async (formData: any) => {
    console.log(formData);
    const newTodo = await get("/rest/v2/all");
    if (response.ok) console.log(newTodo);
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
                name="email"
                placeholder="מייל"
                register={register({
                  pattern: emailPattern,
                  required: true,
                })}
                error={!!errors.email}
                helperText={errors.email && 'כתובת דוא"ל לא תקינה'}
                startAdornment={<EmailIcon />}
              />
            </Grid>

            <Grid item md={12}>
              <TextFieldStyle
                name="password"
                type="password"
                placeholder="סיסמה"
                register={register({ required: true, minLength: 6 })}
                error={!!errors.password}
                helperText={errors.password && "סיסמה לא תקינה"}
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
        </form>
      </LoginCardStyle>
    </LoginPageStyle>
  );
};

export default Login;
