import React, {useEffect, useState} from "react";
import moment, {Moment} from "moment";
import {DatePicker} from "@material-ui/pickers";
import {
    useDatepickerStyles,
    AppointmentsLogContainer,
    LogWrapper,
    DaysContainer,
    DayColumn,
    EmptyCard,
    TableModesContainer,
    ViewButton,
    ViewOption
} from "./AppointmentsLogStyle";
import {useScreenSize, useScroll, useSmallScreen} from "../../../hooks/index";
import {FabStyle} from "../block-appointments/BlockAppointmentsStyle";
import arrowIcon from "../../../assets/icons/arrow_up.svg";
import tableIcon from "../../../assets/icons/table_icon.svg";
import columnIcon from "../../../assets/icons/column_icon.svg";
import {useRequestBuilder} from '../../../hooks';
import {LoadingAppointments} from "../../../animations";
import AppointmentItem from "./AppointmentItem";
import SubMenu from './SubMenu';

interface AppointmentsLogProps {
    initialServiceProviders: any;
}

export const AppointmentsLog = (props: AppointmentsLogProps) => {
    const [selectedDate, handleDateChange] = useState<Moment | Date | null>(new Date());
    const [appointments, setAppointments] = useState<any>([]);
    const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
    const [view, setView] = useState<'table' | 'column'>('table');
    const [weekDates, setWeekDates] = useState([]);
    const [loadingAppointments, setLoadingAppointments] = useState(false);

    const scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    const hebrewDays = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

    const requestBuilder = useRequestBuilder();
    const classes = useDatepickerStyles();
    const isSmallerThan1175px = useScreenSize(0, 1175);
    console.log({isSmallerThan1175px});
    const viewMode = isSmallerThan1175px ? 'column' : view;
    const isSmallScreen = useSmallScreen();
    const scrollPosition = useScroll();

    const getAllAppointments = async (fromDate: Moment, toDate: Moment, providerId?: string | null) => {
        setLoadingAppointments(true);
        const appointments = await requestBuilder({
            method: 'post',
            endpoint: '/appointments/get',
            payload: {
                spId: providerId || null,
                fromDate: fromDate.format('YYYY-MM-DD'),
                toDate: toDate.format('YYYY-MM-DD')
            },
            useLoader: false
        });

        if (appointments.ok) {
            setAppointments(appointments.data.res);
            setTimeout(() => {
                setLoadingAppointments(false);
            }, 800);
        }
    };


    // Get list of all dates for displaying them below the day name
    const getWeekDates = (fromDate: Moment, toDate: Moment) => {
        const datesArray: any = [];
        let currentDate = moment(fromDate);
        const stopDate = moment(toDate);
        while (currentDate <= stopDate) {
            datesArray.push(moment(currentDate).format('DD/MM'))
            currentDate = moment(currentDate).add(1, 'days');
        }

        return datesArray;
    }

    useEffect(() => {
        const fromDate = moment(selectedDate).startOf('week');
        const toDate = moment(selectedDate).endOf('week');

        if (viewMode === 'column') {
            getAllAppointments(moment(selectedDate), moment(selectedDate));
        } else {
            getAllAppointments(fromDate, toDate, selectedProviderId);
        }

        setWeekDates(getWeekDates(fromDate, toDate));
    }, [selectedProviderId, selectedDate, viewMode]);

    return (
        <AppointmentsLogContainer>
            <SubMenu
                initialServiceProviders={props.initialServiceProviders}
                selectedProviderId={selectedProviderId}
                setSelectedProviderId={setSelectedProviderId}
            />

            <DatePicker
                value={selectedDate}
                onChange={(e) => handleDateChange(moment(e))}
                animateYearScrolling
                variant="static"
                className={classes.staticWrapperRoot}
            />

            {!isSmallScreen && !isSmallerThan1175px && <TableModesContainer>
                <strong>שינוי תצוגת תורים</strong>
                <div style={{display: 'flex'}}>
                    <ViewOption>
                        <ViewButton onClick={() => setView('column')}>
                            <img
                                src={columnIcon}
                                alt="תצוגת עמודה"/>
                        </ViewButton>
                        <span style={{fontSize: '1.4rem'}}>יום</span>
                    </ViewOption>
                    <ViewOption>
                        <ViewButton onClick={() => setView('table')}>
                            <img
                                src={tableIcon}
                                alt="תצוגת טבלה"/>
                        </ViewButton>
                        <span style={{fontSize: '1.4rem'}}>טבלה</span>
                    </ViewOption>
                </div>
            </TableModesContainer>}

            <LogWrapper>
                {loadingAppointments ? <LoadingAppointments/> : (
                    <DaysContainer>
                        {appointments.map((dayInWeek: any, index: number) => {
                            return <DayColumn viewMode={viewMode} key={index}>
                                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                                    <strong>{viewMode ? moment(selectedDate).format('ddd') : hebrewDays[index]}</strong>
                                    <strong
                                        style={{display: 'block'}}>{viewMode ? moment(selectedDate).format('DD/MM') : weekDates[index]}</strong>
                                </div>

                                {dayInWeek.length > 0 ? dayInWeek.map((appointment: any) => {
                                    return (
                                        <AppointmentItem
                                            key={appointment._id}
                                            appointment={appointment}
                                            viewMode={viewMode}/>
                                    )
                                }) : <EmptyCard viewMode={viewMode}>לא נמצאו תורים ליום זה</EmptyCard>}
                            </DayColumn>
                        })}
                    </DaysContainer>
                )}
            </LogWrapper>

            {document.body.scrollHeight > 1000 && <FabStyle onClick={() => {
                scrollPosition > 500 || scrolledToBottom ? window.scrollTo(0, 0) : window.scrollTo(0, document.body.scrollHeight)
            }}>
                {scrollPosition > 500 || scrolledToBottom ? (<img src={arrowIcon} alt={"אייקון כיוון גלילה"}/>) : (
                    <img src={arrowIcon} alt="אייקון כיוון גלילה" style={{transform: 'rotate(180deg)'}}/>
                )}
            </FabStyle>}
        </AppointmentsLogContainer>
    );
};

export default AppointmentsLog;
