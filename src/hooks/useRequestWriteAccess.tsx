import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that requests permission for the bot to message the user.
 *
 * @example
 * ```tsx
 * const requestWriteAccess = useRequestWriteAccess();
 * requestWriteAccess((access) => console.log(access));
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useRequestWriteAccess = () => {
    const webApp = useWebApp();

    return useCallback(
        (callback?: (access: boolean) => unknown) =>
            webApp?.requestWriteAccess?.(callback),
        [webApp]
    );
};

export default useRequestWriteAccess;
