import { useCallback } from "react";
import useWebApp from "./useWebApp";
import { RequestContactResponse } from "@twa-dev/types";

/**
 * Returns a callback that requests the user's phone contact through Telegram.
 *
 * @example
 * ```tsx
 * const requestContact = useRequestContact();
 * requestContact((access, response) => console.log(access, response));
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useRequestContact = () => {
    const webApp = useWebApp();

    return useCallback(
        (
            callback?: (
                access: boolean,
                response?: RequestContactResponse
            ) => unknown
        ) => webApp?.requestContact?.(callback),
        [webApp]
    );
};

export default useRequestContact;
