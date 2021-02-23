import { Checkbox as MatCheckbox, FormControlLabel } from "@material-ui/core";
import { useCheckboxStyles } from "./CheckboxStyle";
import { ReactComponent as CheckboxCircle } from "../../assets/icons/checkbox_circle.svg";
import { ReactComponent as CheckboxChecked } from "../../assets/icons/checkbox_checked.svg";

interface CheckboxProps {
  name: string;
  register?:
    | ((instance: any) => void)
    | React.RefObject<any>
    | null
    | undefined;
  label?: React.ReactNode;
  value?: boolean;
  labelPlacement?: "start" | "top" | "end";
  disabled?: boolean;
  onChange?:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
  className?: string;
}

export const Checkbox = ({
  value = false,
  name,
  label,
  labelPlacement = "end",
  register,
  disabled,
  className,
  onChange,
}: CheckboxProps) => {
  const classes = useCheckboxStyles();

  return (
    <FormControlLabel
      labelPlacement={labelPlacement}
      className={className}
      defaultChecked={false}
      classes={{ disabled: classes.disabled }}
      control={
        <MatCheckbox
          checked={value}
          inputRef={register}
          icon={<CheckboxCircle />}
          checkedIcon={<CheckboxChecked />}
          name={name}
          disabled={disabled}
          onChange={onChange}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
