import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that sends data from the Mini App to the bot.
 *
 * @example
 * ```tsx
 * const sendData = useSendData();
 * sendData(JSON.stringify({ action: "checkout" }));
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useSendData = () => {
    const webApp = useWebApp();

    return useCallback(
        (data: unknown) => webApp?.sendData?.(data),
        [webApp]
    );
};

export default useSendData;
