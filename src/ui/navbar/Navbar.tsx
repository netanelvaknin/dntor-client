import { useState, useEffect } from "react";
import { NavbarStyle } from "./NavbarStyle";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useCookies, withCookies } from "react-cookie";

export const Navbar = () => {
  const loginAndRegisterText = "התחברות / הרשמה";
  const logOutText = "התנתקות";
  const history = useHistory();
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
    }
  };

  return (
    <NavbarStyle>
      <Button
        style={{ margin: "10rem", width: "17rem", height: "5rem" }}
        onClick={handleButtonClick}
      >
        {buttonText}
      </Button>
    </NavbarStyle>
  );
};

export default withCookies(Navbar);
