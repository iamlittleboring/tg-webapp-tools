import { useCallback } from "react";
import { LocationData } from "@twa-dev/types";
import useWebApp from "./useWebApp";

/**
 * Returns the Telegram LocationManager instance and location helpers.
 *
 * @example
 * ```tsx
 * const location = useLocationManager();
 * location.getLocation((data) => console.log(data));
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#locationmanager
 */
const useLocationManager = () => {
    const locationManager = useWebApp()?.LocationManager;

    const init = useCallback(
        (callback?: (isInitialized: boolean) => unknown) =>
            locationManager?.init?.(callback),
        [locationManager]
    );

    const getLocation = useCallback(
        (callback: (data: LocationData | null) => unknown) =>
            locationManager?.getLocation?.(callback),
        [locationManager]
    );

    const openSettings = useCallback(
        () => locationManager?.openSettings?.(),
        [locationManager]
    );

    return {
        locationManager: locationManager ?? null,
        init,
        getLocation,
        openSettings,
    };
};

export default useLocationManager;
