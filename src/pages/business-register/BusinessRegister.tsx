import { lazy, useState, useContext, useEffect } from "react";
import {
  BusinessRegisterPageStyle,
  BusinessRegisterCard,
  CardLabel,
  ArrowRightButton,
  useDialogStyles,
  DialogHeading,
  DialogText,
} from "./BusinessRegisterStyle";
import Stepper from "./stepper/Stepper";
import { useSmallScreen } from "../../hooks/index";
import arrowRight from "../../assets/icons/arrow-right.svg";
import rootContext from "../../context/root/rootContext";
import useFetch from "use-http";
import { useHistory } from "react-router-dom";
import businessRegisterContext from "../../context/business-register/businessRegisterContext";
import { Dialog } from "@material-ui/core";
import { useLastLocation } from "react-router-last-location";
import { GradientButton } from "../../components/index";

// Steps components
const BusinessProfile = lazy(() =>
  import("./business-profile/BusinessProfile")
);
const WorkingHours = lazy(() => import("./working-hours/WorkingHours"));
const BusinessServices = lazy(() =>
  import("./business-services/BusinessServices")
);
const NotificationsManagment = lazy(() =>
  import("./notifications-managment/NotificationsManagment")
);

export interface CurrentStep {
  setCurrentStep: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4>>;
}

export const BusinessRegister = () => {
  const rootState = useContext(rootContext);
  const businessRegisterState = useContext(businessRegisterContext);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(2);
  const [, setState] = useState({});
  const [showMobileView, setShowMobileView] = useState(false);
  const [open, setOpen] = useState(false);
  const { get, response } = useFetch();
  const history = useHistory();
  const lastLocation = useLastLocation();
  const classes = useDialogStyles();

  const isSmallScreen = useSmallScreen();

  useEffect(() => {
    if (lastLocation?.pathname === "/") {
      setTimeout(() => {
        setOpen(true);
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rootState?.setError("");

    if (currentStep > 1) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  async function getBusinessData() {
    const data = await get("/business");
    if (response.ok)
      businessRegisterState && businessRegisterState.setBusinessData(data);
  }

  async function getWorkTimesData() {
    const data = await get("business/businessWorkTimes");
    if (response.ok)
      businessRegisterState && businessRegisterState.setWorkTimesData(data);
  }

  async function getServicesData() {
    const data = await get("/business/services");
    if (response.ok)
      businessRegisterState && businessRegisterState.setServicesData(data);
  }

  const getAllData = () => {
    getBusinessData();
    getWorkTimesData();
    getServicesData();
  };

  const getDataByStep = () => {
    if (currentStep === 1) {
      getBusinessData();
    } else if (currentStep === 2) {
      getWorkTimesData();
    } else if (currentStep === 3) {
      getServicesData();
    }
  };

  useEffect(() => {
    getAllData();

    return () => {
      setState({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      businessRegisterState?.businessData?.res?.name &&
      businessRegisterState?.servicesData?.res?.services?.length > 0 &&
      businessRegisterState?.workTimesData?.res?.days?.length > 0 &&
      !businessRegisterState.fetchedOnce
    ) {
      history.push("/admin-panel");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessRegisterState]);

  useEffect(() => {
    getDataByStep();

    return () => {
      setState({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const steps = [
    {
      stepNumber: 1,
      stepName: "פרופיל העסק",
      component: (
        <BusinessProfile
          initialBusinessProfileData={
            businessRegisterState && businessRegisterState.businessData
          }
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      stepNumber: 2,
      stepName: "שעות פעילות",
      component: (
        <WorkingHours
          initialWorkTimesData={
            businessRegisterState && businessRegisterState.workTimesData
          }
          setCurrentStep={setCurrentStep}
          showMobileView={showMobileView}
          setShowMobileView={setShowMobileView}
          currentStep={currentStep}
        />
      ),
    },
    {
      stepNumber: 3,
      stepName: "הגדרת שירות",
      component: (
        <BusinessServices
          initialServicesData={
            businessRegisterState && businessRegisterState.servicesData
          }
          setCurrentStep={setCurrentStep}
          showMobileView={showMobileView}
          setShowMobileView={setShowMobileView}
        />
      ),
    },
    {
      stepNumber: 4,
      stepName: "ניהול התראות",
      component: <NotificationsManagment setCurrentStep={setCurrentStep} />,
    },
  ];

  const handleBack = () => {
    // Dont go back, just flip the view to other view (mobile)
    if (showMobileView) {
      setShowMobileView(false);
    } else if (currentStep >= 2) {
      businessRegisterState && businessRegisterState.setFechedOnce(true);
      getDataByStep();

      // @ts-ignore
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <BusinessRegisterPageStyle>
      <Dialog open={open} classes={{ paper: classes.paper }}>
        <DialogHeading>שמנו לב ש...</DialogHeading>
        <DialogText>התחלת את תהליך הגדרת העסק שלך ועצרת באמצע</DialogText>
        <GradientButton onClick={() => setOpen(false)}>
          {" "}
          להמשך הגדרת העסק
        </GradientButton>
      </Dialog>
      <BusinessRegisterCard>
        {currentStep !== 1 && (
          <ArrowRightButton onClick={handleBack}>
            <img src={arrowRight} alt="כפתור חזור" />
          </ArrowRightButton>
        )}

        {isSmallScreen && (
          <CardLabel>{steps[currentStep - 1].stepName}</CardLabel>
        )}

        {steps[currentStep - 1].component}

        <Stepper steps={steps} activeStep={currentStep} />
      </BusinessRegisterCard>
    </BusinessRegisterPageStyle>
  );
};

export default BusinessRegister;
