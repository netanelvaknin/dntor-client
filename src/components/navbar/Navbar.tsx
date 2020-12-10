import { NavbarStyle } from "./NavbarStyle";

interface NavbarProps {
  label?: string;
}
export const Navbar = ({ label }: NavbarProps) => {
  return <NavbarStyle></NavbarStyle>;
};

export default Navbar;
