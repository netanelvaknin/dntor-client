// import { useState } from "react";
import { Provider } from "use-http";

interface HttpProviderProps {
  children?: React.ReactNode;
}
export const HttpProvider = ({ children }: HttpProviderProps) => {
  //   const [token, setToken] = useState("token");
  const options = {
    interceptors: {
      request: async ({ options }: any) => {
        options.headers.Accept = "application/json";
        return options;
      },
    },
  };

  return (
    <Provider url="https://restcountries.eu" options={options}>
      {children}
    </Provider>
  );
};

export default HttpProvider;
