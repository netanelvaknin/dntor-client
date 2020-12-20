import { useState, ReactNode } from "react";
import BusinessRegisterContext, {
  BusinessProfile,
  WorkingHours,
  Services,
  Notifications,
} from "./businessRegisterContext";

interface RootStateProps {
  children?: ReactNode;
}

export const BusinessRegisterState = ({ children }: RootStateProps) => {
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({});
  const [workingHours, setWorkingHours] = useState<WorkingHours>([]);
  const [services, setServices] = useState<Services>([]);
  const [notifications, setNotifications] = useState<Notifications>({});

  return (
    <BusinessRegisterContext.Provider
      value={{
        workingHours,
        businessProfile,
        services,
        notifications,
        setNotifications,
        setServices,
        setWorkingHours,
        setBusinessProfile,
      }}
    >
      {children}
    </BusinessRegisterContext.Provider>
  );
};

export default BusinessRegisterState;
