import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that tells Telegram the Mini App is ready to be displayed.
 *
 * @example
 * ```tsx
 * const ready = useReady();
 * ready();
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useReady = () => {
    const webApp = useWebApp();

    return useCallback(() => webApp?.ready?.(), [webApp]);
};

export default useReady;
