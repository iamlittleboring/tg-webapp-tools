import { useCallback } from "react";
import useWebApp from "./useWebApp";

type ChatType = "users" | "bots" | "groups" | "channels";

const useSwitchInlineQuery = () => {
    const webApp = useWebApp();

    return useCallback(
        (query: string, chooseChatTypes?: ChatType[]) =>
            webApp?.switchInlineQuery?.(query, chooseChatTypes),
        [webApp]
    );
};

export default useSwitchInlineQuery;
