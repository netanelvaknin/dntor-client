import { useState } from "react";
import { DaysPickerContainer, DayButtonWrapper } from "./DaysPickerStyle";
import { Button } from "@material-ui/core";

interface DaysPickerProps {
  onChange: (days: { active: boolean; day: string }[]) => void;
}

export const DaysPicker = ({ onChange }: DaysPickerProps) => {
  const [days, setDays] = useState([
    { active: true, day: "א" },
    { active: true, day: "ב" },
    { active: true, day: "ג" },
    { active: true, day: "ד" },
    { active: true, day: "ה" },
    { active: false, day: "ו" },
    { active: false, day: "ש" },
  ]);

  const handleChange = (e: any) => {
    const newDays = [...days];
    const clickedDay = e.target.innerText;
    const dayIndex = newDays.findIndex(({ day }) => day === clickedDay);

    newDays[dayIndex].active = !newDays[dayIndex].active;
    setDays(newDays);

    if (onChange) {
      onChange(days);
    }
  };

  return (
    <DaysPickerContainer>
      {days.map(({ day, active }) => {
        return (
          <DayButtonWrapper active={active} key={day}>
            <Button onClick={(e) => handleChange(e)}>{day}</Button>
          </DayButtonWrapper>
        );
      })}
    </DaysPickerContainer>
  );
};

export default DaysPicker;
