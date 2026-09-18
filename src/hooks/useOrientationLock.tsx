import { useCallback } from "react";
import useWebApp from "./useWebApp";
import useIsVersionAtLeast from "./useIsVersionAtLeast";

/**
 * Returns helpers for locking and unlocking the Mini App orientation.
 *
 * `isSupported` reflects Bot API 8.0+ support.
 *
 * @example
 * ```tsx
 * const orientationLock = useOrientationLock();
 * if (orientationLock.isSupported) orientationLock.lock();
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useOrientationLock = () => {
    const webApp = useWebApp();
    const isSupported = useIsVersionAtLeast("8.0");

    const lock = useCallback(() => webApp?.lockOrientation?.(), [webApp]);
    const unlock = useCallback(() => webApp?.unlockOrientation?.(), [webApp]);

    return { lock, unlock, isSupported };
};

export default useOrientationLock;
