import { useState, useEffect } from 'react';
/**
 * This function returns the current dimensions of the window and updates them when the window is
 * resized.
 * @returns The `useWindowDimensions` custom hook returns an object containing the current width and
 * height of the browser window.
 * code by Diego A. Monsalves Cabello
 */

export default function useWindowDimensions() {

    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : 0;
        const height = hasWindow ? window.innerHeight : 0;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }// eslint-disable-next-line
    }, [hasWindow]);

    return windowDimensions;
}