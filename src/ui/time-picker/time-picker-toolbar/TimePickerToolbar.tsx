import moment from "moment";
import {
  TimePickerToolbarStyle,
  CurrentTime,
  Explanation,
  HoursAndMinutesButton,
  ButtonsContainer,
  DisplayTimeButton,
} from "./TimePickerToolbarStyle";

export const TimePickerToolbar = (props: any) => {
  const selectedTime = moment(props.date._d).format("LT");
  //   const currentView = props.openView;

  //   const handleCurrentViewChange = () => {
  //     props.setOpenView(currentView === "minutes" ? "hours" : "minutes");
  //   };

  const getSelectedTime = () => {
    const hours = selectedTime.split(":")[1];
    const minutes = selectedTime.split(":")[0];

    return (
      <div>
        <DisplayTimeButton onClick={() => props.setOpenView("minutes")}>
          {hours}
        </DisplayTimeButton>
        <span>:</span>
        <DisplayTimeButton onClick={() => props.setOpenView("hours")}>
          {minutes}
        </DisplayTimeButton>
      </div>
    );
  };

  return (
    <TimePickerToolbarStyle>
      <CurrentTime>{getSelectedTime()}</CurrentTime>

      <Explanation style={{ fontWeight: "bold" }}>הוראות</Explanation>

      <Explanation>1. בחירת הזמן הרצוי ביום (בוקר או אחרה"צ)</Explanation>

      <Explanation>2. בחירת שעות ולאחר מכן דקות</Explanation>

      <Explanation>3. לבסוף, לחיצה על "אישור"</Explanation>

      <ButtonsContainer>
        <HoursAndMinutesButton
          disabled={props.ampm}
          variant="contained"
          onClick={() => props.setAmpm(true)}
        >
          הצג שעות בוקר
        </HoursAndMinutesButton>
        <HoursAndMinutesButton
          disabled={!props.ampm}
          variant="contained"
          onClick={() => props.setAmpm(false)}
        >
          הצג שעות אחרה"צ
        </HoursAndMinutesButton>
      </ButtonsContainer>
    </TimePickerToolbarStyle>
  );
};

export default TimePickerToolbar;
