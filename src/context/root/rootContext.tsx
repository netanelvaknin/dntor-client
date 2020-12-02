import { createContext } from "react";

type rootContextType =
  | {
      error: string;
      loading: boolean;
      setError: (error: string) => void;
      setLoading: (isLoading: boolean) => void;
    }
  | undefined;

export default createContext<rootContextType>(undefined);
