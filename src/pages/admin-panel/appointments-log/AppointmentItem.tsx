import {ActionButton, AppointmentCard, HourText, PhoneNumber} from "./AppointmentsLogStyle";
import moment from "moment";
import {Fade, Grid} from "@material-ui/core";
import editIcon from "../../../assets/icons/edit_icon.svg";
import removeIcon from "../../../assets/icons/remove_icon.svg";

interface AppointmentItemProps {
    appointment: any;
    viewMode: 'table' | 'column';
}

const AppointmentItem = ({appointment, viewMode}: AppointmentItemProps) => {
    return (
        <Fade in timeout={1500}>
            <div>
                <AppointmentCard
                    viewMode={viewMode}
                    expandable
                    cardTitle={
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <HourText>{moment(appointment.from).format('HH:mm')}-{moment(appointment.to).format('HH:mm')}</HourText>
                            <span>{appointment.customerName}</span>
                        </div>
                    }>
                    <div style={{display: "flex", flexDirection: "column", width: '100%'}}>
                        <PhoneNumber href={`tel: ${appointment.customerPhone}`}>{appointment.customerPhone}</PhoneNumber>

                        <div>
                            <span style={{fontWeight: "bold"}}>שירות: </span>
                            <span>{appointment.serviceId.serviceName}</span>
                        </div>

                        <div>
                            <span style={{fontWeight: "bold"}}>נותנ\ת שירות: </span>
                            <span>{appointment.spId.fullName}</span>
                        </div>

                        {appointment.notes && <div>
                            <span style={{fontWeight: "bold"}}>הערות: </span>
                            <span>{appointment.notes}</span>
                        </div>}

                        <hr style={{margin: '2rem 0 1rem', border: '1px solid #D7D7D7'}}/>

                        <Grid container justify="space-between" style={{margin: '0 auto', maxWidth: '30rem'}}>
                            <Grid
                                item
                                container
                                direction="column"
                                md={6}
                                xs={6}
                                justify="center"
                                alignItems="center">
                                <ActionButton style={{background: '#265FB1'}}><img src={editIcon} alt="עריכה" /></ActionButton>
                                <span>עריכה</span>
                            </Grid>
                            <Grid
                                item
                                container
                                direction="column"
                                md={6}
                                xs={6}
                                justify="center"
                                alignItems="center">
                                <ActionButton style={{background: '#F97575'}}><img src={removeIcon} alt="מחיקה" /></ActionButton>
                                <span>ביטול</span>
                            </Grid>
                        </Grid>
                    </div>
                </AppointmentCard>
            </div>
        </Fade>
    )
}

export default AppointmentItem;