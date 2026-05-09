import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that closes the Telegram Mini App.
 *
 * @example
 * ```tsx
 * const close = useClose();
 * close();
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useClose = () => {
    const webApp = useWebApp();

    return useCallback(() => webApp?.close?.(), [webApp]);
};

export default useClose;
