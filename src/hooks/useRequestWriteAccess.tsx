import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useRequestWriteAccess = () => {
    const webApp = useWebApp();

    return useCallback(
        (callback?: (access: boolean) => unknown) =>
            webApp?.requestWriteAccess?.(callback),
        [webApp]
    );
};

export default useRequestWriteAccess;
