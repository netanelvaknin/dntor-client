import { useEffect, useState, forwardRef, useContext } from "react";
import { Dialog } from "@material-ui/core";
import ServiceProvidersInfoDialog from "./service-providers-info-dialog/ServiceProvidersInfoDialog";
import AdditionalHoursModal from "./additional-hours-modal/AdditionalHoursModal";
import { TextField, Checkbox } from "../../../ui/index";
import { useForm } from "react-hook-form";
import { Grid, IconButton, Slide, Typography } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import AddIcon from "../../../assets/icons/plus_icon.svg";
import TrashIcon from "../../../assets/icons/trash_icon.svg";
import {
  ContinueButton,
  Heading,
  Divider,
  ServiceProviderCard,
  ServiceProvidersContainer,
  ServiceCheckboxStyle,
  ConfirmationDialogHeading,
  ConfirmationDialogSecondaryHeading,
  ConfirmationActionButton,
  useConfirmationDialogStyles,
  SummaryProviderCard,
  ButtonStyle,
} from "./ServiceProvidersStyle";
import { useSmallScreen } from "../../../hooks/index";
import rootContext from "../../../context/root/rootContext";
import { Alert } from "@material-ui/lab";
import moment from "moment";
import { Button } from "../../../ui/index";
import useFetch from "use-http";

export const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ServiceProvidersProps {
  initialServicesData?: any;
  businessWorkingHours?: any;
  showMobileView: boolean;
  setShowMobileView: (showMobileView: boolean) => void;
}

export const ServiceProviders = ({
  initialServicesData,
  businessWorkingHours,
  showMobileView,
  setShowMobileView,
}: ServiceProvidersProps) => {
  const rootState = useContext(rootContext);

  const [currentProviderData, setCurrentProviderData] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [serviceProviders, setServiceProviders] = useState<any>([]);
  const [initialWorkingHours, setInitialWorkingHours] = useState<any>([]);
  const [sameHours, setSameHours] = useState(true);
  const { control, handleSubmit, register, watch, reset } = useForm({
    defaultValues: {
      provider_name: "",
    },
  });
  const { post, response } = useFetch();

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
  const confirmationClasses = useConfirmationDialogStyles();

  const isSmallScreen = useSmallScreen();

  const onSubmit = async () => {
    const finalServiceProviders: any = [];
    const serviceProvidersCopy = [...serviceProviders];

    serviceProvidersCopy.forEach((serviceProvider: any) => {
      const finalResult: any = {};

      finalResult.fullname = serviceProvider.providerName;

      const finalSelectedServices = serviceProvider.currentSelectedServices.map(
        (selectedService: any) => {
          return { serviceId: selectedService._id };
        }
      );

      finalResult.services = finalSelectedServices;
      finalResult.workTimes = serviceProvider.currentProviderData;
      finalServiceProviders.push(finalResult);
    });

    console.log(finalServiceProviders);

    await post("/serviceProvider/insert", finalServiceProviders);

    if (response.ok) {
      console.log("WORK!!");
      // setCurrentStep(3);
      // setShowMobileView && setShowMobileView(false);
    }
  };

  useEffect(() => {
    if (!rootState?.loading) {
      setDialogOpen(true);
    }
  }, [rootState?.loading]);

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
    // Setup breaks array
    const breaks = [];

    const workStartTime = moment(startWorking, "hh:mm");
    const workEndTime = moment(endWorking, "hh:mm");
    const startIsBeforeEnd = workStartTime.isBefore(workEndTime);
    let workTimesError = "";

    if (!startIsBeforeEnd) {
      workTimesError = "זמן התחלה גדול מזמן סיום";
    }

    const startBreakOneTime = moment(startBreakOne, "hh:mm");
    const endBreakOneTime = moment(endBreakOne, "hh:mm");
    const startBreakTwoTime = moment(startBreakTwo, "hh:mm");
    const endBreakTwoTime = moment(endBreakTwo, "hh:mm");
    const startBreakThreeTime = moment(startBreakThree, "hh:mm");
    const endBreakThreeTime = moment(endBreakThree, "hh:mm");

    const isStartBreakOneValid =
      startBreakOneTime.isBetween(workStartTime, workEndTime) &&
      startBreakOneTime.isAfter(workStartTime) &&
      startBreakOneTime.isBefore(endBreakOneTime);
    const isEndBreakOneValid =
      endBreakOneTime.isBetween(workStartTime, workEndTime) &&
      endBreakOneTime.isBefore(workEndTime);
    const isStartBreakTwoValid =
      startBreakTwoTime.isBetween(workStartTime, workEndTime) &&
      startBreakTwoTime.isAfter(workStartTime) &&
      startBreakTwoTime.isBefore(endBreakTwoTime);
    const isEndBreakTwoValid =
      endBreakTwoTime.isBetween(workStartTime, workEndTime) &&
      endBreakTwoTime.isBefore(workEndTime);
    const isStartBreakThreeValid =
      startBreakThreeTime.isBetween(workStartTime, workEndTime) &&
      startBreakThreeTime.isAfter(workStartTime) &&
      startBreakThreeTime.isBefore(endBreakThreeTime);
    const isEndBreakThreeValid =
      endBreakThreeTime.isBetween(workStartTime, workEndTime) &&
      endBreakThreeTime.isBefore(workEndTime);

    let breaksError = "";

    if (showBreakOne) {
      if (isStartBreakOneValid && isEndBreakOneValid) {
        breaks.push({ from: startBreakOne, to: endBreakOne });
      } else {
        breaksError =
          "נא לבדוק ששעות ההפסקה שהוגדרו הגיוניות ובין שעות העבודה של העסק";
      }
    }

    if (showBreakTwo) {
      if (isStartBreakTwoValid && isEndBreakTwoValid) {
        breaks.push({ from: startBreakTwo, to: endBreakTwo });
      } else {
        breaksError =
          "נא לבדוק ששעות ההפסקה שהוגדרו הגיוניות ובין שעות העבודה של העסק";
      }
    }

    if (showBreakThree) {
      if (isStartBreakThreeValid && isEndBreakThreeValid) {
        breaks.push({ from: startBreakThree, to: endBreakThree });
      } else {
        breaksError =
          "נא לבדוק ששעות ההפסקה שהוגדרו הגיוניות ובין שעות העבודה של העסק";
      }
    }

    if (!breaksError && !workTimesError) {
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

      setCurrentProviderData([
        ...currentProviderData,
        {
          days: selectedDaysNames,
          workingHours: {
            from: startWorking,
            to: endWorking,
          },
          breaks,
        },
      ]);

      // Reset and close
      setShowBreakOne(false);
      setShowBreakTwo(false);
      setShowBreakThree(false);
      setAdditionalHoursOpen(false);
      rootState?.setError("");
    } else if (breaksError) {
      rootState?.setError(breaksError);
    } else if (workTimesError) {
      rootState?.setError(workTimesError);
    }
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
    const daysToEnable = currentServiceProviderCopy[index].days;
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
    let providerData: any = {};

    const currentSelectedServices = services.filter((service: any) => {
      if (service.selected) {
        return service;
      }

      return null;
    });

    const initialWorkingHoursCopy = [...initialWorkingHours];
    const currentProviderDataCopy: any = [...currentProviderData];

    initialWorkingHoursCopy.map((w: any) => {
      return (w.days = translateDaysToHebrew(w.days));
    });

    currentProviderDataCopy.map((c: any) => {
      return (c.days = translateDaysToHebrew(c.days));
    });

    providerData.providerName = providerName;
    providerData.currentSelectedServices = currentSelectedServices;

    if (sameHours) {
      providerData.currentProviderData = initialWorkingHoursCopy;
    } else {
      providerData.currentProviderData = currentProviderDataCopy;
    }

    if (providerName !== "") {
      rootState?.setError("");

      if (currentSelectedServices.length > 0) {
        rootState?.setError("");

        if (providerData.currentProviderData.length > 0) {
          setServiceProviders([...serviceProviders, providerData]);
          // Reset and move to providers view
          resetDays();
          reset({ provider_name: "" });
          resetSelectedServices();
          setCurrentProviderData([]);
          setShowMobileView(true);
        } else {
          rootState?.setError(`נא להוסיף שעות פעילות עבור ${providerName}`);
        }
      } else {
        rootState?.setError(`נא לסמן לפחות שירות אחד ש${providerName} נותנ/ת`);
      }
    } else {
      rootState?.setError("נא לבדוק ששם נותן השירות תקין");
    }
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
    if (
      daysArr.includes("א") ||
      daysArr.includes("ב") ||
      daysArr.includes("ג") ||
      daysArr.includes("ד") ||
      daysArr.includes("ה") ||
      daysArr.includes("ו") ||
      daysArr.includes("ש")
    ) {
      return daysArr;
    }

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

  useEffect(() => {
    setInitialWorkingHours(businessWorkingHours?.res?.days);
  }, [businessWorkingHours?.res?.days]);

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
      <div
        style={{
          maxWidth: showMobileView ? "40rem" : "32rem",
          margin: "0 auto",
          paddingTop: showMobileView ? "2rem" : "0",
        }}
      >
        {showMobileView ? (
          <div>
            <Typography variant="h1" style={{ textAlign: "center" }}>
              נותני השירות בעסק
            </Typography>
            <div
              style={{
                paddingTop: "2rem",
                maxHeight: isSmallScreen ? "32rem" : "44rem",
                overflowY: "auto",
                padding: "1rem 1rem 3rem",
              }}
            >
              {serviceProviders.map((sprovider: any, index: number) => {
                return (
                  <SummaryProviderCard
                    cardTitle={<strong>{sprovider.providerName}</strong>}
                    expandable
                    key={index}
                  >
                    <div>
                      <strong>שירותים ש{sprovider.providerName} נותנ/ת:</strong>
                      {sprovider.currentSelectedServices.map(
                        (service: any, index: number) => {
                          return <p key={index}>{service.serviceName}</p>;
                        }
                      )}

                      {sprovider?.currentProviderData.map(
                        (w: any, i: number) => {
                          return (
                            <div key={i} style={{ margin: "2rem 0" }}>
                              <strong>שעות עבודה:</strong>
                              <p>
                                {w.workingHours?.from} - {w.workingHours?.to}
                              </p>
                              <strong>ימי עבודה</strong>
                              <p>{w.days}</p>
                              {w.breaks[0] && <strong>הפסקות</strong>}
                              {w.breaks[0] && (
                                <p>
                                  {w.breaks[0].from} - {w.breaks[0].to}
                                </p>
                              )}
                              {w.breaks[1] && (
                                <p>
                                  {w.breaks[1].from} - {w.breaks[1].to}
                                </p>
                              )}
                              {w.breaks[2] && (
                                <p>
                                  {w.breaks[2].from} - {w.breaks[2].to}
                                </p>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </SummaryProviderCard>
                );
              })}
            </div>

            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ marginTop: "2rem", paddingBottom: "3rem" }}
            >
              <Grid item>
                <ButtonStyle
                  variant="outlined"
                  onClick={() => setShowMobileView(false)}
                >
                  הוספת נותני שירות נוספים
                </ButtonStyle>
              </Grid>
              <Grid item>
                <ButtonStyle variant="contained" type="submit">
                  סיימתי, בוא נמשיך לשלב הבא
                </ButtonStyle>
              </Grid>
            </Grid>
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
                  padding: "1rem 0 1rem 1rem",
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

                {sameHours && initialWorkingHours?.length > 0 && (
                  <ServiceProvidersContainer>
                    {initialWorkingHours?.map((w: any, index: number) => {
                      const translatedDays = translateDaysToHebrew(w.days);
                      return (
                        <ServiceProviderCard key={index}>
                          <strong>ימי פעילות:</strong>
                          <p>
                            {translatedDays?.map((day: string) => {
                              return day + "' ";
                            })}
                          </p>

                          <strong>שעת התחלה וסיום:</strong>
                          <p>
                            {w.workingHours.from} - {w.workingHours.to}
                          </p>

                          {w.breaks.length !== 0 && (
                            <>
                              <strong>הפסקות:</strong>

                              {w.breaks[0] && (
                                <p>
                                  {w.breaks[0].from} - {w.breaks[0].to}
                                </p>
                              )}

                              {w.breaks[1] && (
                                <p>
                                  {w.breaks[1].from} - {w.breaks[1].to}
                                </p>
                              )}

                              {w.breaks[2] && (
                                <p>
                                  {w.breaks[2].from} - {w.breaks[2].to}
                                </p>
                              )}
                            </>
                          )}
                        </ServiceProviderCard>
                      );
                    })}
                  </ServiceProvidersContainer>
                )}

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
                      onClick={() => {
                        rootState?.setError("");
                        setAdditionalHoursOpen(true);
                      }}
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
                        {sprovider.days.includes("sunday") && "א' "}
                        {sprovider.days.includes("monday") && "ב' "}
                        {sprovider.days.includes("tuesday") && "ג' "}
                        {sprovider.days.includes("wednesday") && "ד' "}
                        {sprovider.days.includes("thursday") && "ה' "}
                        {sprovider.days.includes("friday") && "ו' "}
                        {sprovider.days.includes("saturday") && "ש' "}
                      </p>

                      <strong>שעת התחלה וסיום:</strong>
                      <p>
                        {sprovider.workingHours.from} -{" "}
                        {sprovider.workingHours.to}
                      </p>

                      {sprovider.breaks[0] && <strong>הפסקות:</strong>}
                      <p>
                        {sprovider.breaks[0] &&
                          `${sprovider.breaks[0].from} - ${sprovider.breaks[0].to}`}
                      </p>
                      <p>
                        {sprovider.breaks[1] &&
                          `${sprovider.breaks[1].from} - ${sprovider.breaks[1].to}`}
                      </p>

                      <p>
                        {sprovider.breaks[2] &&
                          `${sprovider.breaks[2].from} - ${sprovider.breaks[2].to}`}
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
              </ServiceProvidersContainer>
            </Grid>

            <Grid container style={{ margin: "2rem 0 2rem" }}>
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

            {serviceProviders.length > 0 && (
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <Button
                    variant="text"
                    onClick={() => setShowMobileView(true)}
                  >
                    לצפיה בנותני שירות שכבר הוספת
                  </Button>
                </Grid>
              </Grid>
            )}

            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ marginTop: "2rem", paddingBottom: "4rem" }}
            >
              <ContinueButton variant="contained" onClick={handleAddProvider}>
                הוספה
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

      <Dialog
        TransitionComponent={Transition}
        open={confirmationDialogOpen}
        classes={{ paper: confirmationClasses.paper }}
      >
        <ConfirmationDialogHeading>
          בחרת להשתמש באותן שעות שבהן העסק משתמש.
        </ConfirmationDialogHeading>
        <ConfirmationDialogSecondaryHeading>
          פעולה זאת תוביל למחיקת הימים והשעות שכבר בחרת בשלב זה. בטוח ?
        </ConfirmationDialogSecondaryHeading>

        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item md={6} container justify="center" alignItems="center">
            <ConfirmationActionButton
              onClick={() => handleConfirmationDialogActions(1)}
            >
              כן, אפשר למחוק
            </ConfirmationActionButton>
          </Grid>
          <Grid item md={6} container justify="center" alignItems="center">
            <ConfirmationActionButton
              variant="contained"
              onClick={() => handleConfirmationDialogActions(2)}
            >
              התחרטתי, בואו נשאיר
            </ConfirmationActionButton>
          </Grid>
        </Grid>
      </Dialog>
    </form>
  );
};

export default ServiceProviders;
