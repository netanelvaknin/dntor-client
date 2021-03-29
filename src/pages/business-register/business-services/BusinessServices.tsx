import React, {useContext, useEffect, useRef, useState} from "react";
import {
    BusinessServicesHeading,
    DurationText,
    LeftGrid,
    MobileAddButton,
    RightGrid,
    ServiceCard,
    ServiceText,
} from "./BusinessServicesStyle";
import {Grid, IconButton} from "@material-ui/core";
import {DurationSelector, TextField} from "../../../ui/index";
import {ContinueButtonStyle} from "../BusinessRegisterStyle";
import TrashIcon from "../../../assets/icons/trash_icon.svg";
import {useForm} from "react-hook-form";
import {CurrentStep} from "../BusinessRegister";
import {useRequestBuilder, useSmallScreen} from '../../../hooks';
import {Alert} from "@material-ui/lab";

import rootContext from "../../../context/root/rootContext";

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
  const serviceNameRef = useRef<HTMLElement | null>(null);
  const servicePriceRef = useRef<HTMLElement | null>(null);

  const { control, register, reset, watch, handleSubmit } = useForm({
    defaultValues: {
      service_name: "",
      service_price: "",
    },
  });

  const requestBuilder = useRequestBuilder();
  const rootState = useContext(rootContext);

  const [duration, setDuration] = useState<any>({hours: '00', minutes: '00'});
  const [services, setServices] = useState<any>([]);
  const [canAdd, setCanAdd] = useState(false);
  const serviceName = watch("service_name");
  const servicePrice = watch("service_price");

  const isSmallScreen = useSmallScreen();

  const handleAddWorkingHours = () => {
    if (serviceName.length < 2) {
      rootState?.setError("שם השירות לא תקין");
    } else {
      if (serviceName && (duration.hours > 0 || duration.minutes > 0)) {
        rootState?.setError("");
        const { hours, minutes } = duration;
        const finalDuration = `${hours}:${minutes}`;

        setServices([
          ...services,
          {
            serviceName: serviceName,
            price: servicePrice || null,
            duration: finalDuration,
          },
        ]);

        if (isSmallScreen) {
          setShowMobileView && setShowMobileView(true);
        }

        reset({
          service_name: "",
          service_price: "",
        });

        setDuration({hours: '00', minutes: '00'})
      } else {
        rootState?.setError("נא לבדוק שמילאת את שם ומשך השירות");
      }
    }
  };

  const removeService = async (index: number, serviceId: string) => {
    const servicesCopy = [...services];
    servicesCopy.splice(index, 1);
    setServices(servicesCopy);

    if (serviceId) {
      await requestBuilder({
        method: 'post',
        endpoint: '/business/removeService',
        payload: { serviceId }
      });
    }
  };

  useEffect(() => {
    if (serviceName) {
      setCanAdd(true);
    } else {
      setCanAdd(false);
    }
  }, [serviceName, duration]);

  const onSubmit = async () => {
    const servicesCopy = services.filter((service: any) => {
      if (!service._id) {
        return service;
      }

      return null;
    });

    let insertServicesResponse;
    if (servicesCopy.length > 0) {
      insertServicesResponse = await requestBuilder({
        method: 'post',
        endpoint: '/business/insertServices',
        payload: servicesCopy
      });
    } else if (servicesCopy.length < 1 && services.length > 0) {
      setCurrentStep(4);
      setShowMobileView && setShowMobileView(false);
    }

    if (insertServicesResponse?.ok) {
      setCurrentStep(4);
      setShowMobileView && setShowMobileView(false);
    }
  };

  useEffect(() => {
    if (initialServicesData?.res?.services?.length > 0) {
      const servicesCopy = initialServicesData?.res?.services;

      setServices(servicesCopy);
    }
  }, [initialServicesData]);

  useEffect(() => {
    if (serviceNameRef.current !== null) {
      serviceNameRef.current.blur();
    }

    if (servicePriceRef.current !== null) {
      servicePriceRef.current.blur();
    }
  }, [duration]);

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
              inputRef={serviceNameRef}
              helperText="לדוגמא: תספורת גבר, בניית ציפורניים ועוד"
              register={register}
              name="service_name"
            />

            <TextField
              control={control}
              label="מחיר השירות (ספרות בלבד)"
              inputRef={servicePriceRef}
              type="number"
              helperText={
                <span>
                  <span style={{ color: "#265FB1", fontWeight: "bold" }}>
                    לא חובה
                  </span>{" "}
                  אך מומלץ להוסיף
                </span>
              }
              register={register}
              name="service_price"
              min={10}
            />

            <Grid
              item
              container
              justify="center"
              alignItems="center"
              style={{ marginTop: "3rem" }}
            >
              <DurationText>משך התור :</DurationText>
              <DurationSelector
                  value={duration}
                  onChange={(hours, minutes) => {
                    setDuration({ hours, minutes });
                  }}
              />
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
                      {service.price && (
                        <>
                          <strong>מחיר: </strong>
                          <span style={{ display: "inline" }}>
                            {service.price} ש"ח
                          </span>
                        </>
                      )}
                    </ServiceCard>
                    <IconButton
                      onClick={() => removeService(index, service._id)}
                    >
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
                      {service.price && (
                        <>
                          <strong>מחיר: </strong>
                          <span style={{ display: "inline" }}>
                            {service.price} ש"ח
                          </span>
                        </>
                      )}
                    </ServiceCard>

                    <IconButton
                      onClick={() => removeService(index, service._id)}
                    >
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
                חזור להוספת שירות נוסף
              </MobileAddButton>
            </Grid>

            <Grid container justify="center" alignItems="center">
              <ContinueButtonStyle type="submit" disabled={services.length < 1}>
                סיימתי, המשך לשלב הבא
              </ContinueButtonStyle>
            </Grid>
          </Grid>
        )}

        {isSmallScreen && !showMobileView && services.length > 0 && (
          <Grid item container justify="center" style={{ margin: "2rem 0 0" }}>
            <MobileAddButton
              variant="text"
              onClick={() => setShowMobileView && setShowMobileView(true)}
            >
              הצג את השירותים שכבר הוספתי
            </MobileAddButton>
          </Grid>
        )}

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

        {!showMobileView && (
          <>
            <Grid container justify="center" alignItems="center">
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
