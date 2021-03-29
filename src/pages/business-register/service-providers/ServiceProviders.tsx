import React, {forwardRef, useContext, useEffect, useState} from "react";
import {Dialog, Grid, IconButton, Slide, Typography} from "@material-ui/core";
// import ServiceProvidersInfoDialog from "./service-providers-info-dialog/ServiceProvidersInfoDialog";
import AdditionalHoursModal from "./additional-hours-modal/AdditionalHoursModal";
import {translateDaysToEnglish, translateDaysToHebrew} from '../../../utils/functions';
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
import {useSmallScreen, useRequestBuilder} from "../../../hooks/index";
import rootContext from "../../../context/root/rootContext";
import {Alert} from "@material-ui/lab";
import moment from "moment";
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
    const requestBuilder = useRequestBuilder();

    const [errors, setErrors] = useState<any>([]);
    const [mountedOnce, setMountedOnce] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [additionalHoursOpen, setAdditionalHoursOpen] = useState(false);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [checkedDay, setCheckedDay] = useState<any>({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    });
    const [hours, setHours] = useState<any>({});

    const providerName = watch("provider_name");
    const confirmationClasses = useConfirmationDialogStyles();

    const isSmallScreen = useSmallScreen();

    const handleChangeDay = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleServiceChange = (index: number) => {
        const servicesCopy = [...services];
        servicesCopy[index].selected = !servicesCopy[index].selected;

        setServices(servicesCopy);
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
                        reset({provider_name: ""});
                        resetSelectedServices();
                        setCurrentProviderData([]);
                        setSameHours(true);
                        setShowMobileView(true);
                        setCheckedDay({
                            sunday: false,
                            monday: false,
                            tuesday: false,
                            wednesday: false,
                            thursday: false,
                            friday: false,
                            saturday: false,
                        });

                        setHours({});
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

    const removeServiceProvider = async (index: number, spId: string) => {
        const serviceProvidersCopy = [...serviceProviders];
        serviceProvidersCopy.splice(index, 1);
        setServiceProviders(serviceProvidersCopy);

        if (spId) {
            rootState?.setLoader(<Delete/>);
            await requestBuilder({
                method: 'post',
                endpoint: '/serviceProvider/remove',
                payload: {spId}
            });
        }
    }

    const validate = (hours: any) => {
        const errors: any[] = [];

        const businessWorkingDays = translateDaysToEnglish(initialWorkingHours?.map((wTime: any) => wTime.days[0]));
        const atleastOneCheckedDay = Object.entries(checkedDay).some(([key, value]: any) => {
            return value;
        });

        const includesNonWorkingDay = Object.entries(hours).some(([key, value]: any) => {
            return !businessWorkingDays.includes(key);
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

        if (includesNonWorkingDay) {
            errors.push('אחד מימי העבודה שנבחרו לא קיימים בימי העבודה שהוגדרו לעסק.');
        }
        return errors;
    }

    const selectedDays: any = [];

    const onSave = async () => {
        const errors = validate(hours);

        if (errors.length <= 0) {
            setErrors([]);

            Object.entries(checkedDay).forEach(([key, value]) => {
                if (value) {
                    selectedDays.push({
                        days: [key],
                        workingHours: {
                            from: hours[key].from,
                            to: hours[key].to
                        },
                        breaks: [
                            ...hours[key].breaks
                        ]
                    });

                    setCurrentProviderData(selectedDays);
                }
            });

            handleCloseHoursModal();
        } else {
            setErrors(errors);
        }
    };

    const handleCloseHoursModal = () => {
        setErrors([]);
        setAdditionalHoursOpen(false);
    }

    const handleConfirmationDialogActions = (action: number) => {
        if (action === 1) {
            setCurrentProviderData([]);
            setConfirmationDialogOpen(false);
            setCurrentProviderData([]);
            setHours({});
            setCheckedDay({
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
            });
        } else if (action === 2) {
            setConfirmationDialogOpen(false);
            setSameHours(false);
        }
    };

    const onSubmit = async () => {
        rootState?.setLoader(<Loader/>);
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

        let serviceProviderResponse;
        if (uniqueProviders.length > 0) {
            serviceProviderResponse = await requestBuilder({
                method: 'post',
                endpoint: '/serviceProvider/insert',
                payload: uniqueProviders
            });
        } else if (uniqueProviders.length < 1 && finalServiceProviders.length > 0) {
            setCurrentStep(5);
            setShowMobileView(false);
        }

        if (serviceProviderResponse?.ok) {
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
                                                        <strong>שעות עבודה</strong>
                                                        <ul style={{listStylePosition: 'inside'}}>{serviceProvider.workTimes.map((workTime: any) => {
                                                            return workTime.days.map((day: any, dayIndex: number) => {
                                                                return <li key={dayIndex}>
                                                                    {day.workingHours.from} - {day.workingHours.to}
                                                                </li>
                                                            });
                                                        })}</ul>
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
                                <ButtonStyle
                                    variant="contained"
                                    type="submit"
                                    disabled={serviceProviders.length < 1}>
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
                                                </ServiceProviderCard>
                                            );
                                        })}
                                    </ServiceProvidersContainer>
                                )}

                                {currentProviderData.length > 0 && (
                                    <ServiceProvidersContainer>
                                        {currentProviderData.map((workTime: any, index: number) => {
                                            const translatedDays = translateDaysToHebrew(workTime.days);
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
                                                        {workTime.workingHours.from} - {workTime.workingHours.to}
                                                    </p>
                                                </ServiceProviderCard>
                                            )
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
                                                setAdditionalHoursOpen(true);
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
                        </Grid>

                        <AdditionalHoursModal
                            open={additionalHoursOpen}
                            setOpen={setAdditionalHoursOpen}
                            checkedDay={checkedDay}
                            handleChangeDay={handleChangeDay}
                            hours={hours}
                            setHours={setHours}
                            errors={errors}
                            onSave={onSave}
                        />

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
                            style={{
                                marginTop: "2rem",
                                paddingBottom: '4rem'
                            }}
                        >
                            <ContinueButton
                                variant="outlined"
                                onClick={handleAddProvider}>
                                הוספה
                            </ContinueButton>
                        </Grid>
                    </>
                )}
            </div>

            {/*<ServiceProvidersInfoDialog*/}
            {/*    open={dialogOpen}*/}
            {/*    setDialogOpen={setDialogOpen}*/}
            {/*/>*/}

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