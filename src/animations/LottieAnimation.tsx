import Lottie from "react-lottie";

interface LottieAnimationProps {
    isStopped?: boolean;
    isPaused?: boolean;
    animation: React.ReactNode;
    speed?: number;
    loop?: boolean;
    width?: number;
    height?: number;
    className?: string;
}

const LottieAnimation = ({
                             isPaused,
                             isStopped,
                             animation,
                             speed = 1,
                             loop = true,
                             width = 400,
                             height = 400,
                             className,
                         }: LottieAnimationProps) => {
    const defaultOptions = {
        loop,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className={className}>
            <Lottie
                options={defaultOptions}
                height={height}
                width={width}
                speed={speed}
                isStopped={isStopped}
                isPaused={isPaused}
                isClickToPauseDisabled={true}
            />
        </div>
    );
};

export default LottieAnimation;
