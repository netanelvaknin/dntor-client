import { useState } from "react";
import TimePicker from "./TimePicker";
import { Box } from "@material-ui/core";
import moment from "moment";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

export default {
  title: "UI/TimePicker",
};

export const Time = () => {
  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(
    moment
  );

  return (
    <Box>
      <TimePicker value={selectedDate} onChange={handleDateChange} />
    </Box>
  );
};
