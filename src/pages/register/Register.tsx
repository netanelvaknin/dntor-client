import {useContext, useState} from "react";
import {
    RegisterButton,
    RegisterCard,
    RegisterFieldStyle,
    RegisterHeading,
    RegisterPageStyle,
    TermsButtonText
} from "./RegisterStyle";
import {useForm} from "react-hook-form";
import {Grid} from "@material-ui/core";
import {emailPattern, phoneNumberPattern} from "../../utils/patterns";
import rootContext from "../../context/root/rootContext";
import {Alert} from "@material-ui/lab";
import {useHistory} from "react-router-dom";
import moment from "moment";
import {useCookies} from "react-cookie";
import {Button, Checkbox} from '../../ui';
import {useRequestBuilder, useSmallScreen} from '../../hooks';
import TermsDialog from "./terms-dialog/TermsDialog";

export const Register = () => {
    const [termsDialogOpen, setTermsDialogOpen] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
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
    const requestBuilder = useRequestBuilder();
    const [, setCookie] = useCookies(["token"]);
    const isSmallScreen = useSmallScreen();

    const password = watch("password");
    const validatePassword = watch("validate_password");
    const passwordsMatch = password === validatePassword;

    const onSubmit = async (formData: any) => {
        if (termsChecked) {
            const signUpResponse = await requestBuilder({
                method: 'post',
                endpoint: '/user/signup',
                payload: {
                    fullname: formData.full_name,
                    email: formData.email,
                    personalPhoneNumber: formData.phone,
                    password: formData.password,
                },
            });

            if (signUpResponse.ok) {
                const signInResponse = await requestBuilder({
                    method: 'post',
                    endpoint: '/user/signin',
                    payload: {
                        email: formData.email,
                        password: formData.password,
                    },
                });

                if (signInResponse.ok) {
                    const sevenDaysFromNow = moment().add(7, "d").format("YYYY-MM-DD");

                    setCookie("token", signInResponse.data.res, {path: "/"});
                    setCookie("token-expired-date", sevenDaysFromNow);
                    history.push("/business-register");
                } else {
                    rootState?.setError("משהו השתבש. נא לנסות מאוחר יותר.");
                }
            } else {
                rootState?.setError("כתובת מייל קיימת במערכת. נא לבחור כתובת אחרת.");
            }
        } else {
            rootState?.setError('נא לקרוא ולסמן את הסכמתך לתנאי השימוש');
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
                            error={!!errors.full_name}
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
                            error={!!errors.email}
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
                            error={!!errors.phone}
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
                            error={!!errors.password}
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
                            error={!!errors.password || !passwordsMatch}
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

                    <Grid style={{marginTop: '2rem'}} container justify={isSmallScreen ? 'center' : 'flex-start'}
                          alignItems="center">
                        <Checkbox
                            name="terms_agreement"
                            label={<span>אני מסכים לכל <TermsButtonText variant="text"
                                                                        onClick={() => setTermsDialogOpen(!termsDialogOpen)}>תנאי השימוש</TermsButtonText></span>}
                            value={termsChecked}
                            onChange={() => setTermsChecked(!termsChecked)}
                        />

                    </Grid>

                    <Grid container>
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

                    <input autoComplete="on" readOnly={true} value="" name="hidden" type="text"
                           style={{display: 'none'}}/>
                </form>
            </RegisterCard>

            <TermsDialog setTermsDialogOpen={setTermsDialogOpen} termsDialogOpen={termsDialogOpen}/>
        </RegisterPageStyle>
    );
};

export default Register;
