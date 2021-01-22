import { useEffect, useState } from "react";
import { Dialog } from "@material-ui/core";
import ServiceProvidersInfoDialog from "./service-providers-info-dialog/ServiceProvidersInfoDialog";
import AdditionalHoursModal from "./additional-hours-modal/AdditionalHoursModal";
import { TextField, Checkbox } from "../../../ui/index";
import { useForm } from "react-hook-form";
import { Grid, IconButton } from "@material-ui/core";
import AddIcon from "../../../assets/icons/plus_icon.svg";
import TrashIcon from "../../../assets/icons/trash_icon.svg";
import {
  ContinueButton,
  Heading,
  Divider,
  ServiceProviderCard,
  ServiceProvidersContainer,
  ServiceCheckboxStyle,
} from "./ServiceProvidersStyle";

interface ServiceProvidersProps {
  initialServicesData?: any;
  showMobileView: boolean;
  setShowMobileView: (showMobileView: boolean) => void;
}

export const ServiceProviders = ({
  initialServicesData,
  showMobileView,
  setShowMobileView,
}: ServiceProvidersProps) => {
  const [currentProviderData, setCurrentProviderData] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [serviceProviders, setServiceProviders] = useState<any>([]);
  const [sameHours, setSameHours] = useState(true);
  const { control, handleSubmit, register, watch, reset } = useForm({
    defaultValues: {
      provider_name: "",
    },
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [additionalHoursOpen, setAdditionalHoursOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [showBreakOne, setShowBreakOne] = useState(false);
  const [showBreakTwo, setShowBreakTwo] = useState(false);
  const [showBreakThree, setShowBreakThree] = useState(false);
  const [showAddBreakButton, setShowAddBreakButton] = useState(true);

  // Days states
  const [sunday, setSunday] = useState({ selected: false, disabled: false });
  const [monday, setMonday] = useState({ selected: false, disabled: false });
  const [tuesday, setTuesday] = useState({ selected: false, disabled: false });
  const [wednesday, setWednesday] = useState({
    selected: false,
    disabled: false,
  });
  const [thursday, setThursday] = useState({
    selected: false,
    disabled: false,
  });
  const [friday, setFriday] = useState({ selected: false, disabled: false });
  const [saturday, setSaturday] = useState({
    selected: false,
    disabled: false,
  });

  // Hours states
  const [startWorking, setStartWorking] = useState("08:00");
  const [endWorking, setEndWorking] = useState("18:00");

  // Breaks states
  const [startBreakOne, setStartBreakOne] = useState("08:00");
  const [endBreakOne, setEndBreakOne] = useState("18:00");
  const [startBreakTwo, setStartBreakTwo] = useState("08:00");
  const [endBreakTwo, setEndBreakTwo] = useState("18:00");
  const [startBreakThree, setStartBreakThree] = useState("08:00");
  const [endBreakThree, setEndBreakThree] = useState("18:00");

  const providerName = watch("provider_name");

  const onSubmit = async (formData: any) => {
    console.log(formData);
  };

  useEffect(() => {
    setDialogOpen(true);
  }, []);

  useEffect(() => {
    const initialServices = initialServicesData?.res?.services;
    initialServices?.map((service: any) => {
      return (service.selected = false);
    });

    setServices(initialServices);
  }, [initialServicesData]);

  const handleServiceChange = (index: number) => {
    const servicesCopy = [...services];
    servicesCopy[index].selected = !servicesCopy[index].selected;

    setServices(servicesCopy);
  };

  const handleAddBreak = () => {
    if (!showBreakOne && !showBreakTwo && !showBreakThree) {
      setShowBreakOne(true);
    } else if (!showBreakTwo && !showBreakThree) {
      setShowBreakTwo(true);
    } else if (!showBreakThree) {
      setShowBreakThree(true);
      setShowAddBreakButton(false);
    }
  };

  const handleRemoveBreak = (breakNumber: number) => {
    switch (breakNumber) {
      case 1:
        setShowBreakOne(false);
        break;
      case 2:
        setShowBreakTwo(false);
        break;
      case 3:
        setShowBreakThree(false);
    }
  };

  const handleSaveDaysAndHours = () => {
    // Extract the selected days
    const currentProviderDataCopy = JSON.stringify(currentProviderData);

    // Include only the days that selected and unique for each card
    const selectedDaysNames = [];
    sunday.selected &&
      !currentProviderDataCopy.includes("sunday") &&
      selectedDaysNames.push("sunday");
    monday.selected &&
      !currentProviderDataCopy.includes("monday") &&
      selectedDaysNames.push("monday");
    tuesday.selected &&
      !currentProviderDataCopy.includes("tuesday") &&
      selectedDaysNames.push("tuesday");
    wednesday.selected &&
      !currentProviderDataCopy.includes("wednesday") &&
      selectedDaysNames.push("wednesday");
    thursday.selected &&
      !currentProviderDataCopy.includes("thursday") &&
      selectedDaysNames.push("thursday");
    friday.selected &&
      !currentProviderDataCopy.includes("friday") &&
      selectedDaysNames.push("friday");
    saturday.selected &&
      !currentProviderDataCopy.includes("saturday") &&
      selectedDaysNames.push("saturday");

    // Disabled the selected days
    sunday.selected && setSunday({ ...sunday, disabled: true });
    monday.selected && setMonday({ ...monday, disabled: true });
    tuesday.selected && setTuesday({ ...tuesday, disabled: true });
    wednesday.selected && setWednesday({ ...wednesday, disabled: true });
    thursday.selected && setThursday({ ...thursday, disabled: true });
    friday.selected && setFriday({ ...friday, disabled: true });
    saturday.selected && setSaturday({ ...saturday, disabled: true });

    // Setup breaks array
    const breaks = [];
    showBreakOne && breaks.push({ from: startBreakOne, to: endBreakOne });
    showBreakTwo && breaks.push({ from: startBreakTwo, to: endBreakTwo });
    showBreakThree && breaks.push({ from: startBreakThree, to: endBreakThree });

    setCurrentProviderData([
      ...currentProviderData,
      {
        workTimes: [
          {
            days: selectedDaysNames,
            workingHours: {
              from: startWorking,
              to: endWorking,
            },
            breaks,
          },
        ],
      },
    ]);

    // Reset and close
    setShowBreakOne(false);
    setShowBreakTwo(false);
    setShowBreakThree(false);
    setAdditionalHoursOpen(false);
  };

  const handleConfirmationDialogActions = (action: number) => {
    if (action === 1) {
      setCurrentProviderData([]);
      setConfirmationDialogOpen(false);
      resetDays();
    } else if (action === 2) {
      setConfirmationDialogOpen(false);
      setSameHours(false);
    }
  };

  const resetDays = () => {
    setSunday({ selected: false, disabled: false });
    setMonday({ selected: false, disabled: false });
    setTuesday({ selected: false, disabled: false });
    setWednesday({ selected: false, disabled: false });
    setThursday({ selected: false, disabled: false });
    setFriday({ selected: false, disabled: false });
    setSaturday({ selected: false, disabled: false });
  };

  const removeWorkTimesCard = (index: number) => {
    const currentServiceProviderCopy = [...currentProviderData];
    const daysToEnable = currentServiceProviderCopy[index].workTimes[0].days;
    daysToEnable.includes("sunday") &&
      setSunday({ selected: false, disabled: false });
    daysToEnable.includes("monday") &&
      setMonday({ selected: false, disabled: false });
    daysToEnable.includes("tuesday") &&
      setTuesday({ selected: false, disabled: false });
    daysToEnable.includes("wednesday") &&
      setWednesday({ selected: false, disabled: false });
    daysToEnable.includes("thursday") &&
      setThursday({ selected: false, disabled: false });
    daysToEnable.includes("friday") &&
      setFriday({ selected: false, disabled: false });
    daysToEnable.includes("saturday") &&
      setSaturday({ selected: false, disabled: false });
    currentServiceProviderCopy.splice(index, 1);
    setCurrentProviderData(currentServiceProviderCopy);
  };

  const handleAddProvider = () => {
    const currentSelectedServices = services.filter((service: any) => {
      if (service.selected) {
        return service;
      }

      return null;
    });

    const providerData = {
      providerName,
      currentSelectedServices,
      currentProviderData,
    };

    setServiceProviders([...serviceProviders, providerData]);

    // Reset and move to providers view
    resetDays();
    reset({ provider_name: "" });
    resetSelectedServices();
    setCurrentProviderData([]);
    setShowMobileView(true);
  };

  const resetSelectedServices = () => {
    const servicesCopy = [...services];
    servicesCopy.map((service: any) => {
      return (service.selected = false);
    });
  };

  useEffect(() => {
    if (!showBreakOne || !showBreakTwo || !showBreakThree) {
      setShowAddBreakButton(true);
    }
  }, [showBreakOne, showBreakTwo, showBreakThree]);

  const translateDaysToHebrew = (daysArr: string[]) => {
    const daysNames: any = {
      sunday: "א",
      monday: "ב",
      tuesday: "ג",
      wednesday: "ד",
      thursday: "ה",
      friday: "ו",
      saturday: "ש",
    };

    const translatedArr = daysArr.map((day: string) => {
      return daysNames[day];
    });

    return translatedArr;
  };

  useEffect(() => {
    if (sameHours && currentProviderData.length > 0) {
      setConfirmationDialogOpen(true);
    } else {
      setConfirmationDialogOpen(false);
    }
  }, [sameHours, currentProviderData.length]);

  const additionalHoursModalProps = {
    open: additionalHoursOpen,
    setOpen: setAdditionalHoursOpen,
    providerName: providerName,
    showBreakOne: showBreakOne,
    showBreakTwo: showBreakTwo,
    showBreakThree: showBreakThree,
    handleAddBreak: handleAddBreak,
    showAddBreakButton: showAddBreakButton,
    handleRemoveBreak: handleRemoveBreak,
    sunday: sunday,
    monday: monday,
    tuesday: tuesday,
    wednesday: wednesday,
    thursday: thursday,
    friday: friday,
    saturday: saturday,
    startWorking: startWorking,
    endWorking: endWorking,
    setStartWorking: setStartWorking,
    setEndWorking: setEndWorking,
    setSunday: setSunday,
    setMonday: setMonday,
    setTuesday: setTuesday,
    setWednesday: setWednesday,
    setThursday: setThursday,
    setFriday: setFriday,
    setSaturday: setSaturday,
    startBreakOne: startBreakOne,
    endBreakOne: endBreakOne,
    startBreakTwo: startBreakTwo,
    endBreakTwo: endBreakTwo,
    startBreakThree: startBreakThree,
    endBreakThree: endBreakThree,
    setStartBreakOne: setStartBreakOne,
    setEndBreakOne: setEndBreakOne,
    setStartBreakTwo: setStartBreakTwo,
    setEndBreakTwo: setEndBreakTwo,
    setStartBreakThree: setStartBreakThree,
    setEndBreakThree: setEndBreakThree,
    handleSaveDaysAndHours: handleSaveDaysAndHours,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div style={{ maxWidth: "32rem", margin: "0 auto" }}>
        {showMobileView ? (
          <div>
            {serviceProviders.map((sprovider: any, index: number) => {
              return (
                <ServiceProviderCard key={index}>
                  <p>{sprovider.providerName}</p>

                  {sprovider.currentSelectedServices.map(
                    (service: any, index: number) => {
                      return <p key={index}>{service.serviceName}</p>;
                    }
                  )}

                  {sprovider?.currentProviderData[0]?.workTimes[0]?.days
                    .length > 0 &&
                    translateDaysToHebrew(
                      sprovider.currentProviderData[0].workTimes[0].days
                    ).map((day: any) => {
                      return `${day} `;
                    })}
                </ServiceProviderCard>
              );
            })}
          </div>
        ) : (
          <>
            <Grid
              container
              justify="flex-start"
              alignItems="flex-start"
              style={{ paddingTop: "2.5rem" }}
            >
              <Grid item>
                <TextField
                  name="provider_name"
                  register={register}
                  control={control}
                  type="text"
                  label="מה שם נותנ/ת השירות"
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="flex-start"
              alignItems="flex-start"
              style={{ marginTop: "2rem" }}
            >
              <Grid item style={{ marginBottom: "1rem" }}>
                <Heading>
                  {providerName
                    ? `מהם השירותים ש${providerName} נותנ/ת `
                    : " מהם השירותים של נותנ/ת השירות "}
                </Heading>
              </Grid>
              <Grid
                item
                container
                style={{
                  maxHeight: "12rem",
                  overflowY: "auto",
                  padding: "1rem",
                }}
              >
                {services?.map((service: any, index: number) => {
                  return (
                    <Grid item key={service._id}>
                      <ServiceCheckboxStyle
                        name={service._id}
                        value={service.selected}
                        label={service.serviceName}
                        onChange={() => handleServiceChange(index)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>

            <Divider />

            <Grid
              container
              justify="flex-start"
              alignItems="flex-start"
              style={{ marginTop: "2rem" }}
            >
              <Grid item>
                <Heading>
                  {providerName
                    ? `מהן שעות הפעילות של ${providerName}`
                    : "מהן שעות הפעילות של נותנ/ת השירות "}
                </Heading>
              </Grid>

              <Grid
                item
                container
                justify="space-between"
                style={{ margin: "1.5rem 0" }}
              >
                <Grid
                  item
                  container
                  justify="space-between"
                  alignItems="center"
                >
                  <Checkbox
                    label="שימוש באותן השעות שהוגדרו לעסק"
                    name="same_hours"
                    value={sameHours}
                    onChange={() => setSameHours(!sameHours)}
                  />
                </Grid>

                {!sameHours && (
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="flex-start"
                    style={{ marginTop: "1rem" }}
                  >
                    <IconButton
                      style={{ marginRight: "-1.2rem" }}
                      onClick={() => setAdditionalHoursOpen(true)}
                    >
                      <img src={AddIcon} alt="הוספת זמנים לנותן שירות" />{" "}
                    </IconButton>
                    <span
                      style={{ cursor: "pointer", fontSize: "1.8rem" }}
                      onClick={() => setAdditionalHoursOpen(true)}
                    >
                      הוסף שעות
                    </span>
                  </Grid>
                )}
              </Grid>

              {/* Service provider working hours & breaks times */}
              <ServiceProvidersContainer item container>
                {currentProviderData?.map((sprovider: any, index: number) => {
                  return (
                    <ServiceProviderCard key={index}>
                      <strong>ימי פעילות:</strong>
                      <p>
                        {sprovider.workTimes[0].days.includes("sunday") &&
                          "א' "}
                        {sprovider.workTimes[0].days.includes("monday") &&
                          "ב' "}
                        {sprovider.workTimes[0].days.includes("tuesday") &&
                          "ג' "}
                        {sprovider.workTimes[0].days.includes("wednesday") &&
                          "ד' "}
                        {sprovider.workTimes[0].days.includes("thursday") &&
                          "ה' "}
                        {sprovider.workTimes[0].days.includes("friday") &&
                          "ו' "}
                        {sprovider.workTimes[0].days.includes("saturday") &&
                          "ש' "}
                      </p>

                      <strong>שעת התחלה וסיום:</strong>
                      <p>
                        {sprovider.workTimes[0].workingHours.from} -{" "}
                        {sprovider.workTimes[0].workingHours.to}
                      </p>

                      {sprovider.workTimes[0].breaks[0] && (
                        <strong>הפסקות:</strong>
                      )}
                      <p>
                        {sprovider.workTimes[0].breaks[0] &&
                          `${sprovider.workTimes[0].breaks[0].from} - ${sprovider.workTimes[0].breaks[0].to}`}
                      </p>
                      <p>
                        {sprovider.workTimes[0].breaks[1] &&
                          `${sprovider.workTimes[0].breaks[1].from} - ${sprovider.workTimes[0].breaks[1].to}`}
                      </p>

                      <p>
                        {sprovider.workTimes[0].breaks[2] &&
                          `${sprovider.workTimes[0].breaks[2].from} - ${sprovider.workTimes[0].breaks[2].to}`}
                      </p>

                      <IconButton
                        onClick={() => removeWorkTimesCard(index)}
                        style={{
                          position: "absolute",
                          left: "1rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <img src={TrashIcon} alt="מחיקה" />
                      </IconButton>
                    </ServiceProviderCard>
                  );
                })}
                {/* <ServiceProviderCard />
  <ServiceProviderCard />
  <ServiceProviderCard /> */}
              </ServiceProvidersContainer>
            </Grid>

            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ marginTop: "2rem", paddingBottom: "4rem" }}
            >
              <ContinueButton variant="outlined" onClick={handleAddProvider}>
                אישור
              </ContinueButton>
            </Grid>
          </>
        )}
      </div>

      <ServiceProvidersInfoDialog
        open={dialogOpen}
        setDialogOpen={setDialogOpen}
      />

      <AdditionalHoursModal {...additionalHoursModalProps} />

      <Dialog open={confirmationDialogOpen}>
        <h1>בחרת להשתמש באותן שעות שבהן העסק משתמש.</h1>
        <h1>פעולה זאת תוביל למחיקת הימים והשעות שכבר בחרת. בטוח ?</h1>
        <button onClick={() => handleConfirmationDialogActions(1)}>
          כן, בטוח
        </button>
        <button onClick={() => handleConfirmationDialogActions(2)}>
          לא, בוא נשאיר את מה שבחרתי
        </button>
      </Dialog>
    </form>
  );
};

export default ServiceProviders;
