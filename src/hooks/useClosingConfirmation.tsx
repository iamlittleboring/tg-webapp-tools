import { useCallback, useEffect, useState } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns helpers for enabling or disabling Telegram's closing confirmation,
 * plus the current `isEnabled` value.
 *
 * Telegram does not emit an event when this setting changes, so `isEnabled` is read on
 * mount and then updated optimistically whenever `enable`/`disable`/`setEnabled` are
 * called through this hook — it will not reflect changes made outside of it.
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
    const [isEnabled, setIsEnabled] = useState(
        () => webApp?.isClosingConfirmationEnabled ?? false
    );

    useEffect(() => {
        setIsEnabled(webApp?.isClosingConfirmationEnabled ?? false);
    }, [webApp]);

    const enable = useCallback(() => {
        webApp?.enableClosingConfirmation?.();
        setIsEnabled(true);
    }, [webApp]);

    const disable = useCallback(() => {
        webApp?.disableClosingConfirmation?.();
        setIsEnabled(false);
    }, [webApp]);

    const setEnabled = useCallback(
        (enabled: boolean) => {
            if (enabled) {
                webApp?.enableClosingConfirmation?.();
            } else {
                webApp?.disableClosingConfirmation?.();
            }
            setIsEnabled(enabled);
        },
        [webApp]
    );

    return { enable, disable, setEnabled, isEnabled };
};

export default useClosingConfirmation;
