import { Switch as MuiSwitch } from "@material-ui/core";
import { useSwitchStyles } from "./SwitchStyle";

interface SwitchProps {
  name: string;
  register?:
    | ((instance: any) => void)
    | React.RefObject<any>
    | null
    | undefined;
  value?: boolean;
  onChange?: any;
}
export const Switch = ({ name, register, value, onChange }: SwitchProps) => {
  const classes = useSwitchStyles();

  return (
    <MuiSwitch
      inputRef={register}
      name={name}
      value={value}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      onChange={onChange}
    />
  );
};

export default Switch;
