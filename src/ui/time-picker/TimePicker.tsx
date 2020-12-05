import { TimePicker as MuiTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Moment } from "moment";
import { useTimePickerStyles } from "./TimePickerStyle";

interface TimePickerProps {
  value: Moment | (() => MaterialUiPickersDate) | null;
  onChange: any;
}

export const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const classes = useTimePickerStyles();

  return (
    <MuiTimePicker
      value={value}
      inputVariant="outlined"
      okLabel="אישור"
      cancelLabel="ביטול"
      ampm={false}
      InputProps={{ className: classes.input }}
      onChange={onChange}
    />
  );
};

export default TimePicker;
