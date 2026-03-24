import { useCallback } from "react";
import { GyroscopeStartParams } from "@twa-dev/types";
import useWebApp from "./useWebApp";

const useGyroscope = () => {
    const gyroscope = useWebApp()?.Gyroscope;

    const start = useCallback(
        (
            params: GyroscopeStartParams,
            callback?: (isStarted: boolean) => unknown
        ) => gyroscope?.start?.(params, callback),
        [gyroscope]
    );

    const stop = useCallback(
        (callback?: (isStopped: boolean) => unknown) =>
            gyroscope?.stop?.(callback),
        [gyroscope]
    );

    return {
        gyroscope: gyroscope ?? null,
        start,
        stop,
    };
};

export default useGyroscope;
