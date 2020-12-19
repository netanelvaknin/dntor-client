import {
  TimePicker as MuiTimePicker,
  BaseTimePickerProps,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Moment } from "moment";
import { useTimePickerStyles } from "./TimePickerStyle";

interface TimePickerProps {
  value: Moment | (() => MaterialUiPickersDate) | null | Date;
  ampm?: boolean;
  disableToolbar?: boolean;
  className?: string;
  onChange: (date: MaterialUiPickersDate) => void;
}

export const TimePicker = ({
  value,
  className,
  ampm = false,
  disableToolbar = false,
  onChange,
}: TimePickerProps) => {
  const classes = useTimePickerStyles();

  return (
    <MuiTimePicker
      value={value}
      inputVariant="outlined"
      okLabel="אישור"
      cancelLabel="ביטול"
      clearLabel="איפוס"
      clearable
      ampm={ampm}
      disableToolbar={disableToolbar}
      InputProps={{ className: classes.input }}
      className={className}
      onChange={onChange}
    />
  );
};

export default TimePicker;
