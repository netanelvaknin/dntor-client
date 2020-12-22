import { useState } from "react";
import { Provider } from "use-http";

interface HttpProviderProps {
  children?: React.ReactNode;
}

export const HttpProvider = ({ children }: HttpProviderProps) => {
  //   const [token, setToken] = useState("token");

  const options = {
    interceptors: {
      // every time we make an http request, this will run 1st before the request is made
      // url, path and route are supplied to the interceptor
      // request options can be modified and must be returned
      //   request: async ({ options, url, path, route }) => {
      //     if (isExpired(token)) {
      //       token = await getNewToken();
      //       setToken(token);
      //     }
      //     options.headers.Authorization = `Bearer ${token}`;
      //     return options;
      //   },
    },
  };

  return (
    <Provider url="https://dntor.com" options={options}>
      {children}
    </Provider>
  );
};

export default HttpProvider;
