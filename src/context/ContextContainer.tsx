import { ReactNode } from "react";
import RootState from "./root/RootState";
import BusinessRegister from "./business-register/BusinessRegisterState";
import AdminPanel from "./admin-panel/AdminPanelState";

interface ContextContainerProps {
  children?: ReactNode;
}

export const ContextContainer = ({ children }: ContextContainerProps) => {
  return (
    <RootState>
      <BusinessRegister>
        <AdminPanel>{children}</AdminPanel>
      </BusinessRegister>
    </RootState>
  );
};

export default ContextContainer;
