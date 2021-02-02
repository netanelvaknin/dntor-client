import {useState} from "react";
import {BlockAppointmentsContainer} from './BlockAppointmentsStyle';
import {Checkbox, TextField, TimePickerSelector, Button} from '../../../ui';
import {useForm} from 'react-hook-form';
import {Grid} from "@material-ui/core";
import {DatePicker} from "@material-ui/pickers";
import {ToText} from "../../business-register/working-hours/WorkingHoursStyle";
import moment, {Moment} from "moment";

export const BlockAppointments = () => {
    const {control} = useForm();
    const [selectedDate, handleDateChange] = useState<Moment | Date | null>(new Date());

    return <BlockAppointmentsContainer>
        <h1>חסימת תורים</h1>
        <p>חסימת תורים לנותני השירות הבאים:</p>
        <div>
            <Checkbox name="everyone" value={true} label="לכל נותני השירות"/>
            <Checkbox name="everyone" value={true} label="דניאל"/>
            <Checkbox name="everyone" value={true} label="יוסי"/>
            <Checkbox name="everyone" value={true} label="אלי"/>
        </div>

        <TextField name="cause" control={control} label="סיבת החסימה"/>
        <div>
            <Grid
                container
                alignItems="center"
                justify="flex-start">
                <Grid item>
                    <DatePicker
                        label="תאריך תחילת החסימה"
                        value={selectedDate}
                        onChange={(e) => handleDateChange(moment(e))}
                        animateYearScrolling
                        variant="inline"
                        autoOk
                        disablePast
                        // className={classes.staticWrapperRoot}
                    />
                </Grid>

                <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    md={2}
                    xs={3}>
                    <ToText>עד</ToText>
                </Grid>

                <Grid item>
                    <DatePicker
                        label="תאריך סיום החסימה"
                        value={selectedDate}
                        onChange={(e) => handleDateChange(moment(e))}
                        animateYearScrolling
                        variant="inline"
                        autoOk
                        disablePast
                        // className={classes.staticWrapperRoot}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                alignItems="center"
                justify="flex-start"
                style={{maxWidth: '32rem'}}
            >
                <Grid item container alignItems="center" justify="center" md={5} xs={4}>
                    <TimePickerSelector
                        time={"00:00"}
                        onTimeChange={() => null}
                    />
                </Grid>

                <Grid item container alignItems="center" justify="center" md={2} xs={3}>
                    <ToText>עד</ToText>
                </Grid>

                <Grid item container alignItems="center" justify="center" md={5} xs={4}>
                    <TimePickerSelector
                        time={"00:00"}
                        onTimeChange={() => null}
                    />
                </Grid>
            </Grid>


            <Grid container>
                <Grid item>
                    <Button variant="contained">הוסף חסימה</Button>
                </Grid>
            </Grid>
        </div>
    </BlockAppointmentsContainer>;
};

export default BlockAppointments;
