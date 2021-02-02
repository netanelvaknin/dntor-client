import LottieAnimation from "../LottieAnimation";
import RocketAnimation from "./rocket-animation.json";

export const Rocket = () => {
    return (
        <LottieAnimation
            speed={1}
            width={280}
            height={300}
            animation={RocketAnimation}
        />
    );
};

export default Rocket;
