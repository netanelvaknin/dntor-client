import {useEffect, useState} from "react";

export const useScreenSize = (minWidth: number, maxWidth: number) => {
    const getScreenSize = () => {
        return window.innerWidth > minWidth && window.innerWidth <= maxWidth;
    };

    const [isBetween, setIsBetween] = useState(getScreenSize());

    useEffect(() => {
        const handleResize = () => setIsBetween(getScreenSize());

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    return isBetween;
};

export default useScreenSize;
