import LottieAnimation from "../LottieAnimation";
import NewAppointmentAnimation from "./new-appointment-animation.json";

export const NewAppointment = () => {
    return (
        <LottieAnimation
            speed={1}
            width={450}
            height={450}
            animation={NewAppointmentAnimation}
        />
    );
};

export default NewAppointment;
