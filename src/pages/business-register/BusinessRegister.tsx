import { lazy, useState } from "react";
import {
  BusinessRegisterPageStyle,
  BusinessRegisterCard,
  CardLabel,
  ArrowRightButton,
} from "./BusinessRegisterStyle";
import Stepper from "./stepper/Stepper";
import { useSmallScreen } from "../../hooks/index";
import arrowRight from "../../assets/icons/arrow-right.svg";

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
const BusinessWorkers = lazy(() =>
  import("./business-workers/BusinessWorkers")
);

export const BusinessRegister = () => {
  const [currentStep] = useState(3);
  const isSmallScreen = useSmallScreen();

  const steps = [
    { stepNumber: 1, stepName: "פרופיל העסק", component: <BusinessProfile /> },
    {
      stepNumber: 2,
      stepName: "שעות פעילות",
      component: <WorkingHours />,
    },
    { stepNumber: 3, stepName: "הגדרת שירות", component: <BusinessServices /> },
    {
      stepNumber: 4,
      stepName: "ניהול התראות",
      component: <NotificationsManagment />,
    },
    { stepNumber: 5, stepName: "נותני שירות", component: <BusinessWorkers /> },
  ];

  return (
    <BusinessRegisterPageStyle>
      <BusinessRegisterCard>
        <ArrowRightButton>
          <img src={arrowRight} alt="כפתור חזור" />
        </ArrowRightButton>

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
