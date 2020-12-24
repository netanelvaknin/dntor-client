import LottieAnimation from "../LottieAnimation";
import LoaderAnimation from "./loader-animation.json";

export const Loader = () => {
  return (
    <LottieAnimation
      speed={1}
      width={280}
      height={300}
      animation={LoaderAnimation}
    />
  );
};

export default Loader;
