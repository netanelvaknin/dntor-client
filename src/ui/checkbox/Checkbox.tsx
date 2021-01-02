import { Checkbox as MatCheckbox, FormControlLabel } from "@material-ui/core";
import { ReactComponent as CheckboxCircle } from "../../assets/icons/checkbox_circle.svg";
import { ReactComponent as CheckboxChecked } from "../../assets/icons/checkbox_checked.svg";

interface CheckboxProps {
  name: string;
  register?:
    | ((instance: any) => void)
    | React.RefObject<any>
    | null
    | undefined;
  label?: string;
  value?: boolean;
  disabled?: boolean;
  onChange?:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
}

export const Checkbox = ({
  value,
  name,
  label,
  register,
  disabled,
  onChange,
}: CheckboxProps) => {
  return (
    <FormControlLabel
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
