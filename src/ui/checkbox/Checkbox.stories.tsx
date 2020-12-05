import { Checkbox as CheckboxExample } from "./Checkbox";
import { Box } from "@material-ui/core";
import { useState } from "react";

export default {
  title: "UI/Checkbox",
};

export const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Box mt={10} ml={10} mb={10}>
        <CheckboxExample
          name="Netanel"
          checked={checked}
          label="זכור אותי"
          onChange={(e) => {
            setChecked(e.target.checked);
            console.log(checked);
          }}
        />
      </Box>
    </>
  );
};
