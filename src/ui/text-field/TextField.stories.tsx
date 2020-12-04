import { useState } from "react";
import { TextField } from "./TextField";
import { Box } from "@material-ui/core";

export default {
  title: "UI/TextFields",
};

export const TextFields = () => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Box mt={10} ml={10} mb={10}>
        <TextField
          value={value}
          label="אימייל"
          type="email"
          onChange={handleChange}
        />
      </Box>

      <Box mt={10} ml={10} mb={10}>
        <TextField
          value={value}
          label="טקסט"
          type="text"
          onChange={handleChange}
        />
      </Box>

      <Box mt={10} ml={10} mb={10}>
        <TextField
          value={value}
          label="ססמא"
          type="password"
          onChange={handleChange}
        />
      </Box>

      <Box mt={10} ml={10} mb={10}>
        <TextField
          value={value}
          label="with start adornment"
          type="text"
          startAdornment={<span>:)</span>}
          onChange={handleChange}
        />
      </Box>
    </>
  );
};
