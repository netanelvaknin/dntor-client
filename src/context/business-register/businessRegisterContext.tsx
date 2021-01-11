import { createContext } from "react";

type rootContextType =
  | {
      businessData: any;
      workTimesData: any;
      servicesData: any;
      fetchedOnce: any;
      setBusinessData: any;
      setWorkTimesData: any;
      setServicesData: any;
      setFechedOnce: any;
    }
  | undefined;

export default createContext<rootContextType>(undefined);
