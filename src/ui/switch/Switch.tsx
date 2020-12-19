import { Switch as MuiSwitch } from "@material-ui/core";
import { useSwitchStyles } from "./SwitchStyle";

interface SwitchProps {
  name: string;
  register?:
    | ((instance: any) => void)
    | React.RefObject<any>
    | null
    | undefined;
}
export const Switch = ({ name, register }: SwitchProps) => {
  const classes = useSwitchStyles();

  return (
    <MuiSwitch
      inputRef={register}
      name={name}
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
