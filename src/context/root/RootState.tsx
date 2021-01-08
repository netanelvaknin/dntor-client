import { useState, ReactNode } from "react";
import RootContext from "./rootContext";
// import { Loader } from "../../animations/index";

interface RootStateProps {
  children?: ReactNode;
}

export const RootState = ({ children }: RootStateProps) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState();

  return (
    <RootContext.Provider
      value={{
        error,
        setError,
        loading,
        setLoading,
        loader,
        setLoader,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export default RootState;
