import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that asks Telegram to add the Mini App to the home screen.
 *
 * @example
 * ```tsx
 * const addToHomeScreen = useAddToHomeScreen();
 * addToHomeScreen();
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useAddToHomeScreen = () => {
    const webApp = useWebApp();

    return useCallback(() => webApp?.addToHomeScreen(), [webApp]);
};

export default useAddToHomeScreen;
