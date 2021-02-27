import React, {useEffect, useState} from "react";
import moment, {Moment} from "moment";
import {DatePicker} from "@material-ui/pickers";
import {
    useDatepickerStyles,
    AppointmentsLogContainer,
    LogWrapper,
    DaysContainer,
    DayColumn,
    HourText,
    SubMenu,
    AppointmentCard
} from "./AppointmentsLogStyle";
import {useScreenSize, useScroll} from "../../../hooks/index";
import {FabStyle} from "../block-appointments/BlockAppointmentsStyle";
import arrowIcon from "../../../assets/icons/arrow_up.svg";
import {useRequestBuilder} from '../../../hooks';

export const AppointmentsLog = () => {
    const [selectedDate, handleDateChange] = useState<Moment | Date | null>(new Date());
    const [appointments, setAppointments] = useState([]);
    const [weekDates, setWeekDates] = useState([]);

    const scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    const hebrewDays = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

    const requestBuilder = useRequestBuilder();
    const classes = useDatepickerStyles();
    const isSmallTableMode = useScreenSize(0, 1175);
    const scrollPosition = useScroll();

    const getAllAppointments = async (fromDate: Moment, toDate: Moment) => {
        const appointments = await requestBuilder({
            method: 'post',
            endpoint: '/appointments/get',
            payload: {
                fromDate: fromDate.format('YYYY-MM-DD'),
                toDate: toDate.format('YYYY-MM-DD')
            },
            useLoader: false
        });

        if (appointments.ok) {
            setAppointments(appointments.data.res);
        }
    };

    // Get list of all dates for displaying them below the day name
    const getWeekDates = (fromDate: Moment, toDate: Moment) => {
        const dateArray: any = [];
        let currentDate = moment(fromDate);
        const stopDate = moment(toDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('DD/MM'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    useEffect(() => {
        const fromDate = moment(selectedDate).startOf('week');
        const toDate = moment(selectedDate).endOf('week');
        getAllAppointments(fromDate, toDate);
        setWeekDates(getWeekDates(fromDate, toDate));
    }, [selectedDate]);

    return (
        <AppointmentsLogContainer>
            <SubMenu></SubMenu>
            <DatePicker
                value={selectedDate}
                onChange={(e) => handleDateChange(moment(e))}
                animateYearScrolling
                variant="static"
                className={classes.staticWrapperRoot}
            />

            <LogWrapper>
                {isSmallTableMode ? (<></>) : (
                    <DaysContainer>
                        {appointments.map((dayInWeek: any, index: number) => {
                            return <DayColumn key={index}>
                                <strong>{hebrewDays[index]}</strong>
                                <strong style={{display: 'block'}}>{weekDates[index]}</strong>
                                {dayInWeek.length > 0 ? dayInWeek.map((appointment: any) => {
                                    return (
                                        <AppointmentCard
                                            key={appointment._id}
                                            scrollPosition={scrollPosition}
                                            expandable
                                            cardTitle={
                                                <div style={{display: "flex", flexDirection: "column"}}>
                                                    <HourText>08:00-09:00</HourText>
                                                    <span>{appointment.customerName}</span>
                                                </div>
                                            }>
                                            <div style={{display: "flex", flexDirection: "column"}}>
                                                <span>{appointment.customerPhone}</span>
                                                <div>
                                                    <span style={{fontWeight: "bold"}}>שירות: </span>
                                                    <span>תספורת גברים מיוחדת מאוד מאוד מאוד</span>
                                                </div>

                                                {appointment.notes && <div>
                                                    <span style={{fontWeight: "bold"}}>הערות: </span>
                                                    <span>{appointment.notes}</span>
                                                </div>}
                                            </div>
                                        </AppointmentCard>
                                    )
                                }) : <p>אין תורים ליום זה</p>}
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
