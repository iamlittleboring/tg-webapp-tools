import { useCallback } from "react";
import useWebApp from "./useWebApp";
import useIsVersionAtLeast from "./useIsVersionAtLeast";
import "../types/telegram";

/**
 * Returns a callback that hides the on-screen keyboard, if it is currently visible.
 *
 * `isSupported` reflects Bot API 9.1+ support.
 *
 * @example
 * ```tsx
 * const hideKeyboard = useHideKeyboard();
 * hideKeyboard();
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useHideKeyboard = () => {
    const webApp = useWebApp();
    const isSupported = useIsVersionAtLeast("9.1");

    const hideKeyboard = useCallback(() => webApp?.hideKeyboard?.(), [webApp]);

    return Object.assign(hideKeyboard, { isSupported });
};

export default useHideKeyboard;
