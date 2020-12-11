import { lazy, useState } from "react";
import {
  BusinessRegisterPageStyle,
  BusinessRegisterCard,
} from "./BusinessRegisterStyle";
import Stepper from "./stepper/Stepper";

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
        <Stepper steps={steps} activeStep={1} />
      </BusinessRegisterCard>
    </BusinessRegisterPageStyle>
  );
};

export default BusinessRegister;
