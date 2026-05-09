import { useCallback } from "react";
import { HomeScreenStatus } from "@twa-dev/types";
import useWebApp from "./useWebApp";

/**
 * Returns helpers for adding the Mini App to the home screen and checking its status.
 *
 * @example
 * ```tsx
 * const homeScreen = useHomeScreen();
 * homeScreen.checkStatus((status) => console.log(status));
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useHomeScreen = () => {
    const webApp = useWebApp();

    const add = useCallback(() => webApp?.addToHomeScreen?.(), [webApp]);
    const checkStatus = useCallback(
        (callback?: (status: HomeScreenStatus) => unknown) =>
            webApp?.checkHomeScreenStatus?.(callback),
        [webApp]
    );

    return { add, checkStatus };
};

export default useHomeScreen;
