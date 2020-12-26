import { NavbarStyle } from "./NavbarStyle";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

export const Navbar = () => {
  const history = useHistory();

  return (
    <NavbarStyle>
      <Button
        style={{ margin: "10rem", width: "10rem", height: "5rem" }}
        onClick={() => history.push("/login")}
      >
        Login
      </Button>
    </NavbarStyle>
  );
};

export default Navbar;
