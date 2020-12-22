import { useState } from "react";
import {
  BusinessServicesHeading,
  DurationText,
  RightGrid,
  LeftGrid,
  ServiceCard,
  ServiceText,
  AddButton,
} from "./BusinessServicesStyle";
import { Grid, IconButton } from "@material-ui/core";
import { TextField, DurationSelector } from "../../../ui/index";
import { ContinueButtonStyle } from "../BusinessRegisterStyle";
import { useSmallScreen } from "../../../hooks/index";
import TrashIcon from "../../../assets/icons/trash_icon.svg";
import PlusIcon from "../../../assets/icons/plus_icon.svg";
import { useForm } from "react-hook-form";

export const BusinessServices = () => {
  const { register, reset, getValues, handleSubmit } = useForm();
  const isSmallScreen = useSmallScreen();
  const [showMobileView, setShowMobileView] = useState(false);
  const [duration, setDuration] = useState<any>();
  const [services, setServices] = useState<any>([]);

  const handleAddWorkingHours = () => {
    setServices([
      ...services,
      {
        serviceName: getValues("service_name"),
        serviceDuration: duration,
      },
    ]);

    if (isSmallScreen) {
      setShowMobileView(true);
    }

    reset({
      service_name: "",
    });
  };

  console.log(services);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="row">
        <Grid md={12} justify="center" alignItems="center" container item>
          <BusinessServicesHeading variant="h1">
            הגדרת שירות
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

            {services.length > 0 && !isSmallScreen && (
              <Grid
                container
                item
                justify="center"
                style={{ marginTop: "3rem" }}
              >
                <AddButton variant="text">הוספה</AddButton>
              </Grid>
            )}
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
                      <ServiceText>
                        {service.serviceDuration.hours} שעות ו -{" "}
                        {service.serviceDuration.minutes} דק'
                      </ServiceText>
                    </ServiceCard>
                    <IconButton>
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
            <Grid
              item
              container
              justify="flex-end"
              style={{ padding: "0 1rem" }}
            >
              <IconButton onClick={() => setShowMobileView(false)}>
                <img src={PlusIcon} alt="הוספה" />
              </IconButton>
            </Grid>
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
                      {service.serviceName}
                      {service.serviceDuration.hours} שעות ו -{" "}
                      {service.serviceDuration.minutes} דק'
                    </ServiceCard>

                    <IconButton>
                      <img src={TrashIcon} alt="מחיקה" />
                    </IconButton>
                  </Grid>
                );
              })}
            </LeftGrid>

            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ margin: "3rem 0" }}
            >
              <ContinueButtonStyle>המשך</ContinueButtonStyle>
            </Grid>
          </Grid>
        )}

        {!showMobileView && (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ margin: "4rem 0" }}
          >
            <ContinueButtonStyle onClick={handleAddWorkingHours}>
              אישור
            </ContinueButtonStyle>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default BusinessServices;
