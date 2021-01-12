import { useState } from "react";
import moment, { Moment } from "moment";
import { DatePicker } from "@material-ui/pickers";
import { useDatepickerStyles } from "./AppointmentsLogStyle";

export const AppointmentsLog = () => {
  const [selectedDate, handleDateChange] = useState<Moment | Date | null>(
    new Date()
  );
  const classes = useDatepickerStyles();

  return (
    <DatePicker
      value={selectedDate}
      onChange={(e) => handleDateChange(moment(e))}
      animateYearScrolling
      variant="static"
      className={classes.staticWrapperRoot}
    />
  );
};

export default AppointmentsLog;
