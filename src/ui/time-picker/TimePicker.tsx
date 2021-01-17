import { useState } from "react";
import { TimePicker as MuiTimePicker } from "@material-ui/pickers";
import { useTimePickerStyles } from "./TimePickerStyle";
import { useForm, Controller } from "react-hook-form";
import TimePickerToolbar from "./time-picker-toolbar/TimePickerToolbar";

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
  autoOk = true,
  register,
  disableToolbar = false,
  error,
  helperText,
  defaultValue,
}: TimePickerProps) => {
  const [ampm, setAmpm] = useState(true);
  const { control } = useForm();
  const classes = useTimePickerStyles();

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
          clearable={false}
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
          ToolbarComponent={(props) => (
            <TimePickerToolbar {...props} setAmpm={setAmpm} />
          )}
        />
      )}
    />
  );
};

export default TimePicker;
