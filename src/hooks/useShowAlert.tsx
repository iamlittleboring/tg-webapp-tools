import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useShowAlert = () => {
    const webApp = useWebApp();

    return useCallback(
        (message: string, callback?: () => unknown) =>
            webApp?.showAlert?.(message, callback),
        [webApp]
    );
};

export default useShowAlert;
