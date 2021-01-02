import { useState, useEffect } from "react";
import {
  DaysPickerContainer,
  DayButtonWrapper,
  DayButton,
} from "./DaysPickerStyle";

type Day = { active: boolean; day: string; disabled: boolean };
interface DaysPickerProps {
  days?: any;
  className?: string;
  onChange?: (days: Day[]) => void;
}

export const DaysPicker = ({ days, className, onChange }: DaysPickerProps) => {
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
    if (onChange) {
      onChange(days);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DaysPickerContainer className={className}>
      {value.map((day: any, index: any) => {
        return (
          <DayButtonWrapper active={day.active} key={index}>
            <DayButton onClick={(e) => handleChange(e)} disabled={day.disabled}>
              {day.day}
            </DayButton>
          </DayButtonWrapper>
        );
      })}
    </DaysPickerContainer>
  );
};

export default DaysPicker;
