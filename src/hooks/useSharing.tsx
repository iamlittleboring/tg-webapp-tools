import { useCallback } from "react";
import { ShareStoryParams } from "@twa-dev/types";
import useWebApp from "./useWebApp";

type ChatType = "users" | "bots" | "groups" | "channels";

/**
 * Returns helpers for navigation and sharing: opening links, switching to inline mode,
 * and sharing to stories or chats.
 *
 * @example
 * ```tsx
 * const sharing = useSharing();
 * sharing.openLink("https://example.com");
 * sharing.shareToStory("https://example.com/story.png");
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useSharing = () => {
    const webApp = useWebApp();

    const openLink = useCallback(
        (url: string, tryInstantView?: boolean) =>
            webApp?.openLink?.(
                url,
                typeof tryInstantView === "boolean"
                    ? { try_instant_view: tryInstantView }
                    : undefined
            ),
        [webApp]
    );

    const openTelegramLink = useCallback(
        (url: string) => webApp?.openTelegramLink?.(url),
        [webApp]
    );

    const switchInlineQuery = useCallback(
        (query: string, chooseChatTypes?: ChatType[]) =>
            webApp?.switchInlineQuery?.(query, chooseChatTypes),
        [webApp]
    );

    const shareToStory = useCallback(
        (mediaUrl: string, params?: ShareStoryParams) =>
            webApp?.shareToStory?.(mediaUrl, params),
        [webApp]
    );

    const shareMessage = useCallback(
        (messageId: string, callback?: (isSent: boolean) => unknown) =>
            webApp?.shareMessage?.(messageId, callback),
        [webApp]
    );

    return {
        openLink,
        openTelegramLink,
        switchInlineQuery,
        shareToStory,
        shareMessage,
    };
};

export default useSharing;
