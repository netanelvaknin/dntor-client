import { Checkbox as CheckboxExample } from "./Checkbox";
import { Box } from "@material-ui/core";

export default {
  title: "UI/Checkbox",
};

export const Checkbox = () => {
  return (
    <>
      <Box mt={10} ml={10} mb={10}>
        <CheckboxExample name="Netanel" label="זכור אותי" />
      </Box>
    </>
  );
};
