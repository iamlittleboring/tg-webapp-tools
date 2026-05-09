import { useEffect } from "react";
import { EventNames, EventParams } from "@twa-dev/types";
import useWebApp from "./useWebApp";

/**
 * Subscribes to a Telegram WebApp event and automatically unsubscribes on cleanup.
 *
 * @example
 * ```tsx
 * useWebAppEvent("themeChanged", () => {
 *   console.log("Theme changed");
 * });
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#events-available-for-mini-apps
 */
const useWebAppEvent = <T extends EventNames>(
    eventName: T,
    callback?: (params: EventParams[T]) => unknown
) => {
    const webApp = useWebApp();

    useEffect(() => {
        if (!webApp || !callback) {
            return;
        }

        webApp.onEvent(eventName, callback);

        return () => {
            webApp.offEvent(eventName, callback);
        };
    }, [callback, eventName, webApp]);
};

export default useWebAppEvent;
