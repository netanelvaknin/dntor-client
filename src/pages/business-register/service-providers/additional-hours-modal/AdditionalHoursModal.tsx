import React from "react";
import {Dialog, Grid, IconButton, makeStyles,} from "@material-ui/core";
import closeIcon from "../../../../assets/icons/x_icon.svg";
import {AdditionalHoursModalProps} from "./AdditionalHoursModalInterface";
import {Transition} from "../ServiceProviders";
import Days from "../../working-hours/days/Days";
import Hours from "../../working-hours/hours/Hours";
import {useForm} from "react-hook-form";
import {Alert} from "@material-ui/lab";
import {ContinueButtonStyle} from "../../BusinessRegisterStyle";

const useDialogStyles = makeStyles({
    paper: {
        position: "relative",
        padding: "4rem 2rem 2rem",
        "@media (max-width: 767px)": {
            padding: "6rem 1rem 2rem",
        },
    },
});

export const AdditionalHoursModal = ({
                                         open,
                                         setOpen,
                                         checkedDay,
                                         handleChangeDay,
                                         disabledDays,
                                         hours,
                                         setHours,
                                         errors,
                                         onSave,
                                         handleClose
                                     }: AdditionalHoursModalProps) => {
    const classes = useDialogStyles();
    const {register} = useForm();

    return (
        <Dialog
            open={open}
            classes={{paper: classes.paper}}
            fullScreen
            TransitionComponent={Transition}
        >
            <IconButton
                onClick={handleClose}
                style={{position: "absolute", left: "1rem", top: "1rem"}}
            >
                <img src={closeIcon} alt="סגור חלון"/>
            </IconButton>
            <div>
                <Days
                    title="מהם ימי הפעילות של נותן השירות ?"
                    register={register}
                    checkedDay={checkedDay}
                    handleChange={handleChangeDay}
                    disabledDays={disabledDays}
                />

                <Hours
                    hours={hours}
                    setHours={setHours}
                />

                <Grid container style={{margin: "2rem 0 0"}}>
                    <Grid item md={12} xs={12}>
                        {errors.length > 0 && (
                            <Alert
                                style={{maxWidth: "28rem", margin: "0 auto"}}
                                severity="error"
                            >
                                <ul>
                                    {errors.map((error: string, i: number) => {
                                        return <li key={i}>{error}</li>
                                    })}
                                </ul>
                            </Alert>
                        )}
                    </Grid>
                </Grid>

                <Grid container justify="center" style={{margin: '2rem 0 4rem'}}>
                    <Grid item>
                        <ContinueButtonStyle onClick={onSave} variant="contained">שמירה</ContinueButtonStyle>
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    );
};

export default AdditionalHoursModal;
