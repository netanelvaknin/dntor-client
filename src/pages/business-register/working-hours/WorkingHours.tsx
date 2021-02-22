import React, {useContext, useEffect, useState} from "react";
import {Grid, IconButton, Typography} from "@material-ui/core";
import {Button, TimePickerSelector} from "../../../ui/index";
import {ContinueButtonStyle} from "../BusinessRegisterStyle";
import {
  BreakButton,
  DayCheckbox,
  HoursSetupHeading,
  LeftGrid,
  MobileAddButton,
  NoWorkingHoursFound,
  RightGrid,
  ToText,
  WorkingHourCard,
} from "./WorkingHoursStyle";
import TrashIcon from "../../../assets/icons/trash_icon.svg";
import {useForm} from "react-hook-form";
import {CurrentStep} from "../BusinessRegister";
import rootContext from "../../../context/root/rootContext";
import moment from "moment";
import {Delete} from "@material-ui/icons";
import {Alert} from "@material-ui/lab";
import {useRequestBuilder, useSmallScreen} from '../../../hooks';

interface WorkingHoursProps extends CurrentStep {
    showMobileView?: boolean;
    initialWorkTimesData?: any;
    setShowMobileView?: React.Dispatch<React.SetStateAction<boolean>>;
    currentStep?: 1 | 2 | 3 | 4 | 5;
}

export const WorkingHours = ({
                                 setShowMobileView,
                                 showMobileView,
                                 setCurrentStep,
                                 initialWorkTimesData,
                                 currentStep,
                             }: WorkingHoursProps) => {
    const rootState = useContext(rootContext);
    const requestBuilder = useRequestBuilder();

    const {register, reset, handleSubmit} = useForm();

    const [startWorking, setStartWorking] = useState("08:00");
    const [endWorking, setEndWorking] = useState("18:00");

    const [startBreakOne, setStartBreakOne] = useState("00:00");
    const [endBreakOne, setEndBreakOne] = useState("00:00");

    const [startBreakTwo, setStartBreakTwo] = useState("00:00");
    const [endBreakTwo, setEndBreakTwo] = useState("00:00");

    const [startBreakThree, setStartBreakThree] = useState("00:00");
    const [endBreakThree, setEndBreakThree] = useState("00:00");

    const [canAdd, setCanAdd] = useState(false);
    const [error, setError] = useState("");
    const [breaks, setBreaks] = useState<any>([]);
    const [allDaysChecked, setAllDaysChecked] = useState(false);
    const [checkedDay, setCheckedDay] = useState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    });
    const [disabledDays, setDisabledDays] = useState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    });
    const [workingHours, setWorkingHours] = useState<any>([]);
    const isSmallScreen = useSmallScreen();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedDay({...checkedDay, [event.target.name]: event.target.checked});
    };

    const onStartTimeChange = (options: any) => {
        setStartWorking(`${options.hour}:${options.minute}`);
    };

    const onEndTimeChange = (options: any) => {
        setEndWorking(`${options.hour}:${options.minute}`);
    };

    // Break One Handlers
    const onStartBreakOneChange = (options: any) => {
        setStartBreakOne(`${options.hour}:${options.minute}`);
    };

    const onEndBreakOneChange = (options: any) => {
        setEndBreakOne(`${options.hour}:${options.minute}`);
    };

    // Break Two Handlers
    const onStartBreakTwoChange = (options: any) => {
        setStartBreakTwo(`${options.hour}:${options.minute}`);
    };

    const onEndBreakTwoChange = (options: any) => {
        setEndBreakTwo(`${options.hour}:${options.minute}`);
    };

    // Break Three Handlers
    const onStartBreakThreeChange = (options: any) => {
        setStartBreakThree(`${options.hour}:${options.minute}`);
    };

    const onEndBreakThreeChange = (options: any) => {
        setEndBreakThree(`${options.hour}:${options.minute}`);
    };
    const handleAddWorkingHours = () => {
        const hebrewDays = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
        const translatedDays = Object.entries(checkedDay).map(
            ([key, value], index) => {
                if (value) {
                    return hebrewDays[index];
                } else {
                    return null;
                }
            }
        );

        const uniqueDays = translatedDays.filter((day: any) => {
            const workingHoursCopy = JSON.stringify(workingHours);
            if (!workingHoursCopy.includes(day)) {
                !allDaysChecked && setAllDaysChecked(false);
                return day;
            } else {
                return null;
            }
        });

        const workStartTime = moment(startWorking, "hh:mm");
        const workEndTime = moment(endWorking, "hh:mm");
        const startIsBeforeEnd = workStartTime.isBefore(workEndTime);

        if (!startIsBeforeEnd) {
            rootState?.setError("זמן התחלה גדול מזמן סיום");
        }

        const finalBreaks = [];
        let breaksError = false;

        const startBreakOneTime = moment(startBreakOne, "hh:mm");
        const endBreakOneTime = moment(endBreakOne, "hh:mm");
        const startBreakTwoTime = moment(startBreakTwo, "hh:mm");
        const endBreakTwoTime = moment(endBreakTwo, "hh:mm");
        const startBreakThreeTime = moment(startBreakThree, "hh:mm");
        const endBreakThreeTime = moment(endBreakThree, "hh:mm");

        const isStartBreakOneValid =
            startBreakOneTime.isBetween(workStartTime, workEndTime) &&
            startBreakOneTime.isAfter(workStartTime) &&
            startBreakOneTime.isBefore(endBreakOneTime);
        const isEndBreakOneValid =
            endBreakOneTime.isBetween(workStartTime, workEndTime) &&
            endBreakOneTime.isBefore(workEndTime);
        const isStartBreakTwoValid =
            startBreakTwoTime.isBetween(workStartTime, workEndTime) &&
            startBreakTwoTime.isAfter(workStartTime) &&
            startBreakTwoTime.isBefore(endBreakTwoTime);
        const isEndBreakTwoValid =
            endBreakTwoTime.isBetween(workStartTime, workEndTime) &&
            endBreakTwoTime.isBefore(workEndTime);
        const isStartBreakThreeValid =
            startBreakThreeTime.isBetween(workStartTime, workEndTime) &&
            startBreakThreeTime.isAfter(workStartTime) &&
            startBreakThreeTime.isBefore(endBreakThreeTime);
        const isEndBreakThreeValid =
            endBreakThreeTime.isBetween(workStartTime, workEndTime) &&
            endBreakThreeTime.isBefore(workEndTime);

        if (startBreakOne && endBreakOne && breaks.includes(1)) {
            if (isStartBreakOneValid && isEndBreakOneValid) {
                finalBreaks.push({
                    from: startBreakOne,
                    to: endBreakOne,
                });
            } else {
                breaksError = true;
            }
        }

        if (startBreakTwo && endBreakTwo && breaks.includes(2)) {
            if (isStartBreakTwoValid && isEndBreakTwoValid) {
                finalBreaks.push({
                    from: startBreakTwo,
                    to: endBreakTwo,
                });
            } else {
                breaksError = true;
            }
        }

        if (startBreakThree && endBreakThree && breaks.includes(3)) {
            if (isStartBreakThreeValid && isEndBreakThreeValid) {
                finalBreaks.push({
                    from: startBreakThree,
                    to: endBreakThree,
                });
            } else {
                breaksError = true;
            }
        }

        if (uniqueDays.length > 0 && startIsBeforeEnd) {
            if (!breaksError) {
                breaksError = false;
                setError("");
                const checkedDays = {...checkedDay};
                setDisabledDays(checkedDays);
                // Set new working days & working times & breaks times
                setWorkingHours([
                    ...workingHours,
                    {
                        days: uniqueDays,
                        workingHours: {
                            from: startWorking,
                            to: endWorking,
                        },
                        breaks: finalBreaks,
                    },
                ]);

                if (isSmallScreen) {
                    setShowMobileView && setShowMobileView(true);
                }

                reset({start_working: "08:00", end_working: "18:00"});
                setBreaks([]);
                setStartBreakOne("00:00");
                setEndBreakOne("00:00");
                setStartBreakTwo("00:00");
                setEndBreakTwo("00:00");
                setStartBreakThree("00:00");
                setEndBreakThree("00:00");
            } else if (breaksError) {
                setError(
                    "נא לבדוק ששעות ההפסקה שהוגדרו הגיוניות ובין שעות העבודה של העסק"
                );
            }
        } else {
            setError(
                "נא לבדוק שנבחרו ימי עבודה ושזמני תחילת העבודה וסיום העבודה הם תקינים"
            );
        }
    };

    const removeWorkingHours = (index: number) => {
        const translatedDays = {
            sunday: "א",
            monday: "ב",
            tuesday: "ג",
            wednesday: "ד",
            thursday: "ה",
            friday: "ו",
            saturday: "ש",
        };

        const daysBeforeRemove = workingHours[index].days;
        const newDays = {};

        Object.entries(translatedDays).forEach(([key, value]) => {
            if (daysBeforeRemove.includes(value)) {
                Object.assign(newDays, {[key]: false});
            }
        });

        setCheckedDay({
            ...checkedDay,
            ...newDays,
        });

        setDisabledDays({
            ...disabledDays,
            ...newDays,
        });

        const workingHoursCopy = [...workingHours];
        workingHoursCopy.splice(index, 1);
        setWorkingHours(workingHoursCopy);
    };

    const removeBreak = (index: number) => {
        const breaksCopy = [...breaks];
        breaksCopy.splice(index, 1);
        setBreaks(breaksCopy);

        if (index === 1) {
            setStartBreakOne("00:00");
            setEndBreakOne("00:00");
        } else if (index === 2) {
            setStartBreakTwo("00:00");
            setEndBreakTwo("00:00");
        } else if (index === 3) {
            setStartBreakThree("00:00");
            setEndBreakThree("00:00");
        }
    };

    const BreakOne = () => {
        return (
            <Grid
                item
                container
                alignItems="center"
                justify="center"
                style={{
                    marginBottom: "2rem",
                    border: "1px solid #ccc",
                    borderRadius: "1.5rem",
                    padding: "1rem",
                    maxWidth: "32rem",
                }}
            >
                <Grid item container justify="center">
                    <Grid item>
                        <Typography variant="h2" style={{marginBottom: "0.5rem"}}>
                            מהן שעות ההפסקה הראשונה?
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container={!isSmallScreen}
                    justify={!isSmallScreen ? "center" : undefined}
                    alignItems={!isSmallScreen ? "center" : undefined}
                    md={5}
                >
                    <TimePickerSelector
                        time={startBreakOne}
                        onTimeChange={onStartBreakOneChange}
                    />
                </Grid>

                <Grid
                    item
                    container={!isSmallScreen}
                    justify={!isSmallScreen ? "center" : undefined}
                    alignItems={!isSmallScreen ? "center" : undefined}
                    md={2}
                >
                    <ToText>עד</ToText>
                </Grid>

                <Grid
                    item
                    container={!isSmallScreen}
                    justify={!isSmallScreen ? "center" : undefined}
                    alignItems={!isSmallScreen ? "center" : undefined}
                    md={5}
                >
                    <TimePickerSelector
                        time={endBreakOne}
                        onTimeChange={onEndBreakOneChange}
                    />
                </Grid>
                <BreakButton variant="text" onClick={() => removeBreak(0)}>
                    <Grid container justify="center" alignItems="center">
                        <Delete style={{marginLeft: "1rem"}}/> הסרת הפסקה
                    </Grid>
                </BreakButton>
            </Grid>
        );
    };

    const BreakTwo = () => {
        return (
            <Grid
                item
                container
                alignItems="center"
                justify="center"
                style={{
                    marginBottom: "2rem",
                    border: "1px solid #ccc",
                    borderRadius: "1.5rem",
                    padding: "1rem",
                    maxWidth: "32rem",
                }}
            >
                <Grid item container justify="center">
                    <Grid item>
                        <Typography variant="h2" style={{marginBottom: "0.5rem"}}>
                            מהן שעות ההפסקה השניה?
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container={!isSmallScreen}
                    justify={!isSmallScreen ? "center" : undefined}
                    alignItems={!isSmallScreen ? "center" : undefined}
                    md={5}
                >
                    <TimePickerSelector
                        time={startBreakTwo}
                        onTimeChange={onStartBreakTwoChange}
                    />
                </Grid>

                <Grid
                    item
                    container={!isSmallScreen}
                    justify={!isSmallScreen ? "center" : undefined}
                    alignItems={!isSmallScreen ? "center" : undefined}
                    md={2}
                >
                    <ToText>עד</ToText>
                </Grid>

                <Grid
                    item
                    container={!isSmallScreen}
                    justify={!isSmallScreen ? "center" : undefined}
                    alignItems={!isSmallScreen ? "center" : undefined}
                    md={5}
                >
                    <TimePickerSelector
                        time={endBreakTwo}
                        onTimeChange={onEndBreakTwoChange}
                    />
                </Grid>
                <BreakButton variant="text" onClick={() => removeBreak(1)}>
                    <Grid container justify="center" alignItems="center">
                        <Delete style={{marginLeft: "1rem"}}/> הסרת הפסקה
                    </Grid>
                </BreakButton>
            </Grid>
        );
    };

    const BreakThree = () => {
        return (
            <Grid
                item
                container
                alignItems="center"
                justify="center"
                style={{
                    marginBottom: "2rem",
                    border: "1px solid #ccc",
                    borderRadius: "1.5rem",
                    padding: "1rem",
                    maxWidth: "32rem",
                }}
            >
                <Grid item container justify="center">
                    <Grid item>
                        <Typography variant="h2" style={{marginBottom: "0.5rem"}}>
                            מהן שעות ההפסקה השלישית?
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container={!isSmallScreen}
                    justify={!isSmallScreen ? "center" : undefined}
                    alignItems={!isSmallScreen ? "center" : undefined}
                    md={5}
                >
                    <TimePickerSelector
                        time={startBreakThree}
                        onTimeChange={onStartBreakThreeChange}
                    />
                </Grid>

                <Grid
                    item
                    container={!isSmallScreen}
                    justify={!isSmallScreen ? "center" : undefined}
                    alignItems={!isSmallScreen ? "center" : undefined}
                    md={2}
                >
                    <ToText>עד</ToText>
                </Grid>

                <Grid
                    item
                    container={!isSmallScreen}
                    justify={!isSmallScreen ? "center" : undefined}
                    alignItems={!isSmallScreen ? "center" : undefined}
                    md={5}
                >
                    <TimePickerSelector
                        time={endBreakThree}
                        onTimeChange={onEndBreakThreeChange}
                    />
                </Grid>
                <BreakButton variant="text" onClick={() => removeBreak(2)}>
                    <Grid container justify="center" alignItems="center">
                        <Delete style={{marginLeft: "1rem"}}/> הסרת הפסקה
                    </Grid>
                </BreakButton>
            </Grid>
        );
    };

    useEffect(() => {
        const workingHoursCopy = JSON.stringify(workingHours);
        const days = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
        const allDaysAreChecked = days.every((day: any) => {
            return workingHoursCopy.includes(day);
        });

        setAllDaysChecked(allDaysAreChecked);
    }, [workingHours]);

    useEffect(() => {
        setError("");

        const atLeastOneChecked = Object.values(checkedDay).every((v) => !v);
        setCanAdd(atLeastOneChecked);
    }, [checkedDay]);

    const onSubmit = async () => {
        const workingHoursCopy = [...workingHours];

        // Translate the days to english
        workingHoursCopy.forEach(function (currentValue, index, array) {
            array[index] = JSON.parse(
                JSON.stringify(array[index]).replace("א", "sunday")
            );
            array[index] = JSON.parse(
                JSON.stringify(array[index]).replace("ב", "monday")
            );
            array[index] = JSON.parse(
                JSON.stringify(array[index]).replace("ג", "tuesday")
            );
            array[index] = JSON.parse(
                JSON.stringify(array[index]).replace("ד", "wednesday")
            );
            array[index] = JSON.parse(
                JSON.stringify(array[index]).replace("ה", "thursday")
            );
            array[index] = JSON.parse(
                JSON.stringify(array[index]).replace("ו", "friday")
            );
            array[index] = JSON.parse(
                JSON.stringify(array[index]).replace("ש", "saturday")
            );
        });

        const upsertWorkTimesResponse = await requestBuilder({
            method: 'post',
            endpoint: '/business/upsertWorkTimes',
            payload: workingHoursCopy
        })

        if (upsertWorkTimesResponse.ok) {
            setCurrentStep(3);
            setShowMobileView && setShowMobileView(false);
        }
    };

    useEffect(() => {
        if (initialWorkTimesData?.res?.days) {
            const daysToActivateAndDisabled: any = [];

            const days = initialWorkTimesData.res.days;
            const daysCopy = [...days];

            // Translate the days to english
            daysCopy.forEach(function (currentValue, index, array) {
                array[index] = JSON.parse(
                    JSON.stringify(array[index]).replace("sunday", "א")
                );
                array[index] = JSON.parse(
                    JSON.stringify(array[index]).replace("monday", "ב")
                );
                array[index] = JSON.parse(
                    JSON.stringify(array[index]).replace("tuesday", "ג")
                );
                array[index] = JSON.parse(
                    JSON.stringify(array[index]).replace("wednesday", "ד")
                );
                array[index] = JSON.parse(
                    JSON.stringify(array[index]).replace("thursday", "ה")
                );
                array[index] = JSON.parse(
                    JSON.stringify(array[index]).replace("friday", "ו")
                );
                array[index] = JSON.parse(
                    JSON.stringify(array[index]).replace("saturday", "ש")
                );
            });

            initialWorkTimesData.res.days.map((item: any) => {
                return daysToActivateAndDisabled.push(item.days);
            });

            const checkedCopy: any = {};
            daysToActivateAndDisabled.flat().forEach((day: any) => {
                checkedCopy[day] = true;
            });

            setCheckedDay({...checkedDay, ...checkedCopy});
            setDisabledDays({...disabledDays, ...checkedCopy});
            setWorkingHours(daysCopy);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialWorkTimesData, currentStep]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Grid container direction="row">
                <Grid md={12} justify="center" alignItems="center" container item>
                    <HoursSetupHeading variant="h1" style={{textAlign: "center"}}>
                        הגדרת זמני פעילות
                    </HoursSetupHeading>
                </Grid>

                {!showMobileView && (
                    <RightGrid
                        md={6}
                        sm={6}
                        container
                        item
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                        $workingHoursLength={workingHours.length}
                        style={{margin: "0 auto"}}
                    >
                        <Grid
                            item
                            container
                            justify="center"
                            alignItems="center"
                            direction="column"
                            style={{marginBottom: "3rem"}}
                        >
                            <Grid item>נא לסמן את הימים בהם העסק עובד</Grid>
                            <Grid item style={{maxWidth: "28rem"}}>
                                <DayCheckbox
                                    value={checkedDay.sunday}
                                    label="א"
                                    labelPlacement="top"
                                    name="sunday"
                                    disabled={disabledDays.sunday}
                                    onChange={handleChange}
                                />
                                <DayCheckbox
                                    value={checkedDay.monday}
                                    label="ב"
                                    labelPlacement="top"
                                    name="monday"
                                    register={register}
                                    disabled={disabledDays.monday}
                                    onChange={handleChange}
                                />
                                <DayCheckbox
                                    value={checkedDay.tuesday}
                                    label="ג"
                                    labelPlacement="top"
                                    name="tuesday"
                                    register={register}
                                    disabled={disabledDays.tuesday}
                                    onChange={handleChange}
                                />
                                <DayCheckbox
                                    value={checkedDay.wednesday}
                                    label="ד"
                                    labelPlacement="top"
                                    name="wednesday"
                                    register={register}
                                    disabled={disabledDays.wednesday}
                                    onChange={handleChange}
                                />
                                <DayCheckbox
                                    value={checkedDay.thursday}
                                    label="ה"
                                    labelPlacement="top"
                                    name="thursday"
                                    register={register}
                                    disabled={disabledDays.thursday}
                                    onChange={handleChange}
                                />
                                <DayCheckbox
                                    value={checkedDay.friday}
                                    label="ו"
                                    labelPlacement="top"
                                    name="friday"
                                    register={register}
                                    disabled={disabledDays.friday}
                                    onChange={handleChange}
                                />
                                <DayCheckbox
                                    value={checkedDay.saturday}
                                    label="ש"
                                    labelPlacement="top"
                                    name="saturday"
                                    register={register}
                                    disabled={disabledDays.saturday}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid item container justify="center">
                            <Grid item>
                                <Typography variant="h2" style={{marginBottom: "2rem"}}>
                                    מהן שעות העבודה של העסק?
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            container
                            alignItems="center"
                            justify="center"
                            style={{marginBottom: "2rem", maxWidth: "32rem"}}
                        >
                            <Grid
                                item
                                container
                                alignItems="center"
                                justify="center"
                                md={5}
                                xs={4}
                            >
                                <TimePickerSelector
                                    time={startWorking}
                                    onTimeChange={onStartTimeChange}
                                />
                            </Grid>

                            <Grid
                                item
                                container
                                alignItems="center"
                                justify="center"
                                md={2}
                                xs={3}
                            >
                                <ToText>עד</ToText>
                            </Grid>

                            <Grid
                                item
                                container
                                alignItems="center"
                                justify="center"
                                md={5}
                                xs={4}
                            >
                                <TimePickerSelector
                                    time={endWorking}
                                    onTimeChange={onEndTimeChange}
                                />
                            </Grid>
                        </Grid>

                        {breaks.length === 1 && <BreakOne/>}

                        {breaks.length === 2 && (
                            <>
                                <BreakOne/>
                                <BreakTwo/>
                            </>
                        )}

                        {breaks.length === 3 && (
                            <>
                                <BreakOne/>
                                <BreakTwo/>
                                <BreakThree/>
                            </>
                        )}

                        {breaks.length < 3 && (
                            <Grid
                                container
                                justify="center"
                                alignItems="center"
                                style={{marginBottom: "2rem"}}
                            >
                                <Grid item>
                                    <BreakButton
                                        variant="text"
                                        onClick={() => {
                                            setBreaks([...breaks, breaks.length + 1]);
                                        }}
                                    >
                                        הוספת הפסקה {breaks >= 1 && "נוספת"}
                                    </BreakButton>
                                </Grid>
                            </Grid>
                        )}
                    </RightGrid>
                )}

                {workingHours.length > 0 && !showMobileView && isSmallScreen && (
                    <Grid
                        md={12}
                        justify="center"
                        alignItems="center"
                        container
                        item
                        style={{marginTop: "3rem"}}
                    >
                        <Button
                            variant="text"
                            onClick={() => setShowMobileView && setShowMobileView(true)}
                        >
                            לצפיה בשעות הפעילות שכבר נבחרו
                        </Button>
                    </Grid>
                )}

                {/* DESKTOP VIEW OF SELECTED HOURS */}
                {!isSmallScreen && workingHours.length > 0 && (
                    <LeftGrid
                        md={6}
                        sm={6}
                        container
                        item
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        <div
                            style={{
                                maxHeight: "60rem",
                                overflow: "auto",
                                padding: ".5rem .5rem .5rem 2rem",
                            }}
                        >
                            {workingHours.map((workingHour: any, index: any) => {
                                return (
                                    <Grid container alignItems="center" key={index}>
                                        <WorkingHourCard>
                                            <div>
                                                {workingHour.days.map((day: any, dayIndex: number) => {
                                                    if (day) {
                                                        return <span key={dayIndex}>{day + " "}</span>;
                                                    }

                                                    return null;
                                                })}
                                            </div>
                                            <div style={{marginTop: "1rem"}}>
                                                <strong>שעות עבודה:</strong> <br/>
                                                {workingHour.workingHours.from}
                                                <strong style={{margin: "0 1rem"}}>עד</strong>
                                                {workingHour.workingHours.to}
                                            </div>

                                            <div style={{marginTop: "1rem"}}>
                                                {workingHour.breaks.map((b: any, index: number) => {
                                                    if (b.from === undefined && b.to === undefined) {
                                                        return null;
                                                    } else {
                                                        return (
                                                            <div key={index}>
                                                                <strong>זמני הפסקה מספר {index + 1}:</strong>{" "}
                                                                <br/>
                                                                <div>
                                                                    {b.from}
                                                                    <strong style={{margin: "0 1rem"}}>
                                                                        {" "}
                                                                        עד{" "}
                                                                    </strong>
                                                                    {b.to}
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                })}
                                            </div>
                                        </WorkingHourCard>
                                        <IconButton onClick={() => removeWorkingHours(index)}>
                                            <img src={TrashIcon} alt="מחיקה"/>
                                        </IconButton>
                                    </Grid>
                                );
                            })}
                        </div>
                    </LeftGrid>
                )}

                {/* MOBILE VIEW OF SELECTED HOURS */}
                {isSmallScreen && showMobileView && (
                    <Grid container>
                        <LeftGrid
                            md={6}
                            container
                            item
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{
                                maxHeight: "30rem",
                                overflowY: "auto",
                                width: "95%",
                                padding: "1rem 0",
                            }}
                        >
                            {workingHours.map((workingHour: any, index: any) => {
                                return (
                                    <Grid
                                        container
                                        alignItems="center"
                                        key={index}
                                        style={{maxWidth: "30rem"}}
                                    >
                                        <WorkingHourCard>
                                            <div>
                                                {workingHour.days.map((day: any, dayIndex: number) => {
                                                    if (day) {
                                                        return <span key={dayIndex}>{day + " "}</span>;
                                                    }

                                                    return null;
                                                })}
                                            </div>
                                            <div style={{marginTop: "1rem"}}>
                                                <strong>שעות עבודה:</strong> <br/>
                                                {workingHour.workingHours.from}
                                                <strong style={{margin: "0 1rem"}}>עד</strong>
                                                {workingHour.workingHours.to}
                                            </div>

                                            <div style={{marginTop: "1rem"}}>
                                                {workingHour.breaks.map((b: any, index: number) => {
                                                    if (b.from === undefined && b.to === undefined) {
                                                        return null;
                                                    } else {
                                                        return (
                                                            <div key={index}>
                                                                <strong>זמני הפסקה מספר {index + 1}:</strong>{" "}
                                                                <br/>
                                                                <div>
                                                                    {b.from}
                                                                    <strong style={{margin: "0 1rem"}}>
                                                                        {" "}
                                                                        עד{" "}
                                                                    </strong>
                                                                    {b.to}
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                })}
                                            </div>
                                        </WorkingHourCard>
                                        <IconButton
                                            onClick={() => removeWorkingHours(index)}
                                            style={{marginRight: "1.5rem"}}
                                        >
                                            <img src={TrashIcon} alt="מחיקה"/>
                                        </IconButton>
                                    </Grid>
                                );
                            })}
                        </LeftGrid>

                        {workingHours.length <= 0 && (
                            <NoWorkingHoursFound>לא נבחרו זמני פעילות</NoWorkingHoursFound>
                        )}

                        <Grid
                            item
                            container
                            justify="center"
                            alignItems="center"
                            style={{padding: "1rem 3rem 0"}}
                        >
                            <MobileAddButton
                                variant="outlined"
                                onClick={() => setShowMobileView && setShowMobileView(false)}
                            >
                                הוספת זמני פעילות {workingHours.length > 0 ? "נוספים" : ""}
                            </MobileAddButton>
                        </Grid>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            style={{margin: "2rem 0"}}
                        >
                            <ContinueButtonStyle
                                disabled={workingHours.length === 0}
                                type="submit"
                                variant="contained"
                            >
                                סיימתי כאן, המשך לשלב הבא
                            </ContinueButtonStyle>
                        </Grid>
                    </Grid>
                )}

                <Grid container style={{margin: "2rem 0 0"}}>
                    <Grid item md={12} xs={12}>
                        {error && (
                            <Alert
                                style={{maxWidth: "28rem", margin: "0 auto"}}
                                severity="error"
                            >
                                {error}
                            </Alert>
                        )}
                    </Grid>
                </Grid>

                {!showMobileView && (
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        style={{margin: "1rem 0 2rem"}}
                    >
                        <ContinueButtonStyle
                            variant="outlined"
                            onClick={handleAddWorkingHours}
                            disabled={allDaysChecked || canAdd}
                        >
                            הוספת זמני פעילות
                        </ContinueButtonStyle>
                    </Grid>
                )}

                {!showMobileView && (
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        style={{margin: "0rem 0 6rem"}}
                    >
                        <ContinueButtonStyle
                            disabled={workingHours.length === 0}
                            type="submit"
                            variant="contained"
                        >
                            המשך לשלב הבא
                        </ContinueButtonStyle>
                    </Grid>
                )}
            </Grid>
        </form>
    );
};

export default WorkingHours;
