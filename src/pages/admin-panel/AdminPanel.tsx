import {useEffect, useContext, lazy} from "react";
import businessRegisterContext from "../../context/business-register/businessRegisterContext";
import adminPanelContext from "../../context/admin-panel/adminPanelContext";
import {useHistory} from "react-router-dom";
import {AdminPanelContainer} from "./AdminPanelStyle";
import AppointmentsLog from "./appointments-log/AppointmentsLog";

const NewAppointments = lazy(() => import("./new-appointments/NewAppointments"));
const BlockAppointments = lazy(() => import("./block-appointments/BlockAppointments"));

export const AdminPanel = () => {
    const businessRegisterState: any = useContext(businessRegisterContext);
    const adminPanelState = useContext(adminPanelContext);
    const history = useHistory();

    useEffect(function resetActiveNavItem() {
        adminPanelState?.setActiveNavItem('יומן תורים');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (
            businessRegisterState?.businessData?.res?.name &&
            businessRegisterState?.servicesData?.res?.services?.length > 0 &&
            businessRegisterState?.workTimesData?.res?.days?.length > 0
        ) {
            return;
        }

        history.push("/business-register");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const renderScreen = () => {
        switch (adminPanelState?.activeNavItem) {
            case "יומן תורים":
                return <AppointmentsLog/>;
            case "קביעת תור":
                return <NewAppointments
                    adminPanelState={adminPanelState}
                    initialServiceProviders={businessRegisterState?.serviceProvidersData?.res}
                />;
            case "חסימת תור":
                return <BlockAppointments serviceProviderData={businessRegisterState?.serviceProvidersData?.res}/>;
        }
    };

    return (
        <AdminPanelContainer>
            {renderScreen()}
        </AdminPanelContainer>
    );
};

export default AdminPanel;
