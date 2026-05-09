import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that opens Telegram's native message sharing flow.
 *
 * @example
 * ```tsx
 * const shareMessage = useShareMessage();
 * shareMessage(messageId, (isSent) => console.log(isSent));
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useShareMessage = () => {
    const webApp = useWebApp();

    return useCallback(
        (messageId: string, callback?: (isSent: boolean) => unknown) =>
            webApp?.shareMessage?.(messageId, callback),
        [webApp]
    );
};

export default useShareMessage;
