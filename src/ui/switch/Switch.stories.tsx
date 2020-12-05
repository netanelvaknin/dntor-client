import { Switch as SwitchExample } from "./Switch";
import { Box } from "@material-ui/core";
import { useState } from "react";

export default {
  title: "UI/Switch",
};

export const Switch = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Box mt={10} ml={10} mb={10}>
      <SwitchExample
        name="Netanel"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          console.log(checked);
        }}
      />
    </Box>
  );
};
