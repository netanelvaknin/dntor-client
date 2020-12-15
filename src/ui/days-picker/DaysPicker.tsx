import { useState } from "react";
import { DaysPickerContainer, DayButtonWrapper } from "./DaysPickerStyle";
import { Button } from "@material-ui/core";

type Day = { active: boolean; day: string };
interface DaysPickerProps {
  days?: Day[];
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
  const [value, setValue] = useState(
    days || [
      { active: true, day: "א" },
      { active: true, day: "ב" },
      { active: true, day: "ג" },
      { active: true, day: "ד" },
      { active: true, day: "ה" },
      { active: true, day: "ו" },
      { active: true, day: "ש" },
    ]
  );

  const handleChange = (e: any) => {
    const newDays = [...value];
    const clickedDay = e.target.innerText;
    const dayIndex = newDays.findIndex(({ day }) => day === clickedDay);

    newDays[dayIndex].active = !newDays[dayIndex].active;
    setValue(newDays);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <DaysPickerContainer className={className}>
      {value.map(({ day, active }) => {
        return (
          <DayButtonWrapper active={active} key={day}>
            <Button onClick={(e) => handleChange(e)} disabled={disabled}>
              {day}
            </Button>
          </DayButtonWrapper>
        );
      })}
    </DaysPickerContainer>
  );
};

export default DaysPicker;
