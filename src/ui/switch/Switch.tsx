import { useState } from "react";
import { Switch as MuiSwitch } from "@material-ui/core";
import { useSwitchStyles } from "./SwitchStyle";

interface SwitchProps {
  name: string;
  checked: boolean;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Switch = ({ name, checked, onChange }: SwitchProps) => {
  const classes = useSwitchStyles();
  const [value, setValue] = useState(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <MuiSwitch
      checked={value}
      onChange={handleChange}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
    />
  );
};

export default Switch;
