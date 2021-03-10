import {Dialog, makeStyles} from '@material-ui/core';
import {useRequestBuilder} from '../../../hooks';
import {DecisionButton} from './AppointmentsLogStyle';

const useDialogStyles = makeStyles({
    paper: {
        padding: '3rem',
        textAlign: 'center'
    }
});

interface RemovingConfirmationProps {
    appointments: any;
    setAppointments: any;
    removingDialogOpen: boolean;
    setRemovingDialogOpen: (open: boolean) => void;
    appointmentToRemove: string;
    setAppointmentToRemove: (id: string) => void;
}

const RemovingConfirmation = (props: RemovingConfirmationProps) => {
    const classes = useDialogStyles();
    const requestBuilder = useRequestBuilder();

    const handleRemoveAppointment = async (id: string) => {
        props.setAppointmentToRemove('');
        props.setRemovingDialogOpen(false);

        // Remove from server
        await requestBuilder({
            method: 'delete',
            endpoint: `/appointments/cancel/${id}`,
            useLoader: false
        });

        // Remove locally
        const appointmentsCopy = [...props.appointments];
        appointmentsCopy.forEach((week: any, index: number) => {
            if (week.length > 0) {
                const indexToRemove = week.findIndex((appointment: any) => appointment._id === id);
                week.splice(indexToRemove, 1);
            }
        });

        props.setAppointments(appointmentsCopy);
    }

    return (
        <Dialog
            open={props.removingDialogOpen}
            classes={{paper: classes.paper}}>
            <h1>בחרת למחוק את התור</h1>
            <p>האם את\ה בטוח\ה ?</p>
            <div style={{display: 'flex'}}>
                <DecisionButton variant="contained" onClick={() => handleRemoveAppointment(props.appointmentToRemove)}>כן</DecisionButton>
                <DecisionButton variant="outlined" onClick={() => props.setRemovingDialogOpen(false)}>לא</DecisionButton>
            </div>
        </Dialog>
    )
};

export default RemovingConfirmation;