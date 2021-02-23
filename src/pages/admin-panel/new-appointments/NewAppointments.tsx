import {useEffect, useState, useContext, ChangeEvent} from "react";
import {NewAppointmentsContainer} from './NewAppointmentsStyle';
import {DatePicker} from "@material-ui/pickers";
import {FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select} from '@material-ui/core';
import moment, {Moment} from "moment";
import {TextField} from '../../../ui';
import {useForm} from 'react-hook-form';
import {CalculatingHours, NewAppointment as NewAppointmentAnimation, Dollars} from "../../../animations";
import {useRequestBuilder, useSmallScreen} from "../../../hooks";
import RootContext from '../../../context/root/rootContext';
import {phoneNumberPattern} from "../../../utils/patterns";
import {Alert} from "@material-ui/lab";

interface NewAppointmentsProps {
    initialServiceProviders: any;
    adminPanelState: any;
}

export const NewAppointments = ({initialServiceProviders, adminPanelState}: NewAppointmentsProps) => {
    const [businessServices, setBusinessServices] = useState([]);
    const [businessServiceProviders, setBusinessServiceProviders] = useState([]);

    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState<Moment | Date | null>(new Date());
    const [selectedService, setSelectedService] = useState<any>('');
    const [selectedProvider, setSelectedProvider] = useState<any>('');
    const [appointmentTime, setAppointmentTime] = useState<any>('');

    const businessId = initialServiceProviders[0]?.businessId;

    const {register, handleSubmit, control, errors} = useForm({
        defaultValues: {
            customer_name: '',
            customer_phone: '',
            additional_notes: ''
        }
    });

    const rootState = useContext(RootContext);
    const requestBuilder = useRequestBuilder();
    const isSmallScreen = useSmallScreen();

    const handleDateChange = (date: Moment | Date | null) => {
        if (selectedService && selectedProvider) {
            setSelectedProvider('');
            setAppointmentTime('');
            setSelectedService('');
            setAvailableTimes([]);
            rootState?.setError('');
        }

        setSelectedDate(date);
    }


    const handleServiceChange = (event: ChangeEvent<{ value: unknown; }>) => {
        if (selectedService && selectedProvider) {
            setSelectedProvider('');
            setAppointmentTime('');
            rootState?.setError('');
        }

        setSelectedService(event.target.value);
    };

    const handleTimeChange = (event: ChangeEvent<{ value: unknown; }>) => {
        setAppointmentTime(event.target.value);
    };

    const handleProviderChange = (event: ChangeEvent<{ value: unknown; }>) => {
        setSelectedProvider(event.target.value);
    };

    const onSubmit = async ({additional_notes, customer_name, customer_phone}: any) => {
        const dateTime = `${moment(selectedDate).format("YYYY-MM-DD")}T${appointmentTime}:00`;

        const insertInternalResponse = await requestBuilder({
            method: 'post',
            endpoint: '/appointments/insertInternal',
            payload: {
                spId: selectedProvider,
                serviceId: selectedService,
                dateTime,
                customerName: customer_name,
                customerPhone: customer_phone,
                notes: additional_notes
            },
            loader: <Dollars/>,
            loaderTitle: 'קובעים עוד תור... איזה כיף!',
            loaderTimeout: 5000
        });

        if (insertInternalResponse.ok) {
            adminPanelState?.setActiveNavItem('יומן תורים');
        }
    };

    const fetchAvailableTimes = async (date: Moment | Date, spId: string, serviceId: string, businessId: string) => {
        return await requestBuilder({
            method: 'post',
            endpoint: '/appointments/getAvailableTimes',
            payload: {
                spId,
                serviceId,
                date: moment(date).format('YYYY-MM-DD'),
                businessId
            },
            loader: <CalculatingHours/>,
            loaderTitle: 'מחפשים שעות פנויות עבור התור שחיפשת',
            loaderTimeout: 3000
        });
    };

    const fetchBusinessServices = async () => {
        return await requestBuilder({
            method: 'get',
            endpoint: '/business/services',
            useLoader: false
        });
    };

    useEffect(() => {
        // loop through all services and check if the selected provider have the selected service
        if (initialServiceProviders && selectedService) {
            const serviceProviders: any = [];

            initialServiceProviders.forEach((provider: any) => {
                provider.services.forEach((service: any) => {
                    if (service.serviceId === selectedService) {
                        serviceProviders.push(provider);
                    }
                });
            });

            setBusinessServiceProviders(serviceProviders);
        }
    }, [selectedService, selectedProvider, initialServiceProviders]);

    useEffect(() => {
        fetchBusinessServices().then((response: any) => {
            setBusinessServices(response?.data?.res?.services);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedDate && selectedService && selectedProvider) {
            fetchAvailableTimes(selectedDate, selectedProvider, selectedService, businessId).then((response: any) => {
                const availableHours = response?.data?.res.map((availableHours: any) => {
                    return moment(availableHours.from).format("HH:mm");
                });

                if (availableHours.length > 0) {
                    setAvailableTimes(availableHours);
                    rootState?.setError('');
                } else {
                    rootState?.setError('אין תורים פנויים עבור המידע שהזנת');
                }

            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate, selectedService, selectedProvider]);

    return (
        <NewAppointmentsContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container justify="space-between" alignItems="flex-start" direction="column" style={{
                    maxWidth: '40rem',
                    padding: '3rem',
                    margin: '17rem 5rem 5rem'
                }}>
                    <Grid item>
                        <h1>קביעת תור</h1>
                    </Grid>

                    <Grid item>
                        <DatePicker
                            label="תאריך"
                            value={selectedDate}
                            onChange={(e) => handleDateChange(moment(e))}
                            animateYearScrolling
                            variant="inline"
                            autoOk
                            disablePast
                            required
                        />
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <InputLabel shrink id="service">
                                שירות *
                            </InputLabel>
                            <Select
                                required
                                labelId="service"
                                value={selectedService}
                                onChange={handleServiceChange}>
                                {businessServices.map((service: any) => {
                                    return <MenuItem value={service._id}
                                                     key={service._id}>{service.serviceName}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl disabled={!selectedService}>
                            <InputLabel shrink id="service-provider">
                                נותן שירות *
                            </InputLabel>
                            <Select
                                required
                                labelId="service-provider"
                                value={selectedProvider}
                                onChange={handleProviderChange}
                            >
                                {businessServiceProviders?.map((provider: any) => {
                                    return (
                                        <MenuItem
                                            key={provider._id}
                                            value={provider._id}>
                                            {provider.fullName}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>אנחנו מציגים לך רק את נותני השירות המתאימים לשירות שבחרת</FormHelperText>
                        </FormControl>
                    </Grid>

                    {selectedDate && selectedService && selectedProvider && availableTimes.length > 0 && (
                        <>
                            <Grid item style={{marginTop: '2rem'}}>
                                <FormControl>
                                    <InputLabel shrink id="hour">
                                        שעה *
                                    </InputLabel>
                                    <Select
                                        required
                                        labelId="hour"
                                        value={appointmentTime}
                                        onChange={handleTimeChange}>
                                        {availableTimes?.map((availableTime: string) => {
                                            return (
                                                <MenuItem key={availableTime}
                                                          value={availableTime}>{availableTime}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                    <FormHelperText>אנחנו מציגים אך ורק שעות שבהן נותן השירות הנבחר <span
                                        style={{color: 'blue', fontWeight: 'bold'}}>יכול</span> לעבוד
                                        בהן</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <TextField
                                    required
                                    label="שם הלקוח *"
                                    name="customer_name"
                                    minLength={2}
                                    register={register}
                                    error={!!errors.customer_name}
                                    helperText={errors.customer_name && 'השם חייב להכיל לפחות 2 תווים'}
                                    control={control}/>
                            </Grid>

                            <Grid item>
                                <TextField
                                    required
                                    type="number"
                                    pattern={phoneNumberPattern}
                                    label="מספר טלפון *"
                                    name="customer_phone"
                                    register={register}
                                    error={!!errors.customer_phone}
                                    helperText={errors.customer_phone && "טלפון לא תקין"}
                                    control={control}/>
                            </Grid>

                            <Grid item>
                                <TextField
                                    helperText="מומלץ לשאול את הלקוח האם יש דברים נוספים שצריך לדעת עליו לפני התור כמו למשל דברים רפואיים וכו'"
                                    label="הערות (לא חובה למלא)"
                                    name="additional_notes"
                                    register={register}
                                    control={control}/>
                            </Grid>

                            <Grid item>
                                <button>קביעת תור</button>
                            </Grid>
                        </>
                    )}

                    <Grid container style={{margin: "0rem 0 2rem"}}>
                        <Grid item md={12} xs={12}>
                            {rootState?.error && (
                                <Alert severity="error">
                                    {rootState?.error}
                                </Alert>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </form>

            {!isSmallScreen && <NewAppointmentAnimation/>}
        </NewAppointmentsContainer>
    );
};

export default NewAppointments;
