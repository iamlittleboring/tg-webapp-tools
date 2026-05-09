import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that asks Telegram to read text from the clipboard.
 *
 * @example
 * ```tsx
 * const readTextFromClipboard = useReadTextFromClipboard();
 * readTextFromClipboard((text) => setValue(text));
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useReadTextFromClipboard = () => {
    const webApp = useWebApp();

    return useCallback(
        (callback?: (text: string) => unknown) =>
            webApp?.readTextFromClipboard?.(callback),
        [webApp]
    );
};

export default useReadTextFromClipboard;
