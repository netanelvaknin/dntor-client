import { useState, useEffect, useContext } from "react";
import { NavbarStyle } from "./NavbarStyle";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useCookies, withCookies } from "react-cookie";
import businessRegisterContext from "../../context/business-register/businessRegisterContext";

export const Navbar = (props: any) => {
  console.log(props);
  const businessRegisterState = useContext(businessRegisterContext);
  const loginAndRegisterText = "התחברות / הרשמה";
  const logOutText = "התנתקות";
  const history = useHistory();
  const location = useLocation();
  const [cookies, remove] = useCookies();
  const [buttonText, setButtonText] = useState(loginAndRegisterText);

  useEffect(() => {
    if (!cookies.token) {
      setButtonText(loginAndRegisterText);
    } else {
      setButtonText(logOutText);
    }
  }, [cookies]);

  const handleButtonClick = () => {
    if (!cookies.token) {
      history.push("/login");
    } else {
      remove("token", "");
      remove("token-expired-date", "");
      history.push("/");
      setButtonText(loginAndRegisterText);

      businessRegisterState && businessRegisterState.setServicesData({});
      businessRegisterState && businessRegisterState.setWorkTimesData({});
      businessRegisterState && businessRegisterState.setBusinessData({});
    }
  };

  return (
    <NavbarStyle>
      {location.pathname === "/" && cookies.token && (
        <Button onClick={() => history.push("/business-register")}>
          כניסה למערכת
        </Button>
      )}
      <Button
        style={{ width: "17rem", height: "5rem" }}
        onClick={handleButtonClick}
      >
        {buttonText}
      </Button>
    </NavbarStyle>
  );
};

export default withCookies(Navbar);
