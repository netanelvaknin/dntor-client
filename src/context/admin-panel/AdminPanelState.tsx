import { useState, ReactNode } from "react";
import AdminPanelContext from "./adminPanelContext";

interface RootStateProps {
  children?: ReactNode;
}

export const AdminPanelState = ({ children }: RootStateProps) => {
  const [activeNavItem, setActiveNavItem] = useState<
    "יומן תורים" | "קביעת תור" | "חסימת תור"
  >("יומן תורים");

  return (
    <AdminPanelContext.Provider
      value={{
        activeNavItem,
        setActiveNavItem,
      }}
    >
      {children}
    </AdminPanelContext.Provider>
  );
};

export default AdminPanelState;
