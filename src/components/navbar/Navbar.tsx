import { NavbarStyle } from "./NavbarStyle";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
  const history = useHistory();

  return (
    <NavbarStyle>
      <button
        style={{ margin: "10rem", width: "10rem", height: "5rem" }}
        onClick={() => history.push("/login")}
      >
        Login
      </button>
    </NavbarStyle>
  );
};

export default Navbar;
