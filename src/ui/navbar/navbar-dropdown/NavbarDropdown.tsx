import { forwardRef, useContext } from "react";
import { MenuStyle, MenuItemStyle } from "./NavbarDropdownStyle";
import { ConnectAndRegisterButton } from "../NavbarStyle";
import businessRegisterContext from "../../../context/business-register/businessRegisterContext";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import xIcon from "../../../assets/icons/x_icon.svg";
import { IconButton } from "@material-ui/core";

interface NavbarDropdownProps {
  open: boolean;
  anchorEl: Element | ((element: Element) => Element) | null;
  onClose: (open: boolean) => void;
}

export const NavbarDropdown = forwardRef((props: NavbarDropdownProps, ref) => {
  const businessRegisterState = useContext(businessRegisterContext);
  const [, remove] = useCookies();
  const history = useHistory();

  const handleButtonClick = () => {
    props.onClose(false);
    remove("token", "");
    remove("token-expired-date", "");
    history.push("/");

    businessRegisterState?.setServicesData({});
    businessRegisterState?.setWorkTimesData({});
    businessRegisterState?.setBusinessData({});
  };

  return (
    <MenuStyle
      open={props.open}
      onClose={() => props.onClose(false)}
      anchorEl={props.anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 80,
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <ConnectAndRegisterButton
          variant="outlined"
          onClick={handleButtonClick}
        >
          התנתקות
        </ConnectAndRegisterButton>
        <IconButton onClick={() => props.onClose(false)}>
          <img src={xIcon} alt="סגירה" />
        </IconButton>
      </div>

      <MenuItemStyle onClick={() => {
        businessRegisterState?.setEditMode(true);
        props.onClose(false);
        history.push('/business-register');
      }}>
        עריכת הגדרות העסק
      </MenuItemStyle>

      <MenuItemStyle disabled>
        הצגת הודעה ללקוחות (בקרוב)
      </MenuItemStyle>
    </MenuStyle>
  );
});

export default NavbarDropdown;
