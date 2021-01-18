import { useState } from "react";
import { TimePicker as MuiTimePicker } from "@material-ui/pickers";
import { useTimePickerStyles, TimePickerStyle } from "./TimePickerStyle";
import { useForm, Controller } from "react-hook-form";
import TimePickerToolbar from "./time-picker-toolbar/TimePickerToolbar";
// @ts-ignore
import TimePicker from "react-times";
import "react-times/css/classic/default.css";
import "react-times/css/material/default.css";

interface TimePickerProps {
  variant?: "dropdown" | "modal";
  time?: any;
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
  onTimeChange?: any;
}

export const TimePickerSelector = ({
  variant = "dropdown",
  time,
  name = "",
  className,
  autoOk = true,
  register,
  disableToolbar = false,
  error,
  helperText,
  defaultValue,
  onTimeChange,
}: TimePickerProps) => {
  const [ampm, setAmpm] = useState(true);
  const { control } = useForm();
  const classes = useTimePickerStyles();

  const renderTimePicker = () => {
    if (variant === "dropdown") {
      return (
        <TimePickerStyle>
          <TimePicker
            time={time}
            onTimeChange={onTimeChange}
            theme="classic"
            timeConfig={{
              step: 15,
              unit: "minutes",
            }}
          />
        </TimePickerStyle>
      );
    } else {
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
    }
  };
  return <>{renderTimePicker()}</>;
};

export default TimePickerSelector;
