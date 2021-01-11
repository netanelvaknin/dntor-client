import { useEffect, useContext } from "react";
import businessRegisterContext from "../../context/business-register/businessRegisterContext";
import useFetch from "use-http";
import { useHistory } from "react-router-dom";

export const AdminPanel = () => {
  const { get, response } = useFetch();
  const businessRegisterState = useContext(businessRegisterContext);
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

  return <div style={{ paddingTop: "15rem" }}>admin panel</div>;
};

export default AdminPanel;
