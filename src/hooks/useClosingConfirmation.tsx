import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useClosingConfirmation = () => {
    const webApp = useWebApp();

    const enable = useCallback(
        () => webApp?.enableClosingConfirmation?.(),
        [webApp]
    );

    const disable = useCallback(
        () => webApp?.disableClosingConfirmation?.(),
        [webApp]
    );

    const setEnabled = useCallback(
        (enabled: boolean) => {
            if (enabled) {
                webApp?.enableClosingConfirmation?.();
            } else {
                webApp?.disableClosingConfirmation?.();
            }
        },
        [webApp]
    );

    return { enable, disable, setEnabled };
};

export default useClosingConfirmation;
