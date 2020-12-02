import { ReactNode } from "react";
import RootState from "./root/RootState";

interface ContextContainerProps {
  children?: ReactNode;
}

export const ContextContainer = ({ children }: ContextContainerProps) => {
  return <RootState>{children}</RootState>;
};

export default ContextContainer;
