import { createContext } from "react";

type rootContextType =
  | {
      error: string;
      loading: boolean;
      loader: React.ReactNode;
      setError: (error: string) => void;
      setLoading: (isLoading: boolean) => void;
      setLoader: (loader: any) => void;
    }
  | undefined;

export default createContext<rootContextType>(undefined);
