import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that opens an external link through Telegram.
 *
 * @example
 * ```tsx
 * const openLink = useOpenLink();
 * openLink("https://example.com");
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useOpenLink = () => {
    const webApp = useWebApp();

    return useCallback(
        (url: string, tryInstantView?: boolean) =>
            webApp?.openLink?.(
                url,
                typeof tryInstantView === "boolean"
                    ? { try_instant_view: tryInstantView }
                    : undefined
            ),
        [webApp]
    );
};

export default useOpenLink;
