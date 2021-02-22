import React, {lazy, useContext} from "react";
import "react-block-ui/style.css";
import {Route, Switch} from "react-router-dom";
import rootContext from "../context/root/rootContext";
import ProtectedRoute from "../framework/ProtectedRoute";
import {BlockUI, Navbar} from "../ui/index";

// pages
import LandingPage from "../pages/landing-page/LandingPage";
const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const BusinessRegister = lazy(() => import("../pages/business-register/BusinessRegister"));
const AdminPanel = lazy(() => import("../pages/admin-panel/AdminPanel"));
const Block = lazy(() => import("../pages/block/Block"));

const App = () => {
    const rootState = useContext(rootContext);

    const publicRoutes = [
        {path: "/", component: <LandingPage/>},
        {path: "/login", component: <Login/>},
        {path: "/register", component: <Register/>},
        {path: '/block', component: <Block />}
    ];

    const protectedRoutes = [
        {path: "/business-register", component: <BusinessRegister/>},
        {path: "/admin-panel", component: <AdminPanel/>},
    ];

    return (
        <>
            <BlockUI
                blocking={rootState?.loading}
                loader={rootState?.loader}
                title={rootState?.loaderTitle}/>
            <Navbar/>

            <Switch>
                {publicRoutes.map((route) => {
                    return (
                        <Route key={route.path} exact path={route.path}>
                            {route.component}
                        </Route>
                    );
                })}

                {protectedRoutes.map((route) => {
                    return (
                        <ProtectedRoute
                            key={route.path}
                            exact
                            component={route.component}
                            path={route.path}
                        />
                    );
                })}
            </Switch>
        </>
    );
};

export default App;
