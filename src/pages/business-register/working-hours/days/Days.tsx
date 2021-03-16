import React from 'react';
import {Grid} from "@material-ui/core";
import {DayCheckbox} from "../WorkingHoursStyle";

interface DaysProps {
    checkedDay: any;
    handleChange: any;
    register?: any;
}

const Days = ({register, checkedDay, handleChange}: DaysProps) => {
    return (
        <Grid
            md={6}
            sm={6}
            container
            item
            direction="column"
            justify="center"
            alignItems="center"
            style={{margin: "0 auto"}}
        >
            <Grid
                item
                container
                justify="center"
                alignItems="center"
                direction="column"
                style={{marginBottom: "3rem"}}
            >
                <Grid item>נא לסמן את הימים בהם העסק עובד</Grid>
                <Grid item style={{maxWidth: "28rem"}}>
                    <DayCheckbox
                        value={checkedDay.sunday}
                        label="א"
                        labelPlacement="top"
                        name="sunday"
                        onChange={handleChange}
                    />
                    <DayCheckbox
                        value={checkedDay.monday}
                        label="ב"
                        labelPlacement="top"
                        name="monday"
                        register={register}
                        onChange={handleChange}
                    />
                    <DayCheckbox
                        value={checkedDay.tuesday}
                        label="ג"
                        labelPlacement="top"
                        name="tuesday"
                        register={register}
                        onChange={handleChange}
                    />
                    <DayCheckbox
                        value={checkedDay.wednesday}
                        label="ד"
                        labelPlacement="top"
                        name="wednesday"
                        register={register}
                        onChange={handleChange}
                    />
                    <DayCheckbox
                        value={checkedDay.thursday}
                        label="ה"
                        labelPlacement="top"
                        name="thursday"
                        register={register}
                        onChange={handleChange}
                    />
                    <DayCheckbox
                        value={checkedDay.friday}
                        label="ו"
                        labelPlacement="top"
                        name="friday"
                        register={register}
                        onChange={handleChange}
                    />
                    <DayCheckbox
                        value={checkedDay.saturday}
                        label="ש"
                        labelPlacement="top"
                        name="saturday"
                        register={register}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Days;