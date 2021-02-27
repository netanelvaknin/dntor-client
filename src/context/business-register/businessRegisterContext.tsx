import { createContext } from "react";

type businessRegisterContextType =
  | {
      businessData: any;
      workTimesData: any;
      servicesData: any;
      fetchedOnce: any;
      editMode: boolean;
      setBusinessData: any;
      setWorkTimesData: any;
      setServicesData: any;
      serviceProvidersData: any;
      setServiceProvidersData: any;
      setFechedOnce: any;
      setEditMode: any;
    }
  | undefined;

export default createContext<businessRegisterContextType>(undefined);
