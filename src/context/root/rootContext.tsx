import { createContext } from "react";

type rootContextType =
  | {
      error: string;
      loading: boolean;
      token: string;
      setError: (error: string) => void;
      setLoading: (isLoading: boolean) => void;
      setToken: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined;

export default createContext<rootContextType>(undefined);
