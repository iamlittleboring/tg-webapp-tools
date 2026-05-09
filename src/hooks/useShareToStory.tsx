import { useCallback } from "react";
import { ShareStoryParams } from "@twa-dev/types";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that shares media to the user's Telegram story.
 *
 * @example
 * ```tsx
 * const shareToStory = useShareToStory();
 * shareToStory("https://example.com/story.png");
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useShareToStory = () => {
    const webApp = useWebApp();

    return useCallback(
        (mediaUrl: string, params?: ShareStoryParams) =>
            webApp?.shareToStory?.(mediaUrl, params),
        [webApp]
    );
};

export default useShareToStory;
