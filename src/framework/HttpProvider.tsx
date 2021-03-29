import {useContext, useEffect, useState} from "react";
import rootContext from "../context/root/rootContext";
import {Provider} from "use-http";
import {useCookies, withCookies} from "react-cookie";
import {useLocation, useHistory} from "react-router-dom";

interface HttpProviderProps {
    children?: React.ReactNode;
}

export const HttpProvider = ({children}: HttpProviderProps) => {
    const [cookies] = useCookies();
    const rootState = useContext(rootContext);
    const [token, setToken] = useState("");

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        // Clean the error state every route change
        rootState?.setError("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    useEffect(() => {
        setToken(cookies.token);
    }, [cookies]);

    const options = {
        cachePolicy: "no-cache",
        timeout: 10000,
        onTimeout: () => {
            history.push('/block');
            rootState?.setLoading(false);
        },
        onError: (e: any) => {
            // console.log(e);
        },
        interceptors: {
            request: async ({options}: any) => {
                rootState?.setError("");

                // Set headers
                options.headers.Accept = "application/json";
                options.headers["access-token"] = `${token || ""}`;
                return options;
            },
            response: async ({response}: any) => {
                return response;
            },
        },
    };

    return (
        // @ts-ignore
        <Provider url="http://devapi.fastor.co.il" options={options}>
            {children}
        </Provider>
    );
};

export default withCookies(HttpProvider);
