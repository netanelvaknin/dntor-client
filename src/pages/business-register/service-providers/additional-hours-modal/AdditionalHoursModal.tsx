import { useContext } from "react";
import {
  Dialog,
  makeStyles,
  IconButton,
  Grid,
  Typography,
} from "@material-ui/core";
import closeIcon from "../../../../assets/icons/x_icon.svg";
import { TimePickerSelector } from "../.../../../../../ui/index";
import { SaveHoursButton } from "./AdditionalHoursModalStyle";
import { ToText, BreakButton } from "../../working-hours/WorkingHoursStyle";
import { Delete } from "@material-ui/icons";
import { DayCheckbox } from "../../working-hours/WorkingHoursStyle";
import { AdditionalHoursModalProps } from "./AdditionalHoursModalInterface";
import { useSmallScreen } from "../../../../hooks/index";
import { Transition } from "../ServiceProviders";
import rootContext from "../../../../context/root/rootContext";
import { Alert } from "@material-ui/lab";

const useDialogStyles = makeStyles({
  paper: {
    width: "55rem",
    height: "70rem",
    position: "relative",
    padding: "4rem 2rem 2rem",
    "@media (max-width: 767px)": {
      height: "100%",
      padding: "6rem 1rem 2rem",
    },
  },
});

export const AdditionalHoursModal = ({
  open,
  setOpen,
  providerName,
  showBreakOne,
  showBreakTwo,
  showBreakThree,
  showAddBreakButton,
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  setSunday,
  setMonday,
  setTuesday,
  setWednesday,
  setThursday,
  setFriday,
  setSaturday,
  startWorking,
  endWorking,
  setStartWorking,
  setEndWorking,
  startBreakOne,
  endBreakOne,
  startBreakTwo,
  endBreakTwo,
  startBreakThree,
  endBreakThree,
  setStartBreakOne,
  setEndBreakOne,
  setStartBreakTwo,
  setEndBreakTwo,
  setStartBreakThree,
  setEndBreakThree,
  handleAddBreak,
  handleRemoveBreak,
  handleSaveDaysAndHours,
}: AdditionalHoursModalProps) => {
  const classes = useDialogStyles();
  const isSmallScreen = useSmallScreen();
  const rootState = useContext(rootContext);

  return (
    <Dialog
      open={open}
      classes={{ paper: classes.paper }}
      fullScreen={isSmallScreen}
      TransitionComponent={Transition}
    >
      <IconButton
        onClick={() => setOpen(false)}
        style={{ position: "absolute", left: "1rem", top: "1rem" }}
      >
        <img src={closeIcon} alt="סגור חלון" />
      </IconButton>

      <Grid
        item
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{ marginBottom: "3rem" }}
      >
        <Grid item>נא לסמן את הימים בהם העסק עובד</Grid>
        <Grid item style={{ maxWidth: "28rem" }}>
          <DayCheckbox
            value={sunday.selected}
            label="א"
            labelPlacement="top"
            name="sunday"
            disabled={sunday.disabled}
            onChange={() =>
              setSunday({ ...sunday, selected: !sunday.selected })
            }
          />
          <DayCheckbox
            value={monday.selected}
            label="ב"
            labelPlacement="top"
            name="monday"
            disabled={monday.disabled}
            onChange={() =>
              setMonday({ ...monday, selected: !monday.selected })
            }
          />
          <DayCheckbox
            value={tuesday.selected}
            label="ג"
            labelPlacement="top"
            name="tuesday"
            disabled={tuesday.disabled}
            onChange={() =>
              setTuesday({ ...tuesday, selected: !tuesday.selected })
            }
          />
          <DayCheckbox
            value={wednesday.selected}
            label="ד"
            labelPlacement="top"
            name="wednesday"
            disabled={wednesday.disabled}
            onChange={() =>
              setWednesday({ ...wednesday, selected: !wednesday.selected })
            }
          />
          <DayCheckbox
            value={thursday.selected}
            label="ה"
            labelPlacement="top"
            name="thursday"
            disabled={thursday.disabled}
            onChange={() =>
              setThursday({ ...thursday, selected: !thursday.selected })
            }
          />
          <DayCheckbox
            value={friday.selected}
            label="ו"
            labelPlacement="top"
            name="friday"
            disabled={friday.disabled}
            onChange={() =>
              setFriday({ ...friday, selected: !friday.selected })
            }
          />
          <DayCheckbox
            value={saturday.selected}
            label="ש"
            labelPlacement="top"
            name="saturday"
            disabled={saturday.disabled}
            onChange={() =>
              setSaturday({ ...saturday, selected: !saturday.selected })
            }
          />
        </Grid>
      </Grid>

      <Grid item container justify="center">
        <Grid item>
          <Typography variant="h2" style={{ marginBottom: "2rem" }}>
            {providerName === ""
              ? "מהם שעות העבודה של נותנ/ת השירות"
              : `מהן שעות העבודה של ${providerName}?`}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        container
        alignItems="center"
        justify="center"
        style={{ maxWidth: "32rem", margin: "0 auto 2rem" }}
      >
        <Grid item container alignItems="center" justify="center" md={5} xs={4}>
          <TimePickerSelector
            time={startWorking}
            onTimeChange={(hours: any) =>
              setStartWorking(`${hours.hour}:${hours.minute}`)
            }
          />
        </Grid>

        <Grid item container alignItems="center" justify="center" md={2} xs={3}>
          <ToText>עד</ToText>
        </Grid>

        <Grid item container alignItems="center" justify="center" md={5} xs={4}>
          <TimePickerSelector
            time={endWorking}
            onTimeChange={(hours: any) =>
              setEndWorking(`${hours.hour}:${hours.minute}`)
            }
          />
        </Grid>
      </Grid>

      {/* BREAKS */}
      {/* Break number 1 */}
      {showBreakOne && (
        <Grid
          item
          container
          alignItems="center"
          justify="center"
          style={{
            margin: "0 auto 2rem",
            border: "1px solid #ccc",
            borderRadius: "1.5rem",
            padding: "1rem",
            maxWidth: "32rem",
          }}
        >
          <Grid item container justify="center">
            <Grid item style={{ marginBottom: "1rem" }}>
              <Typography variant="h2" style={{ marginBottom: "0.5rem" }}>
                שעות הפסקה{" "}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justify="center" alignItems="center" md={5}>
            <TimePickerSelector
              time={startBreakOne}
              onTimeChange={(hours: any) =>
                setStartBreakOne(`${hours.hour}:${hours.minute}`)
              }
            />
          </Grid>

          <Grid item container justify="center" alignItems="center" md={2}>
            <ToText>עד</ToText>
          </Grid>

          <Grid item container justify="center" alignItems="center" md={5}>
            <TimePickerSelector
              time={endBreakOne}
              onTimeChange={(hours: any) =>
                setEndBreakOne(`${hours.hour}:${hours.minute}`)
              }
            />
          </Grid>
          <BreakButton variant="text" onClick={() => handleRemoveBreak(1)}>
            <Grid container justify="center" alignItems="center">
              <Delete style={{ marginLeft: "1rem" }} /> הסרת הפסקה
            </Grid>
          </BreakButton>
        </Grid>
      )}

      {/* Break number 2 */}
      {showBreakTwo && (
        <Grid
          item
          container
          alignItems="center"
          justify="center"
          style={{
            margin: "0 auto 2rem",
            border: "1px solid #ccc",
            borderRadius: "1.5rem",
            padding: "1rem",
            maxWidth: "32rem",
          }}
        >
          <Grid item container justify="center">
            <Grid item style={{ marginBottom: "1rem" }}>
              <Typography variant="h2" style={{ marginBottom: "0.5rem" }}>
                שעות הפסקה{" "}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justify="center" alignItems="center" md={5}>
            <TimePickerSelector
              time={startBreakTwo}
              onTimeChange={(hours: any) =>
                setStartBreakTwo(`${hours.hour}:${hours.minute}`)
              }
            />
          </Grid>

          <Grid item container justify="center" alignItems="center" md={2}>
            <ToText>עד</ToText>
          </Grid>

          <Grid item container justify="center" alignItems="center" md={5}>
            <TimePickerSelector
              time={endBreakTwo}
              onTimeChange={(hours: any) =>
                setEndBreakTwo(`${hours.hour}:${hours.minute}`)
              }
            />
          </Grid>
          <BreakButton variant="text" onClick={() => handleRemoveBreak(2)}>
            <Grid container justify="center" alignItems="center">
              <Delete style={{ marginLeft: "1rem" }} /> הסרת הפסקה
            </Grid>
          </BreakButton>
        </Grid>
      )}

      {/* Break number 3 */}
      {showBreakThree && (
        <Grid
          item
          container
          alignItems="center"
          justify="center"
          style={{
            margin: "0 auto 2rem",
            border: "1px solid #ccc",
            borderRadius: "1.5rem",
            padding: "1rem",
            maxWidth: "32rem",
          }}
        >
          <Grid item container justify="center">
            <Grid item style={{ marginBottom: "1rem" }}>
              <Typography variant="h2" style={{ marginBottom: "0.5rem" }}>
                שעות הפסקה{" "}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justify="center" alignItems="center" md={5}>
            <TimePickerSelector
              time={startBreakThree}
              onTimeChange={(hours: any) =>
                setStartBreakThree(`${hours.hour}:${hours.minute}`)
              }
            />
          </Grid>

          <Grid item container justify="center" alignItems="center" md={2}>
            <ToText>עד</ToText>
          </Grid>

          <Grid item container justify="center" alignItems="center" md={5}>
            <TimePickerSelector
              time={endBreakThree}
              onTimeChange={(hours: any) =>
                setEndBreakThree(`${hours.hour}:${hours.minute}`)
              }
            />
          </Grid>
          <BreakButton variant="text" onClick={() => handleRemoveBreak(3)}>
            <Grid container justify="center" alignItems="center">
              <Delete style={{ marginLeft: "1rem" }} /> הסרת הפסקה
            </Grid>
          </BreakButton>
        </Grid>
      )}

      {showAddBreakButton && (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginBottom: "2rem" }}
        >
          <Grid item>
            <BreakButton variant="text" onClick={handleAddBreak}>
              הוספת הפסקה
            </BreakButton>
          </Grid>
        </Grid>
      )}

      <Grid container style={{ margin: "0rem 0 2rem" }}>
        <Grid item md={12} xs={12}>
          {rootState?.error && (
            <Alert
              style={{ maxWidth: "28rem", margin: "0 auto" }}
              severity="error"
            >
              {rootState?.error}
            </Alert>
          )}
        </Grid>
      </Grid>

      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ marginTop: "2rem" }}
      >
        <Grid item>
          <SaveHoursButton onClick={handleSaveDaysAndHours}>
            שמירת זמני הפעילות
          </SaveHoursButton>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default AdditionalHoursModal;
