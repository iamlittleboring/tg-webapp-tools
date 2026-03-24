import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useReadTextFromClipboard = () => {
    const webApp = useWebApp();

    return useCallback(
        (callback?: (text: string) => unknown) =>
            webApp?.readTextFromClipboard?.(callback),
        [webApp]
    );
};

export default useReadTextFromClipboard;
