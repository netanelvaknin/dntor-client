import { Switch as SwitchExample } from "./Switch";
import { Box } from "@material-ui/core";

export default {
  title: "UI/Switch",
};

export const Switch = () => {
  return (
    <Box mt={10} ml={10} mb={10}>
      <SwitchExample name="Netanel" />
    </Box>
  );
};
