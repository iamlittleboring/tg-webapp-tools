import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useShareMessage = () => {
    const webApp = useWebApp();

    return useCallback(
        (messageId: string, callback?: (isSent: boolean) => unknown) =>
            webApp?.shareMessage?.(messageId, callback),
        [webApp]
    );
};

export default useShareMessage;
