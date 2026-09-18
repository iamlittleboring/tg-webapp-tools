import { useCallback } from "react";
import useWebApp from "./useWebApp";
import useIsVersionAtLeast from "./useIsVersionAtLeast";

/**
 * Returns helpers for requesting and exiting Telegram Mini App fullscreen mode.
 *
 * `isSupported` reflects Bot API 8.0+ support and can be used to hide fullscreen UI on older clients.
 *
 * @example
 * ```tsx
 * const fullscreen = useFullscreen();
 * if (fullscreen.isSupported) fullscreen.request();
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useFullscreen = () => {
    const webApp = useWebApp();
    const isSupported = useIsVersionAtLeast("8.0");

    const request = useCallback(() => webApp?.requestFullscreen?.(), [webApp]);
    const exit = useCallback(() => webApp?.exitFullscreen?.(), [webApp]);

    return { request, exit, isSupported };
};

export default useFullscreen;
