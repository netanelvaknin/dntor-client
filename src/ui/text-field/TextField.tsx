import { TextField as MuiTextField } from "@material-ui/core";
import { useTextFieldStyles } from "./TextFieldStyle";

interface TextFieldProps {
  value: string;
  type?: "text" | "email" | "password" | "time";
  label?: string;
  startAdornment?: React.ReactNode;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
  value,
  type = "text",
  label,
  startAdornment,
  placeholder,
  className,
  onChange,
}: TextFieldProps) => {
  const classes = useTextFieldStyles();

  return (
    <MuiTextField
      value={value}
      type={type}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
      classes={{ root: classes.root }}
      InputProps={{
        startAdornment: startAdornment,
      }}
    />
  );
};

export default TextField;
