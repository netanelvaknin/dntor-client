import { useState, useEffect } from "react";
import {
  BusinessServicesHeading,
  DurationText,
  RightGrid,
  LeftGrid,
  ServiceCard,
  ServiceText,
  MobileAddButton,
} from "./BusinessServicesStyle";
import { Grid, IconButton } from "@material-ui/core";
import { TextField, DurationSelector } from "../../../ui/index";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";
import { useSmallScreen } from "../../../hooks/index";
import TrashIcon from "../../../assets/icons/trash_icon.svg";
import { useForm } from "react-hook-form";
import { CurrentStep } from "../BusinessRegister";
import useFetch from "use-http";
// import rootContext from "../../../context/root/rootContext";

interface BusinessServicesProps extends CurrentStep {
  showMobileView?: boolean;
  setShowMobileView?: React.Dispatch<React.SetStateAction<boolean>>;
  initialServicesData?: any;
}

export const BusinessServices = ({
  setCurrentStep,
  showMobileView,
  setShowMobileView,
  initialServicesData,
}: BusinessServicesProps) => {
  const { control, register, reset, watch, handleSubmit } = useForm({
    defaultValues: {
      service_name: "",
    },
  });
  const { post, response } = useFetch();
  // const rootState = useContext(rootContext);

  const [duration, setDuration] = useState<any>();
  const [services, setServices] = useState<any>([]);
  const [canAdd, setCanAdd] = useState(false);
  const serviceName = watch("service_name");
  const isSmallScreen = useSmallScreen();

  const handleAddWorkingHours = () => {
    if (serviceName && (duration.hours > 0 || duration.minutes > 0)) {
      const { hours, minutes } = duration;
      let finalDuration = "";

      if (hours.toString().length < 2) {
        finalDuration = `0${hours}:`;
      } else {
        finalDuration = `${hours}:`;
      }

      if (minutes.toString().length < 2) {
        finalDuration = `${finalDuration}0${minutes}`;
      } else {
        finalDuration = `${finalDuration}${minutes}`;
      }

      setServices([
        ...services,
        {
          serviceName: serviceName,
          duration: finalDuration,
        },
      ]);

      if (isSmallScreen) {
        setShowMobileView && setShowMobileView(true);
      }

      reset({
        service_name: "",
      });
    }
  };

  const removeService = (index: number) => {
    const servicesCopy = [...services];
    servicesCopy.splice(index, 1);
    setServices(servicesCopy);
  };

  useEffect(() => {
    if (serviceName && (duration.hours > 0 || duration.minutes > 0)) {
      setCanAdd(true);
    } else {
      setCanAdd(false);
    }
  }, [serviceName, duration]);

  const onSubmit = async () => {
    await post("/business/upsertServices", services);

    if (response.ok) {
      setCurrentStep(4);
      setShowMobileView && setShowMobileView(false);
    }
  };

  useEffect(() => {
    if (initialServicesData) {
      const servicesCopy = initialServicesData.res.services;
      servicesCopy.forEach((service: any, index: number) => {
        delete servicesCopy[index]._id;
      });

      setServices(servicesCopy);
    }
  }, [initialServicesData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid container direction="row">
        <Grid md={12} justify="center" alignItems="center" container item>
          <BusinessServicesHeading variant="h1">
            הגדרת שירותים
          </BusinessServicesHeading>
        </Grid>

        {!showMobileView && (
          <RightGrid
            $servicesLength={services.length}
            md={6}
            sm={6}
            container
            item
            direction="column"
            justify="flex-start"
            alignItems="center"
            style={{ margin: "0 auto" }}
          >
            <TextField
              control={control}
              label="שם השירות"
              helperText="לדוגמא: תספורת, בניית ציפורניים ועוד"
              register={register}
              name="service_name"
            />

            <Grid
              item
              container
              justify="center"
              alignItems="center"
              style={{ marginTop: "3rem" }}
            >
              <DurationText>קביעת משך התור</DurationText>
              <DurationSelector onChange={(value: any) => setDuration(value)} />
            </Grid>
          </RightGrid>
        )}

        {/* DESKTOP VIEW OF SELECTED HOURS */}
        {!isSmallScreen && services.length > 0 && (
          <LeftGrid
            md={6}
            sm={6}
            container
            item
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <div
              style={{
                maxHeight: "30rem",
                overflow: "auto",
                padding: ".5rem .5rem .5rem 2rem",
              }}
            >
              {services.map((service: any, index: any) => {
                return (
                  <Grid container alignItems="center" key={index}>
                    <ServiceCard>
                      <ServiceText style={{ fontWeight: "bold" }}>
                        {service.serviceName}
                      </ServiceText>
                      <strong>משך התור: </strong>
                      <ServiceText>
                        {service.duration.split(":")[0]} שעות ו-{" "}
                        {service.duration.split(":")[1]} דק'
                      </ServiceText>
                    </ServiceCard>
                    <IconButton onClick={() => removeService(index)}>
                      <img src={TrashIcon} alt="מחיקה" />
                    </IconButton>
                  </Grid>
                );
              })}
            </div>
          </LeftGrid>
        )}

        {/* MOBILE VIEW OF SELECTED HOURS */}
        {isSmallScreen && showMobileView && (
          <Grid container>
            <LeftGrid
              md={6}
              container
              item
              direction="row"
              justify="center"
              alignItems="center"
            >
              {services.map((service: any, index: any) => {
                return (
                  <Grid
                    container
                    alignItems="center"
                    key={index}
                    style={{ maxWidth: "32rem" }}
                  >
                    <ServiceCard>
                      <ServiceText style={{ fontWeight: "bold" }}>
                        {service.serviceName}
                      </ServiceText>
                      <strong>משך התור: </strong>
                      <ServiceText>
                        {service.duration.split(":")[0]} שעות ו-{" "}
                        {service.duration.split(":")[1]} דק'
                      </ServiceText>
                    </ServiceCard>

                    <IconButton onClick={() => removeService(index)}>
                      <img src={TrashIcon} alt="מחיקה" />
                    </IconButton>
                  </Grid>
                );
              })}
            </LeftGrid>

            <Grid item container justify="center" style={{ margin: "2rem 0" }}>
              <MobileAddButton
                variant="contained"
                onClick={() => setShowMobileView && setShowMobileView(false)}
              >
                הוספת שירות נוסף
              </MobileAddButton>
            </Grid>

            <Grid container justify="center" alignItems="center">
              <ContinueButtonStyle type="submit" disabled={services.length < 1}>
                סיימתי, המשך לשלב הבא
              </ContinueButtonStyle>
            </Grid>
          </Grid>
        )}

        {!showMobileView && (
          <>
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ marginTop: "2rem" }}
            >
              <ContinueButtonStyle
                variant="contained"
                onClick={handleAddWorkingHours}
                disabled={!canAdd}
              >
                הוספה
              </ContinueButtonStyle>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ margin: "2rem 0 4rem" }}
            >
              <ContinueButtonStyle type="submit" disabled={services.length < 1}>
                סיימתי, המשך לשלב הבא
              </ContinueButtonStyle>
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
};

export default BusinessServices;
