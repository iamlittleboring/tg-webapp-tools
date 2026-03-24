import { useCallback } from "react";
import { DeviceOrientationStartParams } from "@twa-dev/types";
import useWebApp from "./useWebApp";

const useDeviceOrientation = () => {
    const deviceOrientation = useWebApp()?.DeviceOrientation;

    const start = useCallback(
        (
            params: DeviceOrientationStartParams,
            callback?: (isStarted: boolean) => unknown
        ) => deviceOrientation?.start?.(params, callback),
        [deviceOrientation]
    );

    const stop = useCallback(
        (callback?: (isStopped: boolean) => unknown) =>
            deviceOrientation?.stop?.(callback),
        [deviceOrientation]
    );

    return {
        deviceOrientation: deviceOrientation ?? null,
        start,
        stop,
    };
};

export default useDeviceOrientation;
