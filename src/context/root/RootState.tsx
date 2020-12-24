import { useState, ReactNode } from "react";
import RootContext from "./rootContext";

interface RootStateProps {
  children?: ReactNode;
}

export const RootState = ({ children }: RootStateProps) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  return (
    <RootContext.Provider
      value={{
        error,
        setError,
        loading,
        setLoading,
        token,
        setToken,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export default RootState;
