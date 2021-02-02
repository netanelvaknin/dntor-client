import React, {forwardRef, useContext, useEffect, useState} from "react";
import {Dialog, Grid, IconButton, Slide, Typography} from "@material-ui/core";
import ServiceProvidersInfoDialog from "./service-providers-info-dialog/ServiceProvidersInfoDialog";
import AdditionalHoursModal from "./additional-hours-modal/AdditionalHoursModal";
import {Button, Checkbox, TextField} from "../../../ui/index";
import {useForm} from "react-hook-form";
import {TransitionProps} from "@material-ui/core/transitions";
import AddIcon from "../../../assets/icons/plus_icon.svg";
import TrashIcon from "../../../assets/icons/trash_icon.svg";
import {
    ButtonStyle,
    ConfirmationActionButton,
    ConfirmationDialogHeading,
    ConfirmationDialogSecondaryHeading,
    ContinueButton,
    Divider,
    Heading,
    ServiceCheckboxStyle,
    ServiceProviderCard,
    ServiceProvidersContainer,
    ServicesList,
    SummaryProviderCard,
    useConfirmationDialogStyles
} from "./ServiceProvidersStyle";
import {useSmallScreen} from "../../../hooks/index";
import rootContext from "../../../context/root/rootContext";
import {Alert} from "@material-ui/lab";
import moment from "moment";
import useFetch from "use-http";
import {Delete, Loader} from '../../../animations';

export const Transition = forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ServiceProvidersProps {
    initialServiceProvidersData?: any;
    initialServicesData?: any;
    businessWorkingHours?: any;
    showMobileView: boolean;
    setShowMobileView: (showMobileView: boolean) => void;
    setCurrentStep: (currentStep: 1 | 2 | 3 | 4 | 5) => void;
}

export const ServiceProviders = ({
                                     initialServiceProvidersData,
                                     initialServicesData,
                                     businessWorkingHours,
                                     showMobileView,
                                     setShowMobileView,
                                     setCurrentStep
                                 }: ServiceProvidersProps) => {
    const rootState = useContext(rootContext);
    const [currentProviderData, setCurrentProviderData] = useState<any>([]);
    const [services, setServices] = useState<any>([]);
    const [serviceProviders, setServiceProviders] = useState<any>([]);
    const [initialWorkingHours, setInitialWorkingHours] = useState<any>([]);
    const [sameHours, setSameHours] = useState(true);
    const {control, handleSubmit, register, watch, reset} = useForm({
        defaultValues: {
            provider_name: "",
        },
    });
    const {post, response} = useFetch();
    const [mountedOnce, setMountedOnce] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [additionalHoursOpen, setAdditionalHoursOpen] = useState(false);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [showBreakOne, setShowBreakOne] = useState(false);
    const [showBreakTwo, setShowBreakTwo] = useState(false);
    const [showBreakThree, setShowBreakThree] = useState(false);
    const [showAddBreakButton, setShowAddBreakButton] = useState(true);

    // Days states
    const [sunday, setSunday] = useState({selected: false, disabled: false});
    const [monday, setMonday] = useState({selected: false, disabled: false});
    const [tuesday, setTuesday] = useState({selected: false, disabled: false});
    const [wednesday, setWednesday] = useState({
        selected: false,
        disabled: false,
    });
    const [thursday, setThursday] = useState({
        selected: false,
        disabled: false,
    });
    const [friday, setFriday] = useState({selected: false, disabled: false});
    const [saturday, setSaturday] = useState({
        selected: false,
        disabled: false,
    });

    // Hours states
    const [startWorking, setStartWorking] = useState("08:00");
    const [endWorking, setEndWorking] = useState("18:00");

    // Breaks states
    const [startBreakOne, setStartBreakOne] = useState("08:00");
    const [endBreakOne, setEndBreakOne] = useState("18:00");
    const [startBreakTwo, setStartBreakTwo] = useState("08:00");
    const [endBreakTwo, setEndBreakTwo] = useState("18:00");
    const [startBreakThree, setStartBreakThree] = useState("08:00");
    const [endBreakThree, setEndBreakThree] = useState("18:00");

    const providerName = watch("provider_name");
    const confirmationClasses = useConfirmationDialogStyles();

    const isSmallScreen = useSmallScreen();

    const onSubmit = async () => {
        rootState?.setLoader(<Loader />);
        const finalServiceProviders: any = [];
        const serviceProvidersCopy = [...serviceProviders];

        serviceProvidersCopy.forEach((serviceProvider: any) => {
            const finalResult: any = {};

            if (serviceProvider._id) {
                finalResult._id = serviceProvider._id;
            }

            finalResult.fullname = serviceProvider.providerName;
            finalResult.services = serviceProvider.services.map((selectedService: any) => {
                return {serviceId: selectedService._id};
            });

            const formattedWorkTimes = serviceProvider.workTimes.map((providerWorkTimes: any) => {
                return providerWorkTimes.days.map((dayObj: any) => {
                    dayObj.days = translateDaysToEnglish(dayObj.days);
                    return dayObj;
                });
            });

            finalResult.workTimes = formattedWorkTimes[0];

            finalServiceProviders.push(finalResult);
        });

        const uniqueProviders = finalServiceProviders.filter((provider: any) => {
            if (!provider._id) {
                return provider;
            }

            return null;
        });

        if (uniqueProviders.length > 0) {
            await post("/serviceProvider/insert", uniqueProviders);
        } else if (uniqueProviders.length < 1 && finalServiceProviders.length > 0) {
            setCurrentStep(5);
            setShowMobileView(false);
        }

        if (response.ok) {
            setCurrentStep(5);
            setShowMobileView(false);
        }
    };

    useEffect(() => {
        if (initialServiceProvidersData) {
            const data: any = [];
            const initialServiceProvidersCopy = [...initialServiceProvidersData.res];
            initialServiceProvidersCopy.forEach((provider: any) => {
                const finalResult: any = {};
                finalResult._id = provider._id;
                finalResult.providerName = provider.fullName;
                finalResult.services = provider.services;
                provider.workTimes.map((workTime: any) => {
                    return workTime.days.map((dayObj: any) => {
                        return dayObj.days = translateDaysToHebrew(dayObj.days);
                    })
                });
                finalResult.workTimes = provider.workTimes;
                data.push(finalResult);
            });
            setServiceProviders(data);
        }
    }, [initialServiceProvidersData])

    useEffect(() => {
        if (!rootState?.loading && !mountedOnce) {
            setDialogOpen(true);
            setMountedOnce(true);
        }
    }, [rootState?.loading, mountedOnce]);

    useEffect(() => {
        const initialServices = initialServicesData?.res?.services;
        initialServices?.map((service: any) => {
            if (service) {
                service.selected = false;
                service.name = service.serviceName;
            }

            return null;
        });

        setServices(initialServices);
    }, [initialServicesData]);

    const handleServiceChange = (index: number) => {
        const servicesCopy = [...services];
        servicesCopy[index].selected = !servicesCopy[index].selected;

        setServices(servicesCopy);
    };

    const handleAddBreak = () => {
        if (!showBreakOne && !showBreakTwo && !showBreakThree) {
            setShowBreakOne(true);
        } else if (!showBreakTwo && !showBreakThree) {
            setShowBreakTwo(true);
        } else if (!showBreakThree) {
            setShowBreakThree(true);
            setShowAddBreakButton(false);
        }
    };

    const handleRemoveBreak = (breakNumber: number) => {
        switch (breakNumber) {
            case 1:
                setShowBreakOne(false);
                break;
            case 2:
                setShowBreakTwo(false);
                break;
            case 3:
                setShowBreakThree(false);
        }
    };

    const handleSaveDaysAndHours = () => {
        // Setup breaks array
        const breaks = [];

        const workStartTime = moment(startWorking, "hh:mm");
        const workEndTime = moment(endWorking, "hh:mm");
        const startIsBeforeEnd = workStartTime.isBefore(workEndTime);
        let workTimesError = "";

        if (!startIsBeforeEnd) {
            workTimesError = "זמן התחלה גדול מזמן סיום";
        }

        const startBreakOneTime = moment(startBreakOne, "hh:mm"), endBreakOneTime = moment(endBreakOne, "hh:mm"),
            startBreakTwoTime = moment(startBreakTwo, "hh:mm"), endBreakTwoTime = moment(endBreakTwo, "hh:mm"),
            startBreakThreeTime = moment(startBreakThree, "hh:mm"), endBreakThreeTime = moment(endBreakThree, "hh:mm"),
            isStartBreakOneValid =
                startBreakOneTime.isBetween(workStartTime, workEndTime) &&
                startBreakOneTime.isAfter(workStartTime) &&
                startBreakOneTime.isBefore(endBreakOneTime), isEndBreakOneValid =
            endBreakOneTime.isBetween(workStartTime, workEndTime) &&
            endBreakOneTime.isBefore(workEndTime), isStartBreakTwoValid =
            startBreakTwoTime.isBetween(workStartTime, workEndTime) &&
            startBreakTwoTime.isAfter(workStartTime) &&
            startBreakTwoTime.isBefore(endBreakTwoTime), isEndBreakTwoValid =
            endBreakTwoTime.isBetween(workStartTime, workEndTime) &&
            endBreakTwoTime.isBefore(workEndTime), isStartBreakThreeValid =
            startBreakThreeTime.isBetween(workStartTime, workEndTime) &&
            startBreakThreeTime.isAfter(workStartTime) &&
            startBreakThreeTime.isBefore(endBreakThreeTime), isEndBreakThreeValid =
            endBreakThreeTime.isBetween(workStartTime, workEndTime) &&
            endBreakThreeTime.isBefore(workEndTime);

        let breaksError = "";

        if (showBreakOne) {
            if (isStartBreakOneValid && isEndBreakOneValid) {
                breaks.push({from: startBreakOne, to: endBreakOne});
            } else {
                breaksError =
                    "נא לבדוק ששעות ההפסקה שהוגדרו הגיוניות ובין שעות העבודה של העסק";
            }
        }

        if (showBreakTwo) {
            if (isStartBreakTwoValid && isEndBreakTwoValid) {
                breaks.push({from: startBreakTwo, to: endBreakTwo});
            } else {
                breaksError =
                    "נא לבדוק ששעות ההפסקה שהוגדרו הגיוניות ובין שעות העבודה של העסק";
            }
        }

        if (showBreakThree) {
            if (isStartBreakThreeValid && isEndBreakThreeValid) {
                breaks.push({from: startBreakThree, to: endBreakThree});
            } else {
                breaksError =
                    "נא לבדוק ששעות ההפסקה שהוגדרו הגיוניות ובין שעות העבודה של העסק";
            }
        }

        if (!breaksError && !workTimesError) {
            // Extract the selected days
            const currentProviderDataCopy = JSON.stringify(currentProviderData);

            // Include only the days that selected and unique for each card
            const selectedDaysNames = [];
            sunday.selected && !sunday.disabled && !currentProviderDataCopy.includes("sunday") && selectedDaysNames.push("sunday");
            monday.selected && !currentProviderDataCopy.includes("monday") && selectedDaysNames.push("monday");
            tuesday.selected && !currentProviderDataCopy.includes("tuesday") && selectedDaysNames.push("tuesday");
            wednesday.selected && !currentProviderDataCopy.includes("wednesday") && selectedDaysNames.push("wednesday");
            thursday.selected && !currentProviderDataCopy.includes("thursday") && selectedDaysNames.push("thursday");
            friday.selected && !currentProviderDataCopy.includes("friday") && selectedDaysNames.push("friday");
            saturday.selected && !currentProviderDataCopy.includes("saturday") && selectedDaysNames.push("saturday");

            // Disabled the selected days
            sunday.selected && setSunday({...sunday, disabled: true});
            monday.selected && setMonday({...monday, disabled: true});
            tuesday.selected && setTuesday({...tuesday, disabled: true});
            wednesday.selected && setWednesday({...wednesday, disabled: true});
            thursday.selected && setThursday({...thursday, disabled: true});
            friday.selected && setFriday({...friday, disabled: true});
            saturday.selected && setSaturday({...saturday, disabled: true});

            if (selectedDaysNames.length > 0) {
                setCurrentProviderData([
                    ...currentProviderData, {
                        days: selectedDaysNames,
                        workingHours: {
                            from: startWorking,
                            to: endWorking,
                        },
                        breaks,
                    }]);

                // Reset and close
                setShowBreakOne(false);
                setShowBreakTwo(false);
                setShowBreakThree(false);
                setAdditionalHoursOpen(false);
                rootState?.setError("");
            } else {
                rootState?.setError('נא לוודא שסימנת ימים ושעות פעילות חדשים');
            }
        } else if (breaksError) {
            rootState?.setError(breaksError);
        } else if (workTimesError) {
            rootState?.setError(workTimesError);
        }
    };

    const handleConfirmationDialogActions = (action: number) => {
        if (action === 1) {
            setCurrentProviderData([]);
            setConfirmationDialogOpen(false);
            resetDays();
        } else if (action === 2) {
            setConfirmationDialogOpen(false);
            setSameHours(false);
        }
    };

    const resetDays = () => {
        setSunday({selected: false, disabled: false});
        setMonday({selected: false, disabled: false});
        setTuesday({selected: false, disabled: false});
        setWednesday({selected: false, disabled: false});
        setThursday({selected: false, disabled: false});
        setFriday({selected: false, disabled: false});
        setSaturday({selected: false, disabled: false});
    };

    const removeWorkTimesCard = (index: number) => {
        const currentServiceProviderCopy = [...currentProviderData];
        const daysToEnable = currentServiceProviderCopy[index].days;
        daysToEnable.includes("sunday") &&
        setSunday({selected: false, disabled: false});
        daysToEnable.includes("monday") &&
        setMonday({selected: false, disabled: false});
        daysToEnable.includes("tuesday") &&
        setTuesday({selected: false, disabled: false});
        daysToEnable.includes("wednesday") &&
        setWednesday({selected: false, disabled: false});
        daysToEnable.includes("thursday") &&
        setThursday({selected: false, disabled: false});
        daysToEnable.includes("friday") &&
        setFriday({selected: false, disabled: false});
        daysToEnable.includes("saturday") &&
        setSaturday({selected: false, disabled: false});
        currentServiceProviderCopy.splice(index, 1);
        setCurrentProviderData(currentServiceProviderCopy);
    };

    const handleAddProvider = () => {
        let providerData: any = {};


        const currentSelectedServices = services.filter((service: any) => {
            if (service.selected) {
                return {name: service.serviceName, ...service};
            }

            return null;
        });


        const initialWorkingHoursCopy = [...initialWorkingHours];
        const currentProviderDataCopy: any = [...currentProviderData];

        initialWorkingHoursCopy.map((w: any) => {
            return (w.days = translateDaysToHebrew(w.days));
        });

        currentProviderDataCopy.map((c: any) => {
            return (c.days = translateDaysToHebrew(c.days));
        });

        providerData.providerName = providerName;
        providerData.services = currentSelectedServices;

        if (sameHours) {
            providerData.workTimes = [{days: initialWorkingHoursCopy}];
        } else {
            providerData.workTimes = [{days: currentProviderData}];
        }


        if (providerName !== "") {
            rootState?.setError("");

            if (currentSelectedServices.length > 0) {
                rootState?.setError("");
                if (providerData.workTimes[0].days.length > 0) {
                    if (serviceProviders.length < 5) {
                        setServiceProviders([...serviceProviders, providerData]);

                        // Reset and move to providers view
                        resetDays();
                        reset({provider_name: ""});
                        resetSelectedServices();
                        setCurrentProviderData([]);
                        setSameHours(true);
                        setShowMobileView(true);
                    } else {
                        rootState?.setError('לא ניתן להוסיף יותר מ-5 נותני שירות לעסק אחד')
                    }
                } else {
                    rootState?.setError(`נא להוסיף שעות פעילות עבור ${providerName}`);
                }
            } else {
                rootState?.setError(`נא לסמן לפחות שירות אחד ש${providerName} נותנ/ת`);
            }
        } else {
            rootState?.setError("נא לבדוק ששם נותן השירות תקין");
        }
    };


    const resetSelectedServices = () => {
        const servicesCopy = [...services];
        servicesCopy.map((service: any) => {
            return (service.selected = false);
        });
    };

    useEffect(() => {
        if (!showBreakOne || !showBreakTwo || !showBreakThree) {
            setShowAddBreakButton(true);
        }
    }, [showBreakOne, showBreakTwo, showBreakThree]);

    const translateDaysToHebrew = (daysArr: string[]) => {
        if (daysArr) {
            if (
                daysArr.includes("א") ||
                daysArr.includes("ב") ||
                daysArr.includes("ג") ||
                daysArr.includes("ד") ||
                daysArr.includes("ה") ||
                daysArr.includes("ו") ||
                daysArr.includes("ש")
            ) {
                return daysArr;
            }

            const daysNames: any = {
                sunday: "א",
                monday: "ב",
                tuesday: "ג",
                wednesday: "ד",
                thursday: "ה",
                friday: "ו",
                saturday: "ש",
            };

            return daysArr.map((day: string) => {
                return daysNames[day];
            });
        }

    };

    const translateDaysToEnglish = (daysArr: string[]) => {
        if (
            daysArr.includes("sunday") ||
            daysArr.includes("monday") ||
            daysArr.includes("tuesday") ||
            daysArr.includes("wednesday") ||
            daysArr.includes("thursday") ||
            daysArr.includes("friday") ||
            daysArr.includes("saturday")
        ) {
            return daysArr;
        }

        return daysArr.map((day: string) => {
            if (day === 'א') {
                return 'sunday';
            } else if (day === 'ב') {
                return 'monday';
            } else if (day === 'ג') {
                return 'tuesday';
            } else if (day === 'ד') {
                return 'wednesday';
            } else if (day === 'ה') {
                return 'thursday';
            } else if (day === 'ו') {
                return 'friday';
            } else if (day === 'ש') {
                return 'saturday';
            } else {
                return null;
            }
        });
    };

    const removeServiceProvider = (index: number, spId: string) => {
        const serviceProvidersCopy = [...serviceProviders];
        serviceProvidersCopy.splice(index, 1);
        setServiceProviders(serviceProvidersCopy);

        if (spId) {
            rootState?.setLoader(<Delete />);
            post("/serviceProvider/remove", {spId})
        }
    }

    useEffect(() => {
        if (sameHours && currentProviderData.length > 0) {
            setConfirmationDialogOpen(true);
        } else {
            setConfirmationDialogOpen(false);
        }
    }, [sameHours, currentProviderData.length]);


    useEffect(() => {
        setInitialWorkingHours(businessWorkingHours?.res?.days);
    }, [businessWorkingHours?.res?.days]);

    const additionalHoursModalProps = {
        open: additionalHoursOpen,
        setOpen: setAdditionalHoursOpen,
        providerName: providerName,
        showBreakOne: showBreakOne,
        showBreakTwo: showBreakTwo,
        showBreakThree: showBreakThree,
        handleAddBreak: handleAddBreak,
        showAddBreakButton: showAddBreakButton,
        handleRemoveBreak: handleRemoveBreak,
        sunday: sunday,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday,
        startWorking: startWorking,
        endWorking: endWorking,
        setStartWorking: setStartWorking,
        setEndWorking: setEndWorking,
        setSunday: setSunday,
        setMonday: setMonday,
        setTuesday: setTuesday,
        setWednesday: setWednesday,
        setThursday: setThursday,
        setFriday: setFriday,
        setSaturday: setSaturday,
        startBreakOne: startBreakOne,
        endBreakOne: endBreakOne,
        startBreakTwo: startBreakTwo,
        endBreakTwo: endBreakTwo,
        startBreakThree: startBreakThree,
        endBreakThree: endBreakThree,
        setStartBreakOne: setStartBreakOne,
        setEndBreakOne: setEndBreakOne,
        setStartBreakTwo: setStartBreakTwo,
        setEndBreakTwo: setEndBreakTwo,
        setStartBreakThree: setStartBreakThree,
        setEndBreakThree: setEndBreakThree,
        handleSaveDaysAndHours: handleSaveDaysAndHours,
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div
                style={{
                    maxWidth: showMobileView ? isSmallScreen ? '30rem' : "40rem" : isSmallScreen ? '30rem' : "32rem",
                    margin: "0 auto",
                    paddingTop: showMobileView ? "2rem" : "0",
                }}
            >
                {showMobileView ? (
                    <div>
                        <Typography variant="h1" style={{textAlign: "center"}}>
                            נותני השירות בעסק
                        </Typography>
                        <div
                            style={{
                                paddingTop: "2rem",
                                maxHeight: isSmallScreen ? "32rem" : "44rem",
                                overflowY: "auto",
                                padding: "1rem 1rem 3rem",
                            }}
                        >
                            {serviceProviders.map((serviceProvider: any, index: number) => {
                                return (
                                    <Grid container alignItems="center" justify="center" spacing={1} key={index}>
                                        <Grid item md={2} xs={1} container justify="center">
                                            <IconButton type="button"
                                                        onClick={() => removeServiceProvider(index, serviceProvider.services[0].spId)}>
                                                <img src={TrashIcon} alt="מחיקה"/>
                                            </IconButton>
                                        </Grid>

                                        <Grid item md={10} xs={11} container alignItems="center">
                                            <SummaryProviderCard
                                                cardTitle={<strong>{serviceProvider.providerName}</strong>}
                                                expandable
                                            >
                                                <Grid container direction="column">
                                                    <div>
                                                        <strong>שירותים ש{serviceProvider.providerName} נותנ/ת:</strong>
                                                        <ServicesList>
                                                            {serviceProvider.services.map(
                                                                (service: any, index: number) => {
                                                                    return <li key={index}>{service.name}</li>;
                                                                }
                                                            )}
                                                        </ServicesList>
                                                    </div>

                                                    <div style={{marginTop: '1.5rem'}}>
                                                        <strong>ימי עבודה</strong>
                                                        <p>{serviceProvider.workTimes.map((workTime: any) => {
                                                            return workTime.days.map((day: any, dayIndex: number) => {
                                                                return <span
                                                                    key={dayIndex}>{day.days.map((day: string) => day + ' ')}</span>
                                                            })
                                                        })}</p>
                                                    </div>

                                                    <div style={{marginTop: '1.5rem'}}>
                                                        {serviceProvider.workTimes.map((workTime: any) => {
                                                            return workTime.days.map((daysObj: any, daysObjIndex: number) => {
                                                                return (
                                                                    <div key={daysObjIndex}>
                                                                        {daysObj.breaks[0] &&
                                                                        <strong>הפסקות:</strong>}
                                                                        {daysObj.breaks[0] &&
                                                                        <p>{daysObj.breaks[0].from} - {daysObj.breaks[0].to}</p>}
                                                                        {daysObj.breaks[1] &&
                                                                        <p>{daysObj.breaks[1].from} - {daysObj.breaks[1].to}</p>}
                                                                        {daysObj.breaks[2] &&
                                                                        <p>{daysObj.breaks[2].from} - {daysObj.breaks[2].to}</p>}
                                                                    </div>
                                                                )
                                                            })
                                                        })}
                                                    </div>
                                                </Grid>
                                            </SummaryProviderCard>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </div>

                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            style={{marginTop: "2rem", paddingBottom: "3rem"}}
                        >
                            <Grid item>
                                <ButtonStyle
                                    variant="outlined"
                                    onClick={() => setShowMobileView(false)}
                                >
                                    הוספת נותני שירות נוספים
                                </ButtonStyle>
                            </Grid>
                            <Grid item>
                                <ButtonStyle variant="contained" type="submit" disabled={serviceProviders.length < 1}>
                                    סיימתי, בוא נמשיך לשלב הבא
                                </ButtonStyle>
                            </Grid>
                        </Grid>
                    </div>
                ) : (
                    <>
                        <Grid
                            container
                            justify="flex-start"
                            alignItems="flex-start"
                            style={{paddingTop: "2.5rem"}}
                        >
                            <Grid item>
                                <TextField
                                    name="provider_name"
                                    register={register}
                                    control={control}
                                    type="text"
                                    label="מה שם נותנ/ת השירות"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            justify="flex-start"
                            alignItems="flex-start"
                            style={{marginTop: "2rem"}}
                        >
                            <Grid item style={{marginBottom: "1rem"}}>
                                <Heading>
                                    {providerName
                                        ? `מהם השירותים ש${providerName} נותנ/ת `
                                        : " מהם השירותים של נותנ/ת השירות "}
                                </Heading>
                            </Grid>
                            <Grid
                                item
                                container
                                style={{
                                    maxHeight: "12rem",
                                    overflowY: "auto",
                                    padding: "1rem 0 1rem 1rem",
                                }}
                            >
                                {services?.map((service: any, index: number) => {
                                    return (
                                        <Grid item key={service._id}>
                                            <ServiceCheckboxStyle
                                                name={service._id}
                                                value={service.selected}
                                                label={service.serviceName}
                                                onChange={() => handleServiceChange(index)}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>

                        <Divider/>

                        <Grid
                            container
                            justify="flex-start"
                            alignItems="flex-start"
                            style={{marginTop: "2rem"}}
                        >
                            <Grid item>
                                <Heading>
                                    {providerName
                                        ? `מהן שעות הפעילות של ${providerName}`
                                        : "מהן שעות הפעילות של נותנ/ת השירות "}
                                </Heading>
                            </Grid>

                            <Grid
                                item
                                container
                                justify="space-between"
                                style={{margin: "1.5rem 0"}}
                            >
                                <Grid
                                    item
                                    container
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Checkbox
                                        label="שימוש באותן השעות שהוגדרו לעסק"
                                        name="same_hours"
                                        value={sameHours}
                                        onChange={() => setSameHours(!sameHours)}
                                    />
                                </Grid>

                                {sameHours && initialWorkingHours?.length > 0 && (
                                    <ServiceProvidersContainer>
                                        {initialWorkingHours?.map((w: any, index: number) => {
                                            const translatedDays = translateDaysToHebrew(w.days);
                                            return (
                                                <ServiceProviderCard key={index}>
                                                    <strong>ימי פעילות:</strong>
                                                    <p>
                                                        {translatedDays?.map((day: string) => {
                                                            return day + " ";
                                                        })}
                                                    </p>

                                                    <strong>שעת התחלה וסיום:</strong>
                                                    <p>
                                                        {w.workingHours.from} - {w.workingHours.to}
                                                    </p>

                                                    {w.breaks.length !== 0 && (
                                                        <>
                                                            <strong>הפסקות:</strong>

                                                            {w.breaks[0] && (
                                                                <p>
                                                                    {w.breaks[0].from} - {w.breaks[0].to}
                                                                </p>
                                                            )}

                                                            {w.breaks[1] && (
                                                                <p>
                                                                    {w.breaks[1].from} - {w.breaks[1].to}
                                                                </p>
                                                            )}

                                                            {w.breaks[2] && (
                                                                <p>
                                                                    {w.breaks[2].from} - {w.breaks[2].to}
                                                                </p>
                                                            )}
                                                        </>
                                                    )}
                                                </ServiceProviderCard>
                                            );
                                        })}
                                    </ServiceProvidersContainer>
                                )}

                                {!sameHours && (
                                    <Grid
                                        item
                                        container
                                        alignItems="center"
                                        justify="flex-start"
                                        style={{marginTop: "1rem"}}
                                    >
                                        <IconButton
                                            style={{marginRight: "-1.2rem"}}
                                            onClick={() => {
                                                rootState?.setError("");
                                                setAdditionalHoursOpen(true)
                                            }}
                                        >
                                            <img src={AddIcon} alt="הוספת זמנים לנותן שירות"/>{" "}
                                        </IconButton>
                                        <span
                                            style={{cursor: "pointer", fontSize: "1.8rem"}}
                                            onClick={() => {
                                                rootState?.setError("");
                                                setAdditionalHoursOpen(true);
                                            }}
                                        >
                                הוסף שעות
                                </span>
                                    </Grid>
                                )}
                            </Grid>

                            {/* Service provider working hours & breaks times */}
                            <ServiceProvidersContainer item container>
                                {currentProviderData?.map((serviceProvider: any, index: number) => {
                                    return (
                                        <ServiceProviderCard key={index}>
                                            <strong>ימי פעילות:</strong>
                                            <p>
                                                {serviceProvider.days.includes("sunday") && "א "}
                                                {serviceProvider.days.includes("monday") && "ב "}
                                                {serviceProvider.days.includes("tuesday") && "ג "}
                                                {serviceProvider.days.includes("wednesday") && "ד "}
                                                {serviceProvider.days.includes("thursday") && "ה "}
                                                {serviceProvider.days.includes("friday") && "ו "}
                                                {serviceProvider.days.includes("saturday") && "ש "}
                                            </p>

                                            <strong>שעת התחלה וסיום:</strong>
                                            <p>
                                                {serviceProvider.workingHours.from} -{" "}
                                                {serviceProvider.workingHours.to}
                                            </p>

                                            {serviceProvider.breaks[0] && <strong>הפסקות:</strong>}
                                            <p>
                                                {serviceProvider.breaks[0] &&
                                                `${serviceProvider.breaks[0].from} - ${serviceProvider.breaks[0].to}`}
                                            </p>
                                            <p>
                                                {serviceProvider.breaks[1] &&
                                                `${serviceProvider.breaks[1].from} - ${serviceProvider.breaks[1].to}`}
                                            </p>

                                            <p>
                                                {serviceProvider.breaks[2] &&
                                                `${serviceProvider.breaks[2].from} - ${serviceProvider.breaks[2].to}`}
                                            </p>

                                            <IconButton
                                                onClick={() => removeWorkTimesCard(index)}
                                                style={{
                                                    position: "absolute",
                                                    left: "1rem",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                }}
                                            >
                                                <img src={TrashIcon} alt="מחיקה"/>
                                            </IconButton>
                                        </ServiceProviderCard>
                                    );
                                })}
                            </ServiceProvidersContainer>
                        </Grid>

                        <Grid container style={{margin: "2rem 0 2rem"}}>
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

                        {serviceProviders.length > 0 && (
                            <Grid container justify="center" alignItems="center">
                                <Grid item>
                                    <Button
                                        variant="text"
                                        onClick={() => {
                                            setShowMobileView(true);
                                            rootState?.setError('');
                                        }}
                                    >
                                        לצפיה בנותני שירות שכבר הוספת
                                    </Button>
                                </Grid>
                            </Grid>
                        )}

                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            style={{marginTop: "2rem", paddingBottom: "4rem"}}
                        >
                            <ContinueButton
                                variant="contained"
                                onClick={handleAddProvider}>
                                הוספה
                            </ContinueButton>
                        </Grid>
                    </>
                )}
            </div>

            <ServiceProvidersInfoDialog
                open={dialogOpen}
                setDialogOpen={setDialogOpen}
            />

            <AdditionalHoursModal {...additionalHoursModalProps} />

            <Dialog
                TransitionComponent={Transition}
                open={confirmationDialogOpen}
                classes={{paper: confirmationClasses.paper}}
            >
                <ConfirmationDialogHeading>
                    בחרת להשתמש באותן שעות שבהן העסק משתמש.
                </ConfirmationDialogHeading>
                <ConfirmationDialogSecondaryHeading>
                    פעולה זאת תוביל למחיקת הימים והשעות שכבר בחרת בשלב זה. בטוח ?
                </ConfirmationDialogSecondaryHeading>

                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item md={6} container justify="center" alignItems="center">
                        <ConfirmationActionButton
                            onClick={() => handleConfirmationDialogActions(1)}
                        >
                            כן, אפשר למחוק
                        </ConfirmationActionButton>
                    </Grid>
                    <Grid item md={6} container justify="center" alignItems="center">
                        <ConfirmationActionButton
                            variant="contained"
                            onClick={() => handleConfirmationDialogActions(2)}
                        >
                            התחרטתי, בואו נשאיר
                        </ConfirmationActionButton>
                    </Grid>
                </Grid>
            </Dialog>
        </form>
    );
};

export default ServiceProviders;
