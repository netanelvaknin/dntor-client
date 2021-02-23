import LottieAnimation from "../LottieAnimation";
import DollarsAnimation from "./dollars-animation.json";

export const Dollars = () => {
    return (
        <LottieAnimation
            speed={1}
            width={395}
            height={290}
            animation={DollarsAnimation}
        />
    );
};

export default Dollars;
