import { useContext, useState } from "react";
import rootContext from "../context/root/rootContext";
import { Provider } from "use-http";

interface HttpProviderProps {
  children?: React.ReactNode;
}

export const HttpProvider = ({ children }: HttpProviderProps) => {
  const rootState = useContext(rootContext);
  const [token, setToken] = useState("token");

  const options = {
    interceptors: {
      request: async ({ options }: any) => {
        rootState?.setError("");
        rootState?.setLoading(true);

        // First, check if token is exist
        if (rootState?.token) {
          setToken(rootState.token);
        }

        // Then, check if expired
        // if (isExpired(token) {
        // token = await getNewToken();
        // setToken(token);
        // })

        // Set the header
        options.headers.Accept = "application/json";
        options.headers.Authorization = `Bearer ${token}`;
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

export default HttpProvider;
