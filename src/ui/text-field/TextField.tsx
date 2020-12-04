import { TextField as MuiTextField } from "@material-ui/core";
import { useTextFieldStyles } from "./TextFieldStyle";

interface TextFieldProps {
  value: string;
  type?: "text" | "email" | "password";
  label?: string;
  startAdornment?: React.ReactNode;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
  value,
  type = "text",
  label,
  startAdornment,
  className,
  onChange,
}: TextFieldProps) => {
  const classes = useTextFieldStyles();

  return (
    <MuiTextField
      value={value}
      type={type}
      label={label}
      onChange={onChange}
      classes={{ root: classes.root }}
      InputProps={{
        startAdornment: startAdornment,
      }}
      className={className}
    />
  );
};

export default TextField;
