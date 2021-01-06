import { useContext, useState, useEffect } from "react";
import rootContext from "../context/root/rootContext";
import { Provider } from "use-http";
import { useCookies, withCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
interface HttpProviderProps {
  children?: React.ReactNode;
}

export const HttpProvider = ({ children }: HttpProviderProps) => {
  const [cookies] = useCookies();
  const rootState = useContext(rootContext);
  const [token, setToken] = useState("");

  const location = useLocation();

  useEffect(() => {
    // Clean the error state every route change
    rootState?.setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    setToken(cookies.token);
  }, [cookies]);

  const options = {
    interceptors: {
      request: async ({ options }: any) => {
        rootState?.setError("");
        rootState?.setLoading(true);

        // Set headers
        options.headers.Accept = "application/json";
        // options.headers.Authorization = `Bearer ${token}`;
        options.headers["access-token"] = `${token || ""}`;
        return options;
      },
      response: async ({ response }: any) => {
        setTimeout(() => {
          rootState?.setLoading(false);
        }, 3000);

        const res = response;
        return res;
      },
    },
  };

  return (
    <Provider url="https://dev.dntor.com" options={options}>
      {children}
    </Provider>
  );
};

export default withCookies(HttpProvider);
