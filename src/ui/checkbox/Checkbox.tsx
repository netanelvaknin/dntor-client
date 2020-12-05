import { Checkbox as MatCheckbox, FormControlLabel } from "@material-ui/core";
import { useState } from "react";
import { ReactComponent as CheckboxCircle } from "../../assets/icons/checkbox_circle.svg";
import { ReactComponent as CheckboxChecked } from "../../assets/icons/checkbox_checked.svg";

interface CheckboxProps {
  name: string;
  checked: boolean;
  label?: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({ name, label, checked, onChange }: CheckboxProps) => {
  const [value, setValue] = useState(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FormControlLabel
      control={
        <MatCheckbox
          icon={<CheckboxCircle />}
          checkedIcon={<CheckboxChecked />}
          checked={value}
          onChange={handleChange}
          name={name}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
