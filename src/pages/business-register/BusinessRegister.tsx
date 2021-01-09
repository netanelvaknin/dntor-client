import { lazy, useState, useContext, useEffect } from "react";
import {
  BusinessRegisterPageStyle,
  BusinessRegisterCard,
  CardLabel,
  ArrowRightButton,
} from "./BusinessRegisterStyle";
import Stepper from "./stepper/Stepper";
import { useSmallScreen } from "../../hooks/index";
import arrowRight from "../../assets/icons/arrow-right.svg";
import rootContext from "../../context/root/rootContext";
import useFetch from "use-http";
// import { useHistory } from "react-router-dom";

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
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const isSmallScreen = useSmallScreen();
  const [showMobileView, setShowMobileView] = useState(false);
  const { get, response } = useFetch();
  const [businessData, setBusinessData] = useState();
  const [workTimesData, setWorkTimesData] = useState();
  const [servicesData, setServicesData] = useState();
  // const history = useHistory();

  useEffect(() => {
    rootState?.setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  async function getBusinessData() {
    const data = await get("/business");
    if (response.ok) setBusinessData(data);
  }

  async function getWorkTimesData() {
    const data = await get("business/businessWorkTimes");
    if (response.ok) setWorkTimesData(data);
  }

  async function getServicesData() {
    const data = await get("/business/services");
    if (response.ok) setServicesData(data);
  }

  const getData = () => {
    if (currentStep === 1) {
      getBusinessData();
    } else if (currentStep === 2) {
      getWorkTimesData();
    } else if (currentStep === 3) {
      getServicesData();
    }
  };

  useEffect(() => {
    getData();
  }, [currentStep]);

  // useEffect(() => {
  //   /*
  //    * For better ux, we want to redirect the user to relevant route.
  //    * In addition, We want to autofill the forms if the user already
  //    * filled him before and quit.
  //    *
  //    */

  //   if (businessData && servicesData && workTimesData) {
  //     // history.push("/admin-panel");
  //   }
  // }, [businessData, servicesData, workTimesData, history]);

  const steps = [
    {
      stepNumber: 1,
      stepName: "פרופיל העסק",
      component: (
        <BusinessProfile
          initialBusinessProfileData={businessData}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      stepNumber: 2,
      stepName: "שעות פעילות",
      component: (
        <WorkingHours
          initialWorkTimesData={workTimesData}
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
          initialServicesData={servicesData}
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
      getData();

      // @ts-ignore
      setCurrentStep((c) => c - 1);
    }
  };

  return (
    <BusinessRegisterPageStyle>
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
