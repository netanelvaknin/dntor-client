import {Dialog} from "@material-ui/core";
import React, {lazy, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useLastLocation} from "react-router-last-location";
import {useRequestBuilder} from '../../hooks';
import arrowRight from "../../assets/icons/arrow-right.svg";
import {GradientButton} from "../../components";
import businessRegisterContext from "../../context/business-register/businessRegisterContext";
import rootContext from "../../context/root/rootContext";
import {useSmallScreen} from "../../hooks/index";
import {
    ArrowRightButton,
    BusinessRegisterCard,
    BusinessRegisterPageStyle,
    CardLabel,
    DialogHeading,
    DialogText,
    useDialogStyles,
} from "./BusinessRegisterStyle";
import Stepper from "./stepper/Stepper";

// Steps components
const BusinessProfile = lazy(() =>
    import("./business-profile/BusinessProfile")
);
const WorkingHours = lazy(() => import("./working-hours/WorkingHours"));
const BusinessServices = lazy(() =>
    import("./business-services/BusinessServices")
);
const NotificationsManagment = lazy(() =>
    import("./notifications-managment/NotificationsManagment")
);

const ServiceProviders = lazy(() =>
    import("./service-providers/ServiceProviders")
);

export interface CurrentStep {
    setCurrentStep: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4 | 5>>;
}

export const BusinessRegister = () => {
    const rootState = useContext(rootContext);
    const businessRegisterState: any = useContext(businessRegisterContext);
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
    const [, setState] = useState({});
    const [showMobileView, setShowMobileView] = useState(false);
    const [open, setOpen] = useState(false);
    const requestBuilder = useRequestBuilder();
    const history = useHistory();
    const lastLocation = useLastLocation();
    const classes = useDialogStyles();

    const isSmallScreen = useSmallScreen();

    useEffect(() => {
        if (lastLocation?.pathname === "/") {
            setTimeout(() => {
                setOpen(true);
            }, 300);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        rootState?.setError("");
        window.scrollTo(0, 0);

        if (currentStep > 1) {
            setOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep]);

    async function getBusinessData() {
        const businessDataResponse = await requestBuilder({
            endpoint: '/business',
            method: 'get',
        })

        if (businessDataResponse.ok)
            businessRegisterState?.setBusinessData(businessDataResponse.data);
    }

    async function getWorkTimesData() {
        const workTimeDataResponse = await requestBuilder({
            method: 'get',
            endpoint: '/business/businessWorkTimes'
        });

        if (workTimeDataResponse.ok)
            businessRegisterState?.setWorkTimesData(workTimeDataResponse.data);
    }

    async function getServicesData() {
        const servicesDataResponse = await requestBuilder({
            method: 'get',
            endpoint: '/business/services'
        });

        if (servicesDataResponse.ok)
            businessRegisterState?.setServicesData(servicesDataResponse.data);
    }

    async function getServicesProviderData() {
        const serviceProvidersResponse = await requestBuilder({
            method: 'get',
            endpoint: '/serviceProvider/getAll'
        });

        if (serviceProvidersResponse.ok)
            businessRegisterState?.setServiceProvidersData(serviceProvidersResponse.data);
    }

    const getAllData = () => {
        getBusinessData();
        getWorkTimesData();
        getServicesData();
        getServicesProviderData();
    };

    const getDataByStep = () => {
        if (currentStep === 1) {
            getBusinessData();
        } else if (currentStep === 2) {
            getWorkTimesData();
        } else if (currentStep === 3) {
            getServicesData();
        } else if (currentStep === 4) {
            getWorkTimesData();
            getServicesData();
            getServicesProviderData();
        }
    };

    useEffect(() => {
        getAllData();

        return () => {
            setState({});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (
            businessRegisterState?.businessData?.res?.name &&
            businessRegisterState?.servicesData?.res?.services?.length > 0 &&
            businessRegisterState?.workTimesData?.res?.days?.length > 0 &&
            businessRegisterState?.serviceProvidersData?.res.length > 0 &&
            !businessRegisterState?.fetchedOnce &&
            !businessRegisterState?.editMode
        ) {
            history.push("/admin-panel");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [businessRegisterState]);

    useEffect(() => {
        getDataByStep();

        return () => {
            setState({});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep]);

    const steps = [
        {
            stepNumber: 1,
            stepName: "פרופיל העסק",
            component: (
                <BusinessProfile
                    initialBusinessProfileData={businessRegisterState?.businessData}
                    setCurrentStep={setCurrentStep}
                />
            ),
        },
        {
            stepNumber: 2,
            stepName: "שעות פעילות",
            component: (
                <WorkingHours
                    initialWorkTimesData={businessRegisterState?.workTimesData}
                    setCurrentStep={setCurrentStep}
                    showMobileView={showMobileView}
                    setShowMobileView={setShowMobileView}
                />
            ),
        },
        {
            stepNumber: 3,
            stepName: "הגדרת שירות",
            component: (
                <BusinessServices
                    initialServicesData={businessRegisterState?.servicesData}
                    setCurrentStep={setCurrentStep}
                    showMobileView={showMobileView}
                    setShowMobileView={setShowMobileView}
                />
            ),
        },
        {
            stepNumber: 4,
            stepName: "נותני שירות",
            component: (
                <ServiceProviders
                    showMobileView={showMobileView}
                    setShowMobileView={setShowMobileView}
                    setCurrentStep={setCurrentStep}
                    initialServiceProvidersData={businessRegisterState?.serviceProvidersData}
                    initialServicesData={businessRegisterState?.servicesData}
                    businessWorkingHours={businessRegisterState?.workTimesData}
                />
            ),
        },
        {
            stepNumber: 5,
            stepName: "ניהול התראות",
            component: <NotificationsManagment setCurrentStep={setCurrentStep}/>,
        },
    ];

    const handleBack = () => {
        // Dont go back, just flip the view to other view (mobile)
        if (showMobileView) {
            setShowMobileView(false);
        } else if (currentStep >= 2) {
            businessRegisterState?.setFechedOnce(true);
            getDataByStep();

            // @ts-ignore
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <BusinessRegisterPageStyle>
            <Dialog open={open} classes={{paper: classes.paper}}>
                <DialogHeading>שמנו לב ש...</DialogHeading>
                <DialogText>התחלת את תהליך הגדרת העסק שלך ועצרת באמצע</DialogText>
                <GradientButton onClick={() => setOpen(false)}>
                    {" "}
                    להמשך הגדרת העסק
                </GradientButton>
            </Dialog>
            <BusinessRegisterCard>
                {currentStep !== 1 && (
                    <ArrowRightButton onClick={handleBack}>
                        <img src={arrowRight} alt="כפתור חזור"/>
                    </ArrowRightButton>
                )}

                {isSmallScreen && (<CardLabel>{steps[currentStep - 1].stepName}</CardLabel>)}

                {steps[currentStep - 1].component}

                <Stepper steps={steps} activeStep={currentStep}/>
            </BusinessRegisterCard>
        </BusinessRegisterPageStyle>
    );
};

export default BusinessRegister;
