import LottieAnimation from "../LottieAnimation";
import CalculatingHoursAnimation from "./calculating-hours-animation.json";

export const CalculatingHours = () => {
    return (
        <LottieAnimation
            speed={1}
            loop={true}
            width={200}
            height={200}
            animation={CalculatingHoursAnimation}
        />
    );
};

export default CalculatingHours;
