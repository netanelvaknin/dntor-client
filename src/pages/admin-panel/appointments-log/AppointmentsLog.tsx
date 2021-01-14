import { useState } from "react";
import moment, { Moment } from "moment";
import { DatePicker } from "@material-ui/pickers";
import {
  useDatepickerStyles,
  SubMenu,
  AppointmentsLogContainer,
  LogWrapper,
  DaysContainer,
  DayColumn,
  HourText,
} from "./AppointmentsLogStyle";
import { useScreenSize } from "../../../hooks/index";
import { Card } from "../../../ui/index";

export const AppointmentsLog = () => {
  const [selectedDate, handleDateChange] = useState<Moment | Date | null>(
    new Date()
  );
  const classes = useDatepickerStyles();
  const isSmallTableMode = useScreenSize(0, 1175);

  return (
    <AppointmentsLogContainer>
      <SubMenu></SubMenu>

      <DatePicker
        value={selectedDate}
        onChange={(e) => handleDateChange(moment(e))}
        animateYearScrolling
        variant="static"
        className={classes.staticWrapperRoot}
      />

      <LogWrapper>
        {isSmallTableMode ? (
          <></>
        ) : (
          <DaysContainer>
            <DayColumn>
              <Card
                expandable
                cardTitle={
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <HourText>08:00-09:00</HourText>
                    <span>דור כהן</span>
                  </div>
                }
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>052-4835373</span>
                  <div>
                    <span style={{ fontWeight: "bold" }}>שירות: </span>
                    <span>תספורת גברים מיוחדת מאוד מאוד מאוד</span>
                  </div>

                  <div>
                    <span style={{ fontWeight: "bold" }}>הערות: </span>
                    <span>
                      יש לי עור מאוד רגיש אשמח אם לא תשתמשו בככה וככה וככה
                    </span>
                  </div>
                </div>
              </Card>

              <br />
            </DayColumn>
          </DaysContainer>
        )}
      </LogWrapper>
    </AppointmentsLogContainer>
  );
};

export default AppointmentsLog;
