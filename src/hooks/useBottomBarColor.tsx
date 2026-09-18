import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns a callback that sets the Mini App's bottom bar color (also applied to the
 * navigation bar on Android). For setting it once alongside header/background colors,
 * see `SetupWebApp` instead.
 *
 * @example
 * ```tsx
 * const setBottomBarColor = useBottomBarColor();
 * setBottomBarColor("secondary_bg_color");
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useBottomBarColor = () => {
    const webApp = useWebApp();

    return useCallback(
        (color: "bg_color" | "secondary_bg_color" | `#${string}`) =>
            webApp?.setBottomBarColor?.(color),
        [webApp]
    );
};

export default useBottomBarColor;
