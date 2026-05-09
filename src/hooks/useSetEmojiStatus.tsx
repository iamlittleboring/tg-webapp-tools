import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that sets the user's Telegram emoji status.
 *
 * @example
 * ```tsx
 * const setEmojiStatus = useSetEmojiStatus();
 * setEmojiStatus(customEmojiId, 3600, (isSet) => console.log(isSet));
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useSetEmojiStatus = () => {
    const webApp = useWebApp();

    return useCallback(
        (
            emojiId: string,
            duration?: number,
            callback?: (isSet: boolean) => unknown
        ) =>
            webApp?.setEmojiStatus?.(
                emojiId,
                { duration: duration },
                callback
            ),
        [webApp]
    );
};

export default useSetEmojiStatus;
