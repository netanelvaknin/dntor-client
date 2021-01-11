import { ReactNode } from "react";
import RootState from "./root/RootState";
import BusinessRegister from "./business-register/BusinessRegisterState";

interface ContextContainerProps {
  children?: ReactNode;
}

export const ContextContainer = ({ children }: ContextContainerProps) => {
  return (
    <RootState>
      <BusinessRegister>{children}</BusinessRegister>
    </RootState>
  );
};

export default ContextContainer;
