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

  useEffect(() => {
    rootState?.setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const steps = [
    {
      stepNumber: 1,
      stepName: "פרופיל העסק",
      component: <BusinessProfile setCurrentStep={setCurrentStep} />,
    },
    {
      stepNumber: 2,
      stepName: "שעות פעילות",
      component: (
        <WorkingHours
          setCurrentStep={setCurrentStep}
          showMobileView={showMobileView}
          setShowMobileView={setShowMobileView}
        />
      ),
    },
    {
      stepNumber: 3,
      stepName: "הגדרת שירות",
      component: (
        <BusinessServices
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
      // @ts-ignore
      setCurrentStep(currentStep - 1);
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
