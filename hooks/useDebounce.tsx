import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number) {

    const [state, setState] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setState(value),  delay || 500);

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])


    return state;
}

