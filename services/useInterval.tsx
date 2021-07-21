import { useEffect, useRef } from "react";

export const useInterval = (callback: Function, delay: number) => {
    const savedCallback = useRef() as React.MutableRefObject<Function>;

    useEffect(() => {
        if (savedCallback) {
            savedCallback.current = callback;
        }
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback && savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
