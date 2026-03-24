import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useVerticalSwipes = () => {
    const webApp = useWebApp();

    const enable = useCallback(() => webApp?.enableVerticalSwipes?.(), [webApp]);
    const disable = useCallback(
        () => webApp?.disableVerticalSwipes?.(),
        [webApp]
    );
    const setEnabled = useCallback(
        (enabled: boolean) => {
            if (enabled) {
                webApp?.enableVerticalSwipes?.();
            } else {
                webApp?.disableVerticalSwipes?.();
            }
        },
        [webApp]
    );

    return { enable, disable, setEnabled };
};

export default useVerticalSwipes;
