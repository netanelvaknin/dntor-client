import { Button } from "./Button";
import { Box } from "@material-ui/core";

export default {
  title: "UI/Buttons",
};

export const Buttons = () => (
  <Box>
    <Button variant="text">טקסט</Button>
    <Button variant="contained">מלא</Button>
    <Button variant="outlined">ממסוגר</Button>
  </Box>
);
