import {useContext, useEffect} from "react";
import {
    RegisterPageStyle,
    RegisterCard,
    RegisterHeading,
    RegisterButton,
    RegisterFieldStyle,
} from "./RegisterStyle";
import {useForm} from "react-hook-form";
import {Grid} from "@material-ui/core";
import {emailPattern, phoneNumberPattern} from "../../utils/patterns";
import useFetch from "use-http";
import rootContext from "../../context/root/rootContext";
import {Alert} from "@material-ui/lab";
import {useHistory} from "react-router-dom";
import moment from "moment";
import {useCookies} from "react-cookie";
import {Button} from '../../ui';
import {Rocket} from '../../animations'

export const Register = () => {
    const rootState = useContext(rootContext);
    const history = useHistory();
    const {control, register, watch, errors, handleSubmit} = useForm({
        defaultValues: {
            full_name: "",
            email: "",
            phone: "",
            password: "",
            validate_password: "",
        },
    });
    const {post, response} = useFetch();
    const [, setCookie] = useCookies(["token"]);

    const password = watch("password");
    const validatePassword = watch("validate_password");
    const passwordsMatch = password === validatePassword;

    useEffect(() => {
        rootState?.setLoaderTitle('בוא נטיס לך את העסק !')
        rootState?.setLoader(<Rocket />);
    }, []);

    const onSubmit = async (formData: any) => {
        await post("/user/signup", {
            fullname: formData.full_name,
            email: formData.email,
            personalPhoneNumber: formData.phone,
            password: formData.password,
        });

        if (response.ok) {
            const data = await post("/user/signin", {
                email: formData.email,
                password: formData.password,
            });

            if (response.ok) {
                const sevenDaysFromNow = moment().add(7, "d").format("YYYY-MM-DD");

                setCookie("token", data.res, {path: "/"});
                setCookie("token-expired-date", sevenDaysFromNow);
                history.push("/business-register");
            } else {
                rootState?.setError("משהו השתבש. נא לנסות מאוחר יותר.");
            }
        } else {
            rootState?.setError("כתובת מייל קיימת במערכת. נא לבחור כתובת אחרת.");
        }
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
                            register={register}
                            required
                            minLength={2}
                            maxLength={26}
                            error={!!errors.full_name || !!rootState?.error}
                            helperText={errors.full_name && "שם מלא לא תקין"}
                            control={control}
                        />
                    </Grid>

                    <Grid container justify="center" alignItems="center">
                        <RegisterFieldStyle
                            name="email"
                            register={register}
                            required
                            pattern={emailPattern}
                            type="email"
                            label="מייל"
                            error={!!errors.email || !!rootState?.error}
                            helperText={errors.email && 'כתובת דוא"ל לא תקינה'}
                            control={control}
                        />
                    </Grid>

                    <Grid container justify="center" alignItems="center">
                        <RegisterFieldStyle
                            type="number"
                            label="נייד"
                            name="phone"
                            register={register}
                            required
                            pattern={phoneNumberPattern}
                            error={!!errors.phone || !!rootState?.error}
                            helperText={errors.phone && "נייד לא תקין"}
                            control={control}
                        />
                    </Grid>

                    <Grid container justify="center" alignItems="center">
                        <RegisterFieldStyle
                            name="password"
                            register={register}
                            required
                            minLength={7}
                            error={!!errors.password || !!rootState?.error}
                            helperText={errors.password && "הסיסמה חייבת לכלול לפחות 7 תווים"}
                            type="password"
                            label="סיסמה"
                            control={control}
                        />
                    </Grid>

                    <Grid container justify="center" alignItems="center">
                        <RegisterFieldStyle
                            name="validate_password"
                            register={register}
                            required
                            minLength={7}
                            error={!!errors.password || !passwordsMatch || !!rootState?.error}
                            helperText={
                                errors.password
                                    ? "סיסמה לא תקינה"
                                    : !passwordsMatch
                                    ? "שדה 'אימות סיסמה' צריך להיות תואם לשדה סיסמה"
                                    : undefined
                            }
                            type="password"
                            label="אימות סיסמה"
                            control={control}
                        />
                    </Grid>

                    <Grid container style={{margin: "2rem 0 0rem"}}>
                        <Grid item md={12} xs={12}>
                            {rootState?.error && (
                                <Alert
                                    style={{maxWidth: "28rem", margin: "0 auto"}}
                                    severity="error"
                                >
                                    {rootState?.error}
                                </Alert>
                            )}
                        </Grid>
                    </Grid>

                    <Grid container justify="center" alignItems="center" direction="column">
                        <Grid item>
                            <RegisterButton type="submit">הרשמה</RegisterButton>
                        </Grid>
                        <Grid item style={{margin: '2rem 0 2rem'}}>
                            <Button variant="text" onClick={() => history.push('/login')}>יש לי כבר חשבון</Button>
                        </Grid>
                    </Grid>

                    <input autoComplete="on" readOnly={true} value="" name="hidden" type="text" style={{display: 'none'}} />
                </form>
            </RegisterCard>
        </RegisterPageStyle>
    );
};

export default Register;
