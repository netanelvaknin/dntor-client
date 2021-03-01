import LottieAnimation from "../LottieAnimation";
import LoadingAppointmentsAnimation from "./loading-appointments-animation.json";

export const LoadingAppointments = () => {
    return (
        <LottieAnimation
            speed={1}
            width={100}
            height={100}
            animation={LoadingAppointmentsAnimation}
        />
    );
};

export default LoadingAppointments;
