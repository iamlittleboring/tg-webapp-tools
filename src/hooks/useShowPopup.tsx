import { useCallback } from "react";
import useWebApp from "./useWebApp";
import { PopupParams } from "@twa-dev/types";

/**
 * Returns a callback that shows a native Telegram popup with custom buttons.
 *
 * @example
 * ```tsx
 * const showPopup = useShowPopup();
 * showPopup({ title: "Delete", message: "Are you sure?", buttons: [] });
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useShowPopup = () => {
    const webApp = useWebApp();

    return useCallback(
        (params: PopupParams, callback?: (id?: string) => unknown) =>
            webApp?.showPopup?.(params, callback),
        [webApp]
    );
};

export default useShowPopup;
