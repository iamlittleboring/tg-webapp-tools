import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that requests permission to set the user's emoji status.
 *
 * @example
 * ```tsx
 * const requestEmojiStatusAccess = useRequestEmojiStatusAccess();
 * requestEmojiStatusAccess((isGranted) => console.log(isGranted));
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useRequestEmojiStatusAccess = () => {
    const webApp = useWebApp();

    return useCallback(
        (callback?: (isGranted: boolean) => unknown) =>
            webApp?.requestEmojiStatusAccess?.(callback),
        [webApp]
    );
};

export default useRequestEmojiStatusAccess;
