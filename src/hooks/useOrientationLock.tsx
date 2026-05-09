import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns helpers for locking and unlocking the Mini App orientation.
 *
 * @example
 * ```tsx
 * const orientationLock = useOrientationLock();
 * orientationLock.lock();
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useOrientationLock = () => {
    const webApp = useWebApp();

    const lock = useCallback(() => webApp?.lockOrientation?.(), [webApp]);
    const unlock = useCallback(() => webApp?.unlockOrientation?.(), [webApp]);

    return { lock, unlock };
};

export default useOrientationLock;
