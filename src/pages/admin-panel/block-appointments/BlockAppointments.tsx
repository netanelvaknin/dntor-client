import React, {Fragment, useContext, useEffect, useState} from "react";
import {
    BlockAppointmentsContainer,
    BlockButton,
    BlockedAppointmentsCard,
    CauseField,
    FabStyle,
    ScreenWrapper,
    useDatepickerStyles
} from './BlockAppointmentsStyle';
import {Checkbox, TimePickerSelector} from '../../../ui';
import rootContext from "../../../context/root/rootContext";
import {Controller, useForm} from 'react-hook-form';
import {Checkbox as MatCheckbox, FormControlLabel, Grid, IconButton} from "@material-ui/core";
import {DatePicker} from "@material-ui/pickers";
import {ToText} from "../../business-register/working-hours/WorkingHoursStyle";
import {ReactComponent as CheckboxCircle} from "../../../assets/icons/checkbox_circle.svg";
import {ReactComponent as CheckboxChecked} from "../../../assets/icons/checkbox_checked.svg";
import {useCheckboxStyles} from "../../../ui/checkbox/CheckboxStyle";
import moment from 'moment';
import cancelBlockingIcon from '../../../assets/icons/cancel_blocking.svg';
import arrowIcon from '../../../assets/icons/arrow_up.svg';
import {useRequestBuilder, useScroll, useSmallScreen} from "../../../hooks";
import {Alert} from "@material-ui/lab";

interface BlockAppointmentsProps {
    serviceProviderData?: any;
}


export const BlockAppointments = ({serviceProviderData}: BlockAppointmentsProps) => {
    const rootState = useContext(rootContext);
    const [providers, setProviders] = useState<any>([]);
    const [businessBlockedAppointments, setBusinessBlockedAppointments] = useState<any>([]);
    const [providersBlockedAppointments, setProvidersBlockedAppointments] = useState<any>([...serviceProviderData]);
    const [startBlockHour, setStartBlockHour] = useState(moment().format('08:00'));
    const [endBlockHour, setEndBlockHour] = useState('18:00');
    const requestBuilder = useRequestBuilder();
    const {handleSubmit, register, control, reset, errors} = useForm({
        defaultValues: {
            all_providers: false,
            cause: '',
            fromDate: new Date(),
            toDate: new Date()
        }
    });

    const [allProviders, setAllProviders] = useState(false);
    const isSmallScreen = useSmallScreen();
    const datepickerClasses = useDatepickerStyles();
    const classes = useCheckboxStyles();
    const scrollPosition = useScroll();
    const scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;

    const handleProvidersChange = (index: number) => {
        const providersCopy = [...providers];
        providersCopy[index].selected = !providersCopy[index].selected;

        setProviders(providersCopy);
    };

    const obSubmit = async (values: any) => {
        const now = moment();

        // Append hours to the start & end date
        const fromDate = moment(values.fromDate);
        const toDate = moment(values.toDate);

        const hoursStartBlock = startBlockHour.split(':')[0];
        const minutesStartBlock = startBlockHour.split(':')[1];

        const hoursEndBlock = endBlockHour.split(':')[0];
        const minutesEndBlock = endBlockHour.split(':')[1];

        fromDate.set({h: Number(hoursStartBlock), m: Number(minutesStartBlock)})
        toDate.set({h: Number(hoursEndBlock), m: Number(minutesEndBlock)});
        const duration = moment.duration(toDate.diff(fromDate)).asMinutes();

        if (fromDate.isAfter(now) && toDate.isAfter(now) && toDate.isAfter(fromDate)) {
            if (duration > 20) {
                // Check if at least one provider selected
                const selectedProviders = providers.filter((provider: any) => {
                    if (provider.selected) {
                        return provider;
                    }

                    return null;
                });

                // Group data and send
                const data = {
                    fromDate,
                    toDate,
                    cause: values.cause
                }

                let getBlockWorkTimeResponse;
                if (selectedProviders.length > 0 || allProviders) {
                    if (allProviders) {
                        await requestBuilder({
                            method: 'post',
                            endpoint: '/business/insertBlockWorkTime'
                        });

                        getBlockWorkTimeResponse = await requestBuilder({
                            method: 'get',
                            endpoint: '/business/getBlockWorkTime',
                        })
                        setBusinessBlockedAppointments([...getBlockWorkTimeResponse?.data.res]);
                    } else {
                        const providersIds = selectedProviders.map((provider: any) => {
                            return provider._id;
                        });

                        const blocks: any = [];
                        providersIds.forEach((id: string) => {
                            const provider = providersBlockedAppointments.find((providerB: any) => providerB._id === id);

                            const buildProvider = {
                                _id: id,
                                fullName: provider.fullName,
                                blockedWt: [data]
                            };

                            blocks.push(buildProvider);
                        });

                        setProvidersBlockedAppointments([...providersBlockedAppointments, ...blocks]);

                        // Format blocked appointments before sending
                        const formattedExistingBlocks: any = [];
                        providersBlockedAppointments.forEach((provider: any) => {
                            if (provider.blockedWt.length > 0) {
                                provider.blockedWt.forEach((block: any) => {
                                    formattedExistingBlocks.push({
                                        spId: provider._id,
                                        blockedWt: [{
                                            from: block.fromDate,
                                            to: block.toDate,
                                            cause: block.cause
                                        }]
                                    })
                                })
                            } else {
                                formattedExistingBlocks.push({
                                    spId: provider._id,
                                    blockedWt: []
                                })
                            }
                        });

                        const formattedNewBlocks: any = [];
                        blocks.forEach((block: any) => {
                            formattedNewBlocks.push({
                                spId: block._id,
                                blockedWt: [{
                                    from: block.blockedWt[0].fromDate,
                                    to: block.blockedWt[0].toDate,
                                    cause: block.blockedWt[0].cause
                                }]
                            })
                        });

                        await requestBuilder({
                            method: 'post',
                            endpoint: '/serviceProvider/update',
                            payload: [...formattedNewBlocks, ...formattedExistingBlocks]
                        });
                    }

                    reset({
                        cause: '',
                        fromDate: new Date(),
                        toDate: new Date()
                    });

                    const providersCopy = [...providers];
                    providersCopy.map((provider: any) => {
                        return (provider.selected = false);
                    });

                    setAllProviders(false);
                    setStartBlockHour('08:00');
                    setEndBlockHour('18:00');
                    window.scrollTo(0, document.body.scrollHeight);
                    rootState?.setError('');
                } else {
                    rootState?.setError('יש לבחור לפחות נותן שירות שירות אחד')
                }
            } else {
                rootState?.setError('נא להזין חסימה שהיא מעל 20 דק');
            }
        } else {
            rootState?.setError('יש לוודא שהשעות והתאריכים שנבחרו הם הגיוניים. אין לבחור תאריכים ושעות שעברו כבר.');
        }
    };

    const removeBlockedServiceProvider = async (providerIdToRemove: string, providerWtId: string) => {
        const updatedBlockedAppointments: any = [];

        const providerToRemove = providersBlockedAppointments.find((provider: any) => {
            return provider._id === providerIdToRemove;
        });


        const WtIdToRemove = providerToRemove.blockedWt.find((blockedWt: any) => {
            return blockedWt._id === providerWtId && providerToRemove?.hasOwnProperty('services');
        });


        if (WtIdToRemove) {
            const index = providerToRemove.blockedWt.findIndex((provider: any) => {
                return provider._id === providerIdToRemove;
            })
            providerToRemove.blockedWt.splice(index, 1);

            providersBlockedAppointments.forEach((provider: any) => {
                if (provider.blockedWt.length > 0) {
                    provider.blockedWt.forEach((blocked: any) => {
                        updatedBlockedAppointments.push({
                            spId: provider._id,
                            fullname: provider.fullName,
                            blockedWt: [{
                                from: blocked.fromDate,
                                to: blocked.toDate,
                                cause: blocked.cause
                            }]
                        });
                    });
                } else {
                    updatedBlockedAppointments.push({
                        spId: provider._id,
                        fullname: provider.fullName,
                        blockedWt: []
                    });
                }
            });

            await requestBuilder({
                method: 'post',
                endpoint: '/serviceProvider/update',
                payload: updatedBlockedAppointments
            });
        } else {
            const providersBlockedAppointmentsCopy = [...providersBlockedAppointments];
            const providerWithoutWtId = providersBlockedAppointmentsCopy.findIndex((provider) => {
                return provider._id === providerIdToRemove && !provider?.hasOwnProperty('services');
            });

            providersBlockedAppointmentsCopy.splice(Number(providerWithoutWtId), 1);
            setProvidersBlockedAppointments(providersBlockedAppointmentsCopy);

            providersBlockedAppointmentsCopy.forEach((provider: any) => {
                if (provider.blockedWt.length > 0) {
                    provider.blockedWt.forEach((blocked: any) => {
                        updatedBlockedAppointments.push({
                            spId: provider._id,
                            fullname: provider.fullName,
                            blockedWt: [{
                                from: blocked.fromDate,
                                to: blocked.toDate,
                                cause: blocked.cause
                            }]
                        });
                    });
                } else {
                    updatedBlockedAppointments.push({
                        spId: provider._id,
                        fullname: provider.fullName,
                        blockedWt: []
                    });
                }
            });

            const providerUpdateResponse = await requestBuilder({
                method: 'post',
                endpoint: '/serviceProvider/update'
            });

            if (providerUpdateResponse.ok) {
                console.log('removed');
            }
        }
    }

    const removeBusinessBlockedHours = async (businessId: string, blockWorkTimeId: string) => {
        const businessBlockedAppointmentsCopy = [...businessBlockedAppointments];

        if (blockWorkTimeId) {
            // Remove the blocked hours anyway from local state
            const indexToRemove = businessBlockedAppointmentsCopy.findIndex((blockedAppointment: any) => blockedAppointment._id === blockWorkTimeId);
            businessBlockedAppointmentsCopy.splice(indexToRemove, 1);
            setBusinessBlockedAppointments(businessBlockedAppointmentsCopy);

            await requestBuilder({
                method: 'delete',
                endpoint: `/business/removeBlockWorkTime/${blockWorkTimeId}`
            });
        }
    }

    useEffect(() => {
        const initialServiceProviders = serviceProviderData
        if (initialServiceProviders) {
            serviceProviderData.forEach((provider: any) => {
                provider.selected = false;
            })

            setProviders([...initialServiceProviders])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getBusinessBlockingHours = async () => {
        return await requestBuilder({
            method: 'get',
            endpoint: '/business/getBlockWorkTime'
        });
    };

    useEffect(() => {
        getBusinessBlockingHours().then((response: any) => {
            if (response.ok) {
                setBusinessBlockedAppointments(response?.data?.res);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <BlockAppointmentsContainer>
        <ScreenWrapper>
            <form onSubmit={handleSubmit(obSubmit)}>
                <h1
                    style={{fontWeight: 'normal', fontSize: '2.4rem', marginTop: isSmallScreen ? '2rem' : '5rem'}}>
                    חסימת תורים
                </h1>
                <p>ברצוני לחסום את התורים עבור כל נותני השירות הבאים:</p>

                <Grid container style={{maxWidth: isSmallScreen ? '100%' : '50%', marginTop: '2rem'}}>
                    {serviceProviderData.length !== 1 && (
                        <Grid item>
                            <FormControlLabel
                                label="כל נותני השירות"
                                control={
                                    <MatCheckbox
                                        checked={allProviders}
                                        name="all_providers"
                                        inputRef={register}
                                        classes={{disabled: classes.disabled}}
                                        icon={<CheckboxCircle/>}
                                        checkedIcon={<CheckboxChecked/>}
                                        onChange={() => setAllProviders(!allProviders)}
                                    />
                                }/>
                        </Grid>
                    )}

                    {providers.map((serviceProvider: any, ind: number) => {
                        return (
                            <Grid item key={ind}>
                                <Checkbox
                                    name={serviceProvider._id}
                                    disabled={allProviders}
                                    value={serviceProvider.selected}
                                    label={serviceProvider.fullName}
                                    onChange={() => handleProvidersChange(ind)}
                                />
                            </Grid>
                        )
                    })}
                </Grid>

                <Grid container style={{marginTop: '2rem'}}>
                    <Grid item md={6} xs={12}>
                        <CauseField
                            name="cause"
                            register={register}
                            required
                            minLength={6}
                            control={control}
                            error={!!errors.cause}
                            helperText={errors.cause ? "יש להזין לפחות 6 תווים" :
                                <strong>הסיבה לא תוצג ללקוחות</strong>}
                            label="סיבת החסימה (לדוגמא: אירוע, חג וכו')"/>
                    </Grid>
                </Grid>

                <div>
                    <Grid
                        container
                        alignItems="center"
                        justify="flex-start"
                        style={{marginTop: isSmallScreen ? '2.5rem' : '4rem'}}>
                        <Grid item container alignItems="center" justify="flex-start" md={1} xs={2}>
                            <span style={{fontWeight: 'bold'}}>מיום</span>
                        </Grid>

                        <Grid item container alignItems="center" justify="flex-start" md={2} xs={4}>
                            <Controller
                                control={control}
                                name="fromDate"
                                render={({onChange, value}) => (
                                    <DatePicker
                                        label="התחלה"
                                        value={value}
                                        onChange={onChange}
                                        animateYearScrolling
                                        variant="inline"
                                        autoOk
                                        disablePast
                                        inputProps={{className: datepickerClasses.input}}
                                        PopoverProps={{
                                            classes: {
                                                paper: datepickerClasses.paper
                                            }
                                        }}
                                    />
                                )}
                            />

                        </Grid>

                        <Grid
                            item
                            container
                            alignItems="center"
                            justify="center"
                            md={1}
                            xs={2}>
                            <ToText style={{margin: isSmallScreen ? '0 1rem' : '0 2rem'}}>עד</ToText>
                        </Grid>

                        <Grid item container alignItems="center" justify="flex-start" md={2} xs={4}>
                            <Controller
                                control={control}
                                name="toDate"
                                render={({onChange, value}) => (
                                    <DatePicker
                                        label="סיום"
                                        value={value}
                                        onChange={onChange}
                                        animateYearScrolling
                                        variant="inline"
                                        autoOk
                                        disablePast
                                        inputProps={{className: datepickerClasses.input}}
                                        PopoverProps={{
                                            classes: {
                                                paper: datepickerClasses.paper
                                            }
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        alignItems="center"
                        justify="flex-start"
                        style={{marginTop: '4rem'}}>
                        <Grid item container alignItems="center" justify="flex-start" md={1} xs={2}>
                            <span style={{fontWeight: 'bold'}}>משעה</span>
                        </Grid>

                        <Grid item container alignItems="center" justify="flex-start" md={2} xs={4}>
                            <TimePickerSelector
                                time={startBlockHour}
                                onTimeChange={(hours: any) =>
                                    setStartBlockHour(`${hours.hour}:${hours.minute}`)
                                }
                            />
                        </Grid>

                        <Grid
                            item
                            container
                            alignItems="center"
                            justify="center"
                            md={1}
                            xs={2}>
                            <ToText>עד</ToText>
                        </Grid>

                        <Grid item container alignItems="center" justify="flex-start" md={2} xs={4}>
                            <TimePickerSelector
                                time={endBlockHour}
                                onTimeChange={(hours: any) => setEndBlockHour(`${hours.hour}:${hours.minute}`)}
                            />
                        </Grid>
                    </Grid>


                    <Grid container justify="center"
                          style={{
                              marginTop: isSmallScreen ? '3.5rem' : '6rem',
                              maxWidth: isSmallScreen ? '100%' : '50%'
                          }}>
                        <Grid item>
                            <BlockButton variant="contained" type="submit">הוסף חסימה</BlockButton>
                        </Grid>
                    </Grid>
                </div>
            </form>

            <Grid container justify="center" style={{maxWidth: isSmallScreen ? '100%' : '50%', marginTop: '2rem'}}>
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


            <div style={{marginBottom: '5rem'}}>
                {providersBlockedAppointments.map((serviceProvider: any, index: number) => {
                    return (
                        <Fragment key={index}>
                            {serviceProvider?.blockedWt?.map((blockedWt: any, index: number) => {
                                return (
                                    <BlockedAppointmentsCard key={index}>
                                        <Grid
                                            container
                                            justify="space-between"
                                            alignItems="center"
                                            direction="row"
                                            style={{
                                                minHeight: '10rem',
                                                padding: '2rem 3rem'
                                            }}>
                                            <Grid item md={6} xs={6}>
                                                <strong>חסימה עבור: </strong>
                                                <p style={{marginBottom: '1rem'}}>{serviceProvider.fullName}</p>

                                                <strong>סיבת החסימה: </strong>
                                                <p style={{marginBottom: '1rem'}}>{blockedWt.cause}</p>

                                                <strong>תורים חסומים החל מ-</strong>
                                                <p>{moment(blockedWt.fromDate).format('L')}</p>
                                                <p style={{marginBottom: '1rem'}}> בשעה{' '}{moment(blockedWt.fromDate).format('LT')}</p>

                                                <strong>ועד: </strong>
                                                <p>{moment(blockedWt.toDate).format('L')}</p>
                                                <p> בשעה{' '}{moment(blockedWt.toDate).format('LT')}</p>
                                            </Grid>


                                            <Grid item>
                                                <Grid container direction="column">
                                                    <IconButton
                                                        onClick={() => removeBlockedServiceProvider(serviceProvider._id, blockedWt._id)}>
                                                        <img src={cancelBlockingIcon} alt="ביטול חסימה"/>
                                                    </IconButton>
                                                    <span>ביטול חסימה</span>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </BlockedAppointmentsCard>
                                )
                            })}
                        </Fragment>
                    )
                })}

                {businessBlockedAppointments.map((businessBlockedAppointment: any, index: number) => {
                    console.log(businessBlockedAppointment);
                    return (
                        <BlockedAppointmentsCard key={index}>
                            <Grid
                                container
                                justify="space-between"
                                alignItems="center"
                                direction="row"
                                style={{
                                    minHeight: '10rem',
                                    padding: '2rem 3rem'
                                }}>
                                <Grid item md={6}>
                                    <strong>חסימה עבור:</strong>
                                    <p style={{marginBottom: '1rem'}}>כל נותני השירות בעסק</p>
                                    <strong>סיבת החסימה:</strong>
                                    <p style={{marginBottom: '1rem'}}>{businessBlockedAppointment.cause}</p>
                                    <strong>חסום החל מ:</strong>
                                    <p>{moment(businessBlockedAppointment.fromDate).format('L')}</p>
                                    <p style={{marginBottom: '1rem'}}> בשעה{' '}{moment(businessBlockedAppointment.fromDate).format('LT')}</p>

                                    <strong>ועד: </strong>
                                    <p>{moment(businessBlockedAppointment.toDate).format('L')}</p>
                                    <p> בשעה{' '}{moment(businessBlockedAppointment.toDate).format('LT')}</p>
                                </Grid>

                                <Grid item>
                                    <Grid container direction="column">
                                        <IconButton
                                            onClick={() => {
                                                removeBusinessBlockedHours(businessBlockedAppointment.businessId, businessBlockedAppointment._id);
                                            }}>
                                            <img src={cancelBlockingIcon} alt="ביטול חסימה"/>
                                        </IconButton>
                                        <span>ביטול חסימה</span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </BlockedAppointmentsCard>
                    )
                })}
            </div>

            {document.body.scrollHeight > 1000 && <FabStyle onClick={() => {
                scrollPosition > 500 || scrolledToBottom ? window.scrollTo(0, 0) : window.scrollTo(0, document.body.scrollHeight)
            }}>
                {scrollPosition > 500 || scrolledToBottom ? (<img src={arrowIcon} alt={"אייקון כיוון גלילה"}/>) : (
                    <img src={arrowIcon} alt="אייקון כיוון גלילה" style={{transform: 'rotate(180deg)'}}/>
                )}
            </FabStyle>}

            {!isSmallScreen && document.body.scrollHeight > 1000 && <span style={{
                position: 'fixed',
                left: '3rem',
                bottom: '3rem'
            }}>{scrollPosition > 500 || scrolledToBottom ? 'גלילה לחלקו העליון של העמוד' : 'גלילה לחלקו התחתון של העמוד'}</span>}
        </ScreenWrapper>
    </BlockAppointmentsContainer>
};

export default BlockAppointments;
