import { TextField as MuiTextField } from "@material-ui/core";
import { useTextFieldStyles } from "./TextFieldStyle";
interface TextFieldProps {
  value?: string;
  name?: string;
  type?: "text" | "email" | "password";
  label?: string;
  error?: boolean;
  helperText?: string;
  startAdornment?: React.ReactNode;
  register?:
    | ((instance: any) => void)
    | React.RefObject<any>
    | null
    | undefined;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
  value,
  name = "",
  type = "text",
  label,
  error,
  helperText,
  startAdornment,
  register,
  placeholder,
  className,
  onChange,
}: TextFieldProps) => {
  const classes = useTextFieldStyles();

  return (
    <MuiTextField
      name={name}
      type={type}
      label={label}
      error={error}
      helperText={helperText}
      inputRef={register}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      value={value}
      classes={{ root: classes.root }}
      InputProps={{
        startAdornment: startAdornment,
      }}
    />
  );
};

export default TextField;
