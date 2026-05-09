import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that expands the Mini App to the maximum available height.
 *
 * @example
 * ```tsx
 * const expand = useExpand();
 * expand();
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useExpand = () => {
    const webApp = useWebApp();

    return useCallback(() => webApp?.expand?.(), [webApp]);
};

export default useExpand;
