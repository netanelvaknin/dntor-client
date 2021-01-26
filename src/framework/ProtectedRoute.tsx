import React, {useState} from "react";
import {Redirect, Route, useHistory} from "react-router-dom";
import {useCookies, withCookies} from "react-cookie";
import moment from "moment";

interface ProtectedRouteProps {
    component: React.ReactNode;
    exact: boolean;
    path: string;
    children?: React.ReactNode;
}

const ProtectedRoute = ({
                            component,
                            exact,
                            path,
                            children,
                        }: ProtectedRouteProps) => {
    const history = useHistory();
    const [cookies, remove] = useCookies();
    const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.token);
    const Component = component;

    const tokenExpiredDate = cookies["token-expired-date"];

    if (tokenExpiredDate) {
        // Check if token is expired
        const now = moment().format("YYYY-MM-DD");
        const isAfter = moment(now).isAfter(tokenExpiredDate, "day");

        if (isAfter) {
            setIsAuthenticated(false);
            // @ts-ignore
            remove("token");
            history.push("/login");
        }
    }

    return (
        <>
            {isAuthenticated ? (
                <Route path={path} exact={exact}>
                    {Component}
                </Route>
            ) : (
                <Redirect to="/login"/>
            )}
        </>
    );
};

export default withCookies(ProtectedRoute);
