import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useRequestEmojiStatusAccess = () => {
    const webApp = useWebApp();

    return useCallback(
        (callback?: (isGranted: boolean) => unknown) =>
            webApp?.requestEmojiStatusAccess?.(callback),
        [webApp]
    );
};

export default useRequestEmojiStatusAccess;
