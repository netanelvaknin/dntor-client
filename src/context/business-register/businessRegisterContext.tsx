import { createContext } from "react";

export type BusinessProfile =
  | {
      name: string;
      phone: string;
      email: string;
      address: string;
    }
  | {};

export type WorkingHours =
  | [
      {
        days: string[];
        workingHours: {
          from: string;
          to: string;
        };
        breakHours: {
          from: string;
          to: string;
        };
      }
    ]
  | [];

export type Services =
  | [
      {
        serviceName: string;
        duration: string;
      }
    ]
  | [];

export type Notifications =
  | {
      smsNotifications: boolean;
      emailNotifications: boolean;
      customersNotifications: boolean;
      notificiationsTiming: {
        hourBefore: boolean;
        dayBefore: boolean;
        twoDaysBefore: boolean;
      };
    }
  | {};

type businessRegisterContextType =
  | {
      businessProfile: BusinessProfile;
      workingHours: WorkingHours;
      services: Services;
      notifications: Notifications;
      setNotifications: React.Dispatch<React.SetStateAction<Notifications>>;
      setServices: React.Dispatch<React.SetStateAction<Services>>;
      setWorkingHours: React.Dispatch<React.SetStateAction<WorkingHours>>;
      setBusinessProfile: React.Dispatch<
        React.SetStateAction<{} | BusinessProfile>
      >;
    }
  | undefined;

export default createContext<businessRegisterContextType>(undefined);
