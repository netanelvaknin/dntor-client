import { useState, useEffect } from "react";
import { DaysPickerContainer, DayButtonWrapper } from "./DaysPickerStyle";
import { Button } from "@material-ui/core";

type Day = { active: boolean; day: string };
interface DaysPickerProps {
  days?: any;
  disabled?: boolean;
  className?: string;
  onChange?: (days: Day[]) => void;
}

export const DaysPicker = ({
  days,
  disabled,
  className,
  onChange,
}: DaysPickerProps) => {
  const [value, setValue] = useState(days);

  const handleChange = (e: any) => {
    // Toggle active / unactive buttons of days
    const newDays = [...value];
    const clickedDay = e.target.innerText;
    const dayIndex = newDays.findIndex(({ day }) => day === clickedDay);

    newDays[dayIndex].active = !newDays[dayIndex].active;
    setValue(newDays);

    if (onChange) {
      onChange(value);
    }
  };

  useEffect(() => {
    setValue(days);

    if (onChange) {
      onChange(days);
    }
  }, [days, onChange]);

  return (
    <DaysPickerContainer className={className}>
      {value.map((day: any, index: any) => {
        return (
          <DayButtonWrapper active={day.active} key={index}>
            <Button onClick={(e) => handleChange(e)} disabled={disabled}>
              {day.day}
            </Button>
          </DayButtonWrapper>
        );
      })}
    </DaysPickerContainer>
  );
};

export default DaysPicker;
