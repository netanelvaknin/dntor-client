import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import {HoursSetupHeading} from "./WorkingHoursStyle";
import {useForm} from "react-hook-form";
import {CurrentStep} from "../BusinessRegister";
import {Alert} from "@material-ui/lab";
import {useRequestBuilder} from '../../../hooks';
import Days from './days/Days';
import Hours from './hours/Hours';
import {ContinueButtonStyle} from '../BusinessRegisterStyle';
import moment from 'moment';

interface WorkingHoursProps extends CurrentStep {
    showMobileView?: boolean;
    initialWorkTimesData?: any;
    setShowMobileView?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkingHours = ({
                                 setCurrentStep,
                                 initialWorkTimesData,
                             }: WorkingHoursProps) => {
    const requestBuilder = useRequestBuilder();
    const {register, handleSubmit} = useForm();
    const [errors, setErrors] = useState<any>([]);
    const [hours, setHours] = useState<any>({});
    const [checkedDay, setCheckedDay] = useState<any>({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = event.target

        setHours((prev: any) => {
            if (checked) {
                return {...prev, [name]: {from: "08:00", to: "17:00", breaks: []}}
            }
            const {[name]: namesValue, ...rest} = prev
            return rest
        })

        setCheckedDay((prev: any) => ({...prev, [name]: checked}))
    }

    const validate = (hours: any) => {
        const errors: any[] = [];
        const atleastOneCheckedDay = Object.entries(checkedDay).some(([key, value]: any) => {
            return value;
        })

        if (atleastOneCheckedDay) {
            Object.entries(hours).forEach(([, value]: any) => {
                const startWorkingTime = moment(value.from, "hh:mm");
                const endWorkingTime = moment(value.to, "hh:mm");
                if (startWorkingTime.isBefore(endWorkingTime)) {
                    value.breaks.forEach((b: any) => {
                        const startBreakTime = moment(b.from, "hh:mm");
                        const endBreakTime = moment(b.to, "hh:mm");

                        if (!startBreakTime.isBefore(endBreakTime)) {
                            errors.push('זמן ההתחלה של אחת ההפסקות הוא אחרי זמן הסיום שנבחר.');
                        }

                        if (!startBreakTime.isBetween(startWorkingTime, endWorkingTime) || !endBreakTime.isBetween(startWorkingTime, endWorkingTime)) {
                            errors.push('זמן ההתחלה או הסיום של אחת ההפסקות הוא לא בין שעות העבודה שנבחרו.')
                        }
                    });
                } else {
                    errors.push('זמן ההתחלה של אחד מימי העבודה הוא אחרי זמן הסיום שהוזן.');
                }

            });
        } else {
            errors.push('נא לסמן לפחות יום עבודה אחד');
        }
        return errors;
    }

    const onSubmit = async () => {
        const errors = validate(hours);
        const finalResult: any = [];

        if (errors.length <= 0) {
            Object.keys(hours).forEach((key) => {
                finalResult.push({
                    days: [key],
                    workingHours: {
                        from: hours[key].from,
                        to: hours[key].to
                    },
                    breaks: [
                        ...hours[key].breaks
                    ]
                })
            });

            const upsertWorkingTimesResponse = await requestBuilder({
                method: 'post',
                endpoint: '/business/upsertWorkTimes',
                payload: finalResult
            });

            if (upsertWorkingTimesResponse.ok) {
                setCurrentStep(3);
            }
        } else {
            // @ts-ignore
            const uniqueErrors = [...new Set(errors)];
            setErrors(uniqueErrors);
        }
    };

    useEffect(() => {
        if (initialWorkTimesData) {
            let data = {};
            let newCheckedDays: any = {};
            initialWorkTimesData?.res?.days?.forEach((day: any) => {
                const key = day.days;
                data = {
                    ...data,
                    [key]: {
                        from: day.workingHours.from,
                        to: day.workingHours.to,
                        breaks: [...day.breaks]
                    }
                }

                newCheckedDays[key] = true;
            });

            setCheckedDay({...checkedDay, ...newCheckedDays});
            setHours(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialWorkTimesData]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Grid container direction="column">
                <Grid md={12} justify="center" alignItems="center" container item>
                    <HoursSetupHeading variant="h1" style={{textAlign: "center"}}>
                        הגדרת זמני פעילות
                    </HoursSetupHeading>
                </Grid>

                <Days
                    register={register}
                    checkedDay={checkedDay}
                    handleChange={handleChange}/>

                <Hours
                    hours={hours}
                    setHours={setHours}
                />

                <Grid container style={{margin: "2rem 0 0"}}>
                    <Grid item md={12} xs={12}>
                        {errors.length > 0 && (
                            <Alert
                                style={{maxWidth: "28rem", margin: "0 auto"}}
                                severity="error"
                            >
                                <ul>
                                    {errors.map((error: string, i: number) => {
                                        return <li key={i}>{error}</li>
                                    })}
                                </ul>
                            </Alert>
                        )}
                    </Grid>
                </Grid>

                <Grid container justify="center" style={{margin: '2rem 0 4rem'}}>
                    <Grid item>
                        <ContinueButtonStyle type="submit" variant="contained">המשך</ContinueButtonStyle>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default WorkingHours;
