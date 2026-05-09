import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that shows a native Telegram alert popup.
 *
 * @example
 * ```tsx
 * const showAlert = useShowAlert();
 * showAlert("Saved");
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useShowAlert = () => {
    const webApp = useWebApp();

    return useCallback(
        (message: string, callback?: () => unknown) =>
            webApp?.showAlert?.(message, callback),
        [webApp]
    );
};

export default useShowAlert;
