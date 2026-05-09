import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that shows a native Telegram confirmation popup.
 *
 * @example
 * ```tsx
 * const showConfirm = useShowConfirm();
 * showConfirm("Delete item?", (confirmed) => {
 *   if (confirmed) deleteItem();
 * });
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useShowConfirm = () => {
    const webApp = useWebApp();

    return useCallback(
        (message: string, callback?: (confirmed: boolean) => unknown) =>
            webApp?.showConfirm?.(message, callback),
        [webApp]
    );
};

export default useShowConfirm;
