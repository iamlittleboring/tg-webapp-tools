import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns helpers for requesting and exiting Telegram Mini App fullscreen mode.
 *
 * @example
 * ```tsx
 * const fullscreen = useFullscreen();
 * fullscreen.request();
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useFullscreen = () => {
    const webApp = useWebApp();

    const request = useCallback(() => webApp?.requestFullscreen?.(), [webApp]);
    const exit = useCallback(() => webApp?.exitFullscreen?.(), [webApp]);

    return { request, exit };
};

export default useFullscreen;
