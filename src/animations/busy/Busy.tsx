import LottieAnimation from "../LottieAnimation";
import BusyAnimation from "./busy-animation.json";

export const Busy = () => {
    return (
        <LottieAnimation
            speed={1}
            width={395}
            height={290}
            animation={BusyAnimation}
        />
    );
};

export default Busy;
