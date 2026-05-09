import { useCallback } from "react";
import { AccelerometerStartParams } from "@twa-dev/types";
import useWebApp from "./useWebApp";

/**
 * Returns the Telegram Accelerometer instance and start/stop helpers.
 *
 * @example
 * ```tsx
 * const accelerometer = useAccelerometer();
 * accelerometer.start({ refresh_rate: 1000 });
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#accelerometer
 */
const useAccelerometer = () => {
    const accelerometer = useWebApp()?.Accelerometer;

    const start = useCallback(
        (
            params: AccelerometerStartParams,
            callback?: (isStarted: boolean) => unknown
        ) => accelerometer?.start?.(params, callback),
        [accelerometer]
    );

    const stop = useCallback(
        (callback?: (isStopped: boolean) => unknown) =>
            accelerometer?.stop?.(callback),
        [accelerometer]
    );

    return {
        accelerometer: accelerometer ?? null,
        start,
        stop,
    };
};

export default useAccelerometer;
