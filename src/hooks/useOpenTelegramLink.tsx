import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that opens a Telegram link through the Telegram client.
 *
 * @example
 * ```tsx
 * const openTelegramLink = useOpenTelegramLink();
 * openTelegramLink("https://t.me/telegram");
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useOpenTelegramLink = () => {
    const webApp = useWebApp();

    return useCallback(
        (url: string) => webApp?.openTelegramLink?.(url),
        [webApp]
    );
};

export default useOpenTelegramLink;
