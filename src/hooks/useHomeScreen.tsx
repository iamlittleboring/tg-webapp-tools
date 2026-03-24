import { useCallback } from "react";
import { HomeScreenStatus } from "@twa-dev/types";
import useWebApp from "./useWebApp";

const useHomeScreen = () => {
    const webApp = useWebApp();

    const add = useCallback(() => webApp?.addToHomeScreen?.(), [webApp]);
    const checkStatus = useCallback(
        (callback?: (status: HomeScreenStatus) => unknown) =>
            webApp?.checkHomeScreenStatus?.(callback),
        [webApp]
    );

    return { add, checkStatus };
};

export default useHomeScreen;
