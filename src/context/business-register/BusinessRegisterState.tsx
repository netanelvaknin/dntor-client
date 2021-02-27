import {useState, ReactNode} from "react";
import BusinessRegisterContext from "./businessRegisterContext";

interface RootStateProps {
    children?: ReactNode;
}

export const BusinessRegisterState = ({children}: RootStateProps) => {
    const [businessData, setBusinessData] = useState();
    const [workTimesData, setWorkTimesData] = useState();
    const [servicesData, setServicesData] = useState();
    const [serviceProvidersData, setServiceProvidersData] = useState();
    const [fetchedOnce, setFechedOnce] = useState(false);
    const [editMode, setEditMode] = useState(false);

    return (
        <BusinessRegisterContext.Provider
            value={{
                businessData,
                workTimesData,
                servicesData,
                fetchedOnce,
                editMode,
                setBusinessData,
                setWorkTimesData,
                setServicesData,
                serviceProvidersData,
                setServiceProvidersData,
                setFechedOnce,
                setEditMode,
            }}
        >
            {children}
        </BusinessRegisterContext.Provider>
    );
};

export default BusinessRegisterState;
