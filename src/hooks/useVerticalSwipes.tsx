import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns helpers for enabling or disabling vertical swipe gestures.
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

    return { enable, disable, setEnabled };
};

export default useVerticalSwipes;
