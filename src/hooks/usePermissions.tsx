import { useCallback } from "react";
import { RequestContactResponse } from "@twa-dev/types";
import useWebApp from "./useWebApp";
import useIsVersionAtLeast from "./useIsVersionAtLeast";
import "../types/telegram";

/**
 * Returns helpers for requesting user permissions: contact, write access, emoji status
 * access, and picking a chat.
 *
 * `requestEmojiStatusAccess` and `requestChat` carry an `isSupported` flag (as a property
 * on the function itself) reflecting their minimum Bot API version.
 *
 * @example
 * ```tsx
 * const permissions = usePermissions();
 * permissions.requestContact((access, response) => console.log(access, response));
 * if (permissions.requestChat.isSupported) {
 *   permissions.requestChat(requestId);
 * }
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const usePermissions = () => {
    const webApp = useWebApp();
    const isEmojiStatusAccessSupported = useIsVersionAtLeast("8.0");
    const isRequestChatSupported = useIsVersionAtLeast("9.6");

    const requestContact = useCallback(
        (
            callback?: (
                access: boolean,
                response?: RequestContactResponse
            ) => unknown
        ) => webApp?.requestContact?.(callback),
        [webApp]
    );

    const requestWriteAccess = useCallback(
        (callback?: (access: boolean) => unknown) =>
            webApp?.requestWriteAccess?.(callback),
        [webApp]
    );

    const requestEmojiStatusAccess = Object.assign(
        useCallback(
            (callback?: (isGranted: boolean) => unknown) =>
                webApp?.requestEmojiStatusAccess?.(callback),
            [webApp]
        ),
        { isSupported: isEmojiStatusAccessSupported }
    );

    const requestChat = Object.assign(
        useCallback(
            (requestId: string, callback?: (isSent: boolean) => unknown) =>
                webApp?.requestChat?.(requestId, callback),
            [webApp]
        ),
        { isSupported: isRequestChatSupported }
    );

    return {
        requestContact,
        requestWriteAccess,
        requestEmojiStatusAccess,
        requestChat,
    };
};

export default usePermissions;
