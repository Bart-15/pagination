import { useEffect, useRef } from "react";

export const useDidMountEffect = (fn: () => any, inputs: Array<any>) => {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) {
            fn();
        } else {
            didMountRef.current = true;
        }

    }, inputs);   


    // Reset on unmount for the next mount.
    useEffect(() => {
        return () => {
            didMountRef.current = false;
        }
    }, [])
};