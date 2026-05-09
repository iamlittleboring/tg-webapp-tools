import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns helpers for enabling or disabling Telegram's closing confirmation.
 *
 * @example
 * ```tsx
 * const closingConfirmation = useClosingConfirmation();
 * closingConfirmation.setEnabled(hasUnsavedChanges);
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useClosingConfirmation = () => {
    const webApp = useWebApp();

    const enable = useCallback(
        () => webApp?.enableClosingConfirmation?.(),
        [webApp]
    );

    const disable = useCallback(
        () => webApp?.disableClosingConfirmation?.(),
        [webApp]
    );

    const setEnabled = useCallback(
        (enabled: boolean) => {
            if (enabled) {
                webApp?.enableClosingConfirmation?.();
            } else {
                webApp?.disableClosingConfirmation?.();
            }
        },
        [webApp]
    );

    return { enable, disable, setEnabled };
};

export default useClosingConfirmation;
