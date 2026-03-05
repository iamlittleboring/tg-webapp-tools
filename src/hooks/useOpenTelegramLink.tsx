import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useOpenTelegramLink = () => {
    const webApp = useWebApp();

    return useCallback(
        (url: string) => webApp?.openTelegramLink?.(url),
        [webApp]
    );
};

export default useOpenTelegramLink;
