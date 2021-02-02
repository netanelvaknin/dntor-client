import { TextField as MuiTextField } from "@material-ui/core";
import { useTextFieldStyles } from "./TextFieldStyle";
import { Controller } from "react-hook-form";

interface TextFieldProps {
  name?: string;
  type?: "text" | "email" | "password" | "number";
  label?: string;
  error?: boolean;
  helperText?: React.ReactNode;
  startAdornment?: React.ReactNode;
  register?: any;
  inputRef?: any;
  placeholder?: string;
  className?: string;
  control?: any;
  required?: boolean;
  pattern?: any;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export const TextField = ({
  name = "",
  type = "text",
  label,
  error,
  helperText,
  startAdornment,
  register,
  inputRef,
  placeholder,
  className,
  control,
  required,
  pattern,
  minLength,
  maxLength,
  min,
  max,
}: TextFieldProps) => {
  const classes = useTextFieldStyles();

  return (
    <Controller
      render={({ onChange, value }) => (
        <MuiTextField
          value={value}
          name={name}
          label={label}
          type={type}
          error={error}
          helperText={helperText}
          ref={register}
          inputRef={inputRef}
          placeholder={placeholder}
          className={className}
          // do not change the 'new-password' below
          // Will prevent autofilling on inputs with type text according to:
          // https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
          autoComplete="new-password"
          classes={{ root: classes.root }}
          InputProps={{
            startAdornment: startAdornment,
          }}
          onChange={onChange}
        />
      )}
      name={name}
      control={control}
      rules={{
        min,
        max,
        required,
        pattern,
        minLength,
        maxLength,
      }}
    />
  );
};

export default TextField;
