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
  const [currentStep] = useState(1);
  const isSmallScreen = useSmallScreen();

  const steps = [
    { number: 1, name: "פרופיל העסק", component: <BusinessProfile /> },
    { number: 2, name: "שעות פעילות", component: <WorkingHours /> },
    { number: 3, name: "הגדרת שירות", component: <BusinessServices /> },
    { number: 4, name: "ניהול התראות", component: <NotificationsManagment /> },
    { number: 5, name: "נותני שירות", component: <BusinessWorkers /> },
  ];

  return (
    <BusinessRegisterPageStyle>
      <BusinessRegisterCard>
        <ArrowRightButton>
          <img src={arrowRight} alt="כפתור חזור" />
        </ArrowRightButton>
        {isSmallScreen && <CardLabel>{steps[currentStep - 1].name}</CardLabel>}
        <Stepper steps={steps} activeStep={currentStep} />
      </BusinessRegisterCard>
    </BusinessRegisterPageStyle>
  );
};

export default BusinessRegister;
