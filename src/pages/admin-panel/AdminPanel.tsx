import { useEffect, useContext, lazy } from "react";
import businessRegisterContext from "../../context/business-register/businessRegisterContext";
import adminPanelContext from "../../context/admin-panel/adminPanelContext";
import useFetch from "use-http";
import { useHistory } from "react-router-dom";
import { SubMenu } from "./AdminPanelStyle";

const AppointmentsLog = lazy(() =>
  import("./appointments-log/AppointmentsLog")
);
const NewAppointments = lazy(() =>
  import("./new-appointments/NewAppointments")
);

const BlockAppointments = lazy(() =>
  import("./block-appointments/BlockAppointments")
);

export const AdminPanel = () => {
  const { get, response } = useFetch();
  const businessRegisterState = useContext(businessRegisterContext);
  const adminPanelState = useContext(adminPanelContext);

  const history = useHistory();

  async function getBusinessData() {
    const data = await get("/business");
    if (response.ok)
      businessRegisterState && businessRegisterState.setBusinessData(data);
  }

  async function getWorkTimesData() {
    const data = await get("business/businessWorkTimes");
    if (response.ok)
      businessRegisterState && businessRegisterState.setWorkTimesData(data);
  }

  async function getServicesData() {
    const data = await get("/business/services");
    if (response.ok)
      businessRegisterState && businessRegisterState.setServicesData(data);
  }

  const getAllData = () => {
    getBusinessData();
    getWorkTimesData();
    getServicesData();
  };

  useEffect(() => {
    getAllData();

    businessRegisterState && businessRegisterState.setServicesData({});
    businessRegisterState && businessRegisterState.setWorkTimesData({});
    businessRegisterState && businessRegisterState.setBusinessData({});
    businessRegisterState && businessRegisterState.setFechedOnce(false);
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
        return <AppointmentsLog />;
      case "קביעת תור":
        return <NewAppointments />;
      case "חסימת תור":
        return <BlockAppointments />;
    }
  };

  return (
    <div>
      <SubMenu></SubMenu>
      {renderScreen()}
    </div>
  );
};

export default AdminPanel;
