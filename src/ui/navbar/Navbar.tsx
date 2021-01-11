import { useState, useEffect, useContext } from "react";
import {
  NavbarStyle,
  ConnectAndRegisterButton,
  TemporaryLogo,
  IconButtonStyle,
  AdminActionsContainer,
} from "./NavbarStyle";
import { useHistory, useLocation } from "react-router-dom";
import { useCookies, withCookies } from "react-cookie";
import businessRegisterContext from "../../context/business-register/businessRegisterContext";
import { useSmallScreen } from "../../hooks/index";
import DotsIcon from "../../assets/icons/mobile_dots.svg";
import NotificationsIcon from "../../assets/icons/notifications.svg";
import ShareIcon from "../../assets/icons/share.svg";
import ProfileIcon from "../../assets/icons/profile.svg";

export const Navbar = (props: any) => {
  const businessRegisterState = useContext(businessRegisterContext);
  const loginAndRegisterText = "התחברות / הרשמה";
  const logOutText = "התנתקות";
  const history = useHistory();
  const location = useLocation();
  const [cookies, remove] = useCookies();
  const [buttonText, setButtonText] = useState(loginAndRegisterText);
  const isSmallScreen = useSmallScreen();

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
      <TemporaryLogo onClick={() => history.push("/")}>
        יהיה כאן לוגו
      </TemporaryLogo>

      <div>
        {!isSmallScreen ? (
          <>
            {location.pathname === "/" && (
              <ConnectAndRegisterButton
                variant="outlined"
                onClick={handleButtonClick}
              >
                {buttonText}
              </ConnectAndRegisterButton>
            )}

            {location.pathname === "/" && cookies.token && (
              <ConnectAndRegisterButton
                variant="contained"
                onClick={() => history.push("/business-register")}
              >
                כניסה למערכת
              </ConnectAndRegisterButton>
            )}
          </>
        ) : (
          <IconButtonStyle>
            <img src={DotsIcon} alt="" />
          </IconButtonStyle>
        )}
      </div>

      {location.pathname === "/admin-panel" && (
        <>
          {!isSmallScreen && (
            <>
              <AdminActionsContainer>
                <span>יומן תורים</span>
                <span>קביעת תור</span>
                <span>חסימת תור</span>
              </AdminActionsContainer>

              <div>
                <IconButtonStyle style={{ margin: "0 1rem" }}>
                  <img src={ShareIcon} alt="שיתוף לינק לקביעת תורים" />
                </IconButtonStyle>
                <IconButtonStyle style={{ margin: "0 1rem" }}>
                  <img src={NotificationsIcon} alt="צפיה בעדכונים אחרונים" />
                </IconButtonStyle>
                <IconButtonStyle style={{ margin: "0 1rem" }}>
                  <img
                    src={ProfileIcon}
                    alt="פתיחת פעולות פרופיל"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                </IconButtonStyle>
              </div>
            </>
          )}
        </>
      )}
    </NavbarStyle>
  );
};

export default withCookies(Navbar);
