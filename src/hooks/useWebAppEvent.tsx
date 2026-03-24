import { useEffect } from "react";
import { EventNames, EventParams } from "@twa-dev/types";
import useWebApp from "./useWebApp";

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
