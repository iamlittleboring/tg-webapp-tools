import { useCallback } from "react";
import useWebApp from "./useWebApp";

type ChatType = "users" | "bots" | "groups" | "channels";

/**
 * Returns a callback that inserts an inline bot query into a selected chat.
 *
 * @example
 * ```tsx
 * const switchInlineQuery = useSwitchInlineQuery();
 * switchInlineQuery("share this", ["users", "groups"]);
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useSwitchInlineQuery = () => {
    const webApp = useWebApp();

    return useCallback(
        (query: string, chooseChatTypes?: ChatType[]) =>
            webApp?.switchInlineQuery?.(query, chooseChatTypes),
        [webApp]
    );
};

export default useSwitchInlineQuery;
