import { useCallback } from "react";
import { DeviceOrientationStartParams } from "@twa-dev/types";
import useWebApp from "./useWebApp";

/**
 * Returns the Telegram DeviceOrientation instance and start/stop helpers.
 *
 * @example
 * ```tsx
 * const deviceOrientation = useDeviceOrientation();
 * deviceOrientation.start({ refresh_rate: 1000 });
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#deviceorientation
 */
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
