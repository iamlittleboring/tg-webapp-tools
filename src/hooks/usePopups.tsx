import { useCallback } from "react";
import { PopupParams } from "@twa-dev/types";
import useWebApp from "./useWebApp";

/**
 * Returns helpers for Telegram's native dialogs: alert, confirm and custom popups.
 *
 * @example
 * ```tsx
 * const popups = usePopups();
 * popups.alert("Saved");
 * popups.confirm("Delete item?", (confirmed) => confirmed && deleteItem());
 * popups.popup({ title: "Delete", message: "Are you sure?", buttons: [] });
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const usePopups = () => {
    const webApp = useWebApp();

    const alert = useCallback(
        (message: string, callback?: () => unknown) =>
            webApp?.showAlert?.(message, callback),
        [webApp]
    );

    const confirm = useCallback(
        (message: string, callback?: (confirmed: boolean) => unknown) =>
            webApp?.showConfirm?.(message, callback),
        [webApp]
    );

    const popup = useCallback(
        (params: PopupParams, callback?: (id?: string) => unknown) =>
            webApp?.showPopup?.(params, callback),
        [webApp]
    );

    return { alert, confirm, popup };
};

export default usePopups;
