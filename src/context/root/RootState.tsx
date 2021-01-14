import { useState, ReactNode, useEffect } from "react";
import RootContext from "./rootContext";
// import { Loader } from "../../animations/index";

interface RootStateProps {
  children?: ReactNode;
}

export const RootState = ({ children }: RootStateProps) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState();

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(!loading);
      }, 2000);
    }
  }, [loading]);

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
