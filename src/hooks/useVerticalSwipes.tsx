import { useCallback } from "react";
import useWebApp from "./useWebApp";
import useIsVersionAtLeast from "./useIsVersionAtLeast";

/**
 * Returns helpers for enabling or disabling vertical swipe gestures.
 *
 * `isSupported` reflects Bot API 7.7+ support.
 *
 * @example
 * ```tsx
 * const verticalSwipes = useVerticalSwipes();
 * verticalSwipes.setEnabled(false);
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useVerticalSwipes = () => {
    const webApp = useWebApp();
    const isSupported = useIsVersionAtLeast("7.7");

    const enable = useCallback(() => webApp?.enableVerticalSwipes?.(), [webApp]);
    const disable = useCallback(
        () => webApp?.disableVerticalSwipes?.(),
        [webApp]
    );
    const setEnabled = useCallback(
        (enabled: boolean) => {
            if (enabled) {
                webApp?.enableVerticalSwipes?.();
            } else {
                webApp?.disableVerticalSwipes?.();
            }
        },
        [webApp]
    );

    return { enable, disable, setEnabled, isSupported };
};

export default useVerticalSwipes;
