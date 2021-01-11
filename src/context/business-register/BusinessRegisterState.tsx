import { useState, ReactNode } from "react";
import BusinessRegisterContext from "./businessRegisterContext";

interface RootStateProps {
  children?: ReactNode;
}

export const BusinessRegisterState = ({ children }: RootStateProps) => {
  const [businessData, setBusinessData] = useState();
  const [workTimesData, setWorkTimesData] = useState();
  const [servicesData, setServicesData] = useState();
  const [fetchedOnce, setFechedOnce] = useState(false);

  return (
    <BusinessRegisterContext.Provider
      value={{
        businessData,
        workTimesData,
        servicesData,
        fetchedOnce,
        setBusinessData,
        setWorkTimesData,
        setServicesData,
        setFechedOnce,
      }}
    >
      {children}
    </BusinessRegisterContext.Provider>
  );
};

export default BusinessRegisterState;
