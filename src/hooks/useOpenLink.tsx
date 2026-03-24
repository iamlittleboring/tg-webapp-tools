import { useCallback } from "react";
import useWebApp from "./useWebApp";

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
