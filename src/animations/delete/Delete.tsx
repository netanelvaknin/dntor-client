import LottieAnimation from "../LottieAnimation";
import DeleteAnimation from "./delete-animation.json";

export const Delete = () => {
    return (
        <LottieAnimation
            speed={1}
            loop={false}
            width={280}
            height={300}
            animation={DeleteAnimation}
        />
    );
};

export default Delete;
