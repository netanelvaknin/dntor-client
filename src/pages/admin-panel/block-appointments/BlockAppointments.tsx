import {useState, useEffect, Fragment} from "react";
import {
    BlockAppointmentsContainer,
    BlockButton,
    CauseField,
    BlockedAppointmentsCard,
    ScreenWrapper,
    useDatepickerStyles
} from './BlockAppointmentsStyle';
import {TimePickerSelector} from '../../../ui';
import {Controller, useForm} from 'react-hook-form';
import {Checkbox, FormControlLabel, Grid, IconButton} from "@material-ui/core";
import {DatePicker} from "@material-ui/pickers";
import {ToText} from "../../business-register/working-hours/WorkingHoursStyle";
import {ReactComponent as CheckboxCircle} from "../../../assets/icons/checkbox_circle.svg";
import {ReactComponent as CheckboxChecked} from "../../../assets/icons/checkbox_checked.svg";
import {useCheckboxStyles} from "../../../ui/checkbox/CheckboxStyle";
import useFetch from 'use-http';
import moment from 'moment';
import cancelBlockingIcon from '../../../assets/icons/cancel_blocking.svg';
import {useSmallScreen} from "../../../hooks";

interface BlockAppointmentsProps {
    serviceProviderData?: any;
}

export const BlockAppointments = ({serviceProviderData}: BlockAppointmentsProps) => {
    const [businessBlockedAppointments, setBusinessBlockedAppointments] = useState<any>([]);
    const [providersBlockedAppointments, setProvidersBlockedAppointments] = useState<any>([]);
    const [startBlockHour, setStartBlockHour] = useState(moment().format('08:00'));
    const [endBlockHour, setEndBlockHour] = useState('18:00');
    const {post, get, response} = useFetch();
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


    const obSubmit = async (values: any) => {
        // Append hours to the start & end date
        const fromDate = moment(values.fromDate);
        const toDate = moment(values.toDate);

        const hoursStartBlock = startBlockHour.split(':')[0];
        const minutesStartBlock = startBlockHour.split(':')[1];

        const hoursEndBlock = endBlockHour.split(':')[0];
        const minutesEndBlock = endBlockHour.split(':')[1];

        fromDate.set('hour', Number(hoursStartBlock));
        fromDate.set('minute', Number(minutesStartBlock));

        toDate.set('hour', Number(hoursEndBlock));
        toDate.set('minute', Number(minutesEndBlock));

        const now = moment();

        if (fromDate.isAfter(now) && toDate.isAfter(now) && toDate.isAfter(fromDate)) {
            const providersIds = serviceProviderData.map((serviceProvider: any) => {
                return serviceProvider._id;
            });

            // Check if at least one provider selected
            const selectedProviders: object[] = [];
            Object.entries(values).forEach(([key, value]) => {
                if ((providersIds.includes(key) && value) || (key === 'all_providers' && value)) {
                    selectedProviders.push({id: key, value});
                }
            });

            const allProvidersSelected = selectedProviders.find((provider: any) => {
                return provider.id === 'all_providers';
            })

            // Group data and send
            const data = {
                fromDate,
                toDate,
                cause: values.cause
            }

            if (selectedProviders.length > 0) {
                if (allProvidersSelected) {
                    await post('/business/insertBlockWorkTime', data);
                    setBusinessBlockedAppointments([...businessBlockedAppointments, data]);
                } else {
                    const providersIds: any = [];
                    selectedProviders.forEach((provider: any) => {
                        providersIds.push(provider.id);
                    })

                    const updatedData: any = [];
                    providersIds.forEach((id: string) => {

                        const providerAlreadyHasBlockedApp = providersBlockedAppointments.find((providerBlocked: any) => {
                            return providerBlocked._id === id;
                        });

                        if (providerAlreadyHasBlockedApp) {
                            return providersBlockedAppointments.forEach((provider: any) => {
                                if (provider._id === id) {
                                    // Format the data that I get from the server because
                                    // The keys is different from the keys that I should send
                                    const blockedWt = provider.blockedWt.map((blockedWt: any) => {
                                        return {
                                            cause: blockedWt.cause,
                                            from: blockedWt.fromDate,
                                            to: blockedWt.toDate
                                        }
                                    });

                                    updatedData.push({
                                        spId: id,
                                        blockedWt: [...blockedWt, {
                                            from: fromDate,
                                            to: toDate,
                                            cause: values.cause
                                        }]
                                    });
                                }
                            })
                        } else {
                            updatedData.push({
                                spId: id,
                                blockedWt: [{
                                    from: fromDate,
                                    to: toDate,
                                    cause: values.cause
                                }]
                            });
                        }

                    });

                    const formattedCurrentData: any = [];
                    providersBlockedAppointments.forEach((provider: any) => {
                        provider.blockedWt.map((blockedWt: any) => {
                            formattedCurrentData.push({
                                spId: provider._id,
                                blockedWt: [{
                                    cause: blockedWt.cause,
                                    from: blockedWt.fromDate,
                                    to: blockedWt.toDate
                                }]
                            })
                        });
                    });

                    await post('/serviceProvider/update', [...formattedCurrentData, ...updatedData]);

                    const formattedUpdatedData: any = [];
                    updatedData.forEach((obj: any) => {
                        obj.blockedWt.map((blockedWt: any) => {
                            formattedUpdatedData.push({
                                _id: obj.spId,
                                blockedWt: [{
                                    fromDate: blockedWt.from,
                                    toDate: blockedWt.to,
                                    cause: blockedWt.cause
                                }]
                            })
                        });
                    });

                    const finalProviders: any = [];
                    formattedUpdatedData.forEach((obj: any) => {
                        providersBlockedAppointments.map((provider: any) => {
                            if (provider._id === obj._id) {
                                finalProviders.push({
                                    fullName: provider.fullName,
                                    ...obj
                                })
                            }
                        })
                    });

                    setProvidersBlockedAppointments([...providersBlockedAppointments, ...finalProviders]);
                }

                if (response.ok) {
                    console.log('great!');
                }

                reset({
                    cause: '',
                    fromDate: new Date(),
                    toDate: new Date()
                });


                setAllProviders(false);
                setStartBlockHour('00:00');
                setEndBlockHour('00:00');
            } else {
                console.log('יש לבחור לפחות נותן שירות שירות אחד')
            }
        } else {
            console.log('יש לוודא שהשעות והתאריכים שנבחרו הם הגיוניים. אין לבחור תאריכים ושעות שעברו כבר.')
        }
    };

    const removeBlockedServiceProvider = (blockedWdIdToRemove: any) => {
        // console.log(id);
        // const formattedData: any = [];
        // providersBlockedAppointments.forEach((provider: any) => {
        //     provider.blockedWt.map((blockedWt: any) => {
        //         formattedData.push({
        //             spId: provider._id,
        //             fullName: provider.fullName,
        //             blockedWt: [{
        //                 from: blockedWt.fromDate,
        //                 to: blockedWt.toDate,
        //                 cause: blockedWt.cause
        //             }]
        //         });
        //     });
        // });

        // console.log(formattedData);

    }

    useEffect(() => {
        setProvidersBlockedAppointments([...serviceProviderData]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const getBusinessBlockingHours = async () => {
            const data = await get('/business/getBlockWorkTime');

            if (response.ok) {
                setBusinessBlockedAppointments(data.res);
            }
        };

        getBusinessBlockingHours();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <BlockAppointmentsContainer>
        <ScreenWrapper>
            <form onSubmit={handleSubmit(obSubmit)}>
                <h1 style={{fontWeight: 'normal', fontSize: '2.4rem', marginTop: '5rem'}}>חסימת תורים</h1>
                <p>ברצוני לחסום את התורים עבור כל נותני השירות הבאים:</p>

                <Grid container style={{maxWidth: isSmallScreen ? '100%' : '50%', marginTop: '2rem'}}>
                    {serviceProviderData.length !== 1 && (
                        <Grid item>
                            <FormControlLabel
                                label="כל נותני השירות"
                                control={
                                    <Checkbox
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


                    {serviceProviderData.map((serviceProvider: any, ind: number) => {
                        return (
                            <Grid item key={ind}>
                                <FormControlLabel
                                    label={serviceProvider.fullName}
                                    name={serviceProvider._id}
                                    inputRef={register}
                                    classes={{disabled: classes.disabled}}
                                    disabled={allProviders}
                                    control={
                                        <Checkbox
                                            icon={<CheckboxCircle/>}
                                            checkedIcon={<CheckboxChecked/>}
                                        />
                                    }
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
                            minLength={3}
                            control={control}
                            error={!!errors.cause}
                            helperText={errors.cause ? "יש למלא סיבה כלשהי" : <strong>הסיבה לא תוצג ללקוחות</strong>}
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
                          style={{marginTop: isSmallScreen ? '3.5rem' : '6rem', maxWidth: isSmallScreen ? '100%' : '50%'}}>
                        <Grid item>
                            <BlockButton variant="contained" type="submit">הוסף חסימה</BlockButton>
                        </Grid>
                    </Grid>
                </div>
            </form>


            <div style={{marginBottom: '5rem'}}>
                <h1 style={{fontWeight: 'normal', fontSize: '2.4rem', marginTop: '4rem'}}>תורים חסומים:</h1>
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
                                            direction={isSmallScreen ? 'column' : 'row'}
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
                                                <p style={{marginBottom: '1rem'}}>{moment(blockedWt.fromDate).format('L')}</p>

                                                <strong>ועד: </strong>
                                                <p>{moment(blockedWt.toDate).format('L')}</p>
                                            </Grid>

                                            <Grid item>
                                                <Grid container direction="column">
                                                    <IconButton onClick={() => removeBlockedServiceProvider(blockedWt._id)}>
                                                        <img src={cancelBlockingIcon} alt="ביטול חסימה"/>
                                                    </IconButton>
                                                    <span style={{maxWidth: '12rem', textAlign: 'center'}}>ביטול חסימה עבור {serviceProvider.fullName}</span>
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
                    return (
                        <BlockedAppointmentsCard key={index}>
                            <Grid
                                container
                                justify="space-between"
                                alignItems="center"
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
                                    <p style={{marginBottom: '1rem'}}>{moment(businessBlockedAppointment.fromDate).format('L')}</p>
                                    <strong>ועד: </strong>
                                    <p>{moment(businessBlockedAppointment.toDate).format('L')}</p>
                                </Grid>

                                <Grid item>
                                    <Grid container direction="column">
                                        <IconButton>
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
        </ScreenWrapper>
    </BlockAppointmentsContainer>
};

export default BlockAppointments;
