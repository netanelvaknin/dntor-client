import {useState, useEffect} from 'react';

export const useScroll = () => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    const getScrollYposition = () => {
       return window.scrollY;
    }

    useEffect(() => {
        const handleScroll = () => setScrollPosition(getScrollYposition());

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return scrollPosition;
}