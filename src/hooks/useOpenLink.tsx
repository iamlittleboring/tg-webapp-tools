import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useOpenLink = () => {
    const webApp = useWebApp();

    return useCallback(
        (url: string, tryInstantView?: boolean) =>
            webApp?.openLink?.(url, { try_instant_view: tryInstantView }),
        [webApp]
    );
};

export default useOpenLink;
