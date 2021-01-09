import { useEffect } from "react";
import { TimePicker as MuiTimePicker } from "@material-ui/pickers";
import { useTimePickerStyles } from "./TimePickerStyle";
import { useForm, Controller } from "react-hook-form";
interface TimePickerProps {
  name?: string;
  ampm?: boolean;
  autoOk?: boolean;
  register?:
    | ((instance: any) => void)
    | React.RefObject<any>
    | null
    | undefined;
  disableToolbar?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
  defaultValue?: number;
}

export const TimePicker = ({
  name = "",
  className,
  ampm = true,
  autoOk = true,
  register,
  disableToolbar = false,
  error,
  helperText,
  defaultValue,
}: TimePickerProps) => {
  const { control } = useForm();
  const classes = useTimePickerStyles();

  useEffect(() => {
    const AMButton = document.querySelectorAll(
      ".MuiPickersTimePickerToolbar-ampmSelection .MuiButton-label h6"
    )[0];
    const PMButton = document.querySelectorAll(
      ".MuiPickersTimePickerToolbar-ampmSelection .MuiButton-label h6"
    )[1];

    if (AMButton && PMButton) {
      AMButton.innerHTML = "בבוקר";
      PMButton.innerHTML = "אחר הצהריים";
    }
  });

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || new Date().setHours(24, 0, 0, 0)}
      render={({ onChange, value }) => (
        <MuiTimePicker
          value={value}
          inputVariant="outlined"
          okLabel="אישור"
          cancelLabel="ביטול"
          clearLabel="איפוס"
          clearable
          ampm={ampm}
          autoOk={autoOk}
          format="HH:mm"
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
