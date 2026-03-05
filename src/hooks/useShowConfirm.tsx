import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useShowConfirm = () => {
    const webApp = useWebApp();

    return useCallback(
        (message: string, callback?: (confirmed: boolean) => unknown) =>
            webApp?.showConfirm?.(message, callback),
        [webApp]
    );
};

export default useShowConfirm;
