import { useState } from "react";
import DaysPicker from "./DaysPicker";
import { Box } from "@material-ui/core";

export default {
  title: "UI/DayPicker",
};

export const Buttons = () => {
  const [days, setDays] = useState<{ active: boolean; day: string }[]>([]);

  return (
    <Box>
      <DaysPicker
        onChange={(days) => {
          console.log(days);
          setDays(days);
        }}
      />
    </Box>
  );
};
