import { TimePicker as MuiTimePicker } from "@material-ui/pickers";
import { useTimePickerStyles } from "./TimePickerStyle";
import { useForm, Controller } from "react-hook-form";

interface TimePickerProps {
  name?: string;
  ampm?: boolean;
  register?:
    | ((instance: any) => void)
    | React.RefObject<any>
    | null
    | undefined;
  disableToolbar?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
}

export const TimePicker = ({
  name = "",
  className,
  ampm = false,
  register,
  disableToolbar = false,
  error,
  helperText,
}: TimePickerProps) => {
  const { control } = useForm();
  const classes = useTimePickerStyles();

  return (
    <Controller
      name="timePicker"
      control={control}
      defaultValue={new Date().setHours(24, 0, 0, 0)}
      render={({ onChange, value }) => (
        <MuiTimePicker
          value={value}
          inputVariant="outlined"
          okLabel="אישור"
          cancelLabel="ביטול"
          clearLabel="איפוס"
          clearable
          ampm={ampm}
          inputRef={register}
          disableToolbar={disableToolbar}
          InputProps={{ className: classes.input, name }}
          className={className}
          error={error}
          helperText={helperText}
          onChange={onChange}
        />
      )}
    />
  );
};

export default TimePicker;
