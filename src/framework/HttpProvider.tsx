import { useContext, useState, useEffect } from "react";
import rootContext from "../context/root/rootContext";
import { Provider } from "use-http";
import { useCookies, withCookies } from "react-cookie";
import { useLocation, useHistory } from "react-router-dom";
import moment from "moment";
interface HttpProviderProps {
  children?: React.ReactNode;
}

export const HttpProvider = ({ children }: HttpProviderProps) => {
  const [cookies, remove] = useCookies();
  const rootState = useContext(rootContext);
  const [token, setToken] = useState("");
  const history = useHistory();

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

        const tokenExpiredDate = cookies["token-expired-date"];

        if (tokenExpiredDate) {
          const now = moment().format("YYYY-MM-DD");
          const isAfter = moment(now).isAfter(tokenExpiredDate, "day");

          if (isAfter) {
            // @ts-ignore
            remove("token");
            history.push("/login");
          }
        }

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
