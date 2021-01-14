import { useState, useEffect } from "react";
import DurationPicker from "react-duration-picker";
import { DurationSelectorContainer } from "./DurationSelectorStyle";

// Needs followup in this link for fix "unable to preventDefault... " error:
// https://github.com/flurmbo/react-duration-picker/issues/41

interface DurationSelectorProps {
  onChange: any;
}

export const DurationSelector = ({ onChange }: DurationSelectorProps) => {
  const [state, setState] = useState<any>();

  const onDuartionChange = (duration: any) => {
    setState(duration);

    if (onChange) {
      onChange(state);
    }
  };

  useEffect(() => {
    // Change language from english to hebrew (No support)

    setTimeout(() => {
      const hoursColumn = document.querySelectorAll(".rdp-text-overlay div")[0];
      const minutesColumn = document.querySelectorAll(
        ".rdp-text-overlay div"
      )[1];

      // Stupid library changing the value names after some ms
      // So I override it after 100ms
      if (hoursColumn && minutesColumn) {
        hoursColumn.innerHTML = "שעות";
        minutesColumn.innerHTML = "דקות";
      }
    }, 500);
  });

  return (
    <DurationSelectorContainer>
      <DurationPicker
        onChange={onDuartionChange}
        initialDuration={{ hours: 0, minutes: 0, seconds: 0 }}
      />
    </DurationSelectorContainer>
  );
};

export default DurationSelector;
