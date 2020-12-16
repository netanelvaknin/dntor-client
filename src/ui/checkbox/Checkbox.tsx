import { Checkbox as MatCheckbox, FormControlLabel } from "@material-ui/core";
import { ReactComponent as CheckboxCircle } from "../../assets/icons/checkbox_circle.svg";
import { ReactComponent as CheckboxChecked } from "../../assets/icons/checkbox_checked.svg";

interface CheckboxProps {
  name: string;
  register?: any;
  label?: string;
}

export const Checkbox = ({ name, label, register }: CheckboxProps) => {
  return (
    <FormControlLabel
      control={
        <MatCheckbox
          inputRef={register}
          icon={<CheckboxCircle />}
          checkedIcon={<CheckboxChecked />}
          name={name}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
