import { useCallback } from "react";
import useWebApp from "./useWebApp";
import { RequestContactResponse } from "@twa-dev/types";

const useReadyContact = () => {
    const webApp = useWebApp();

    return useCallback(
        (
            callback?: (
                access: boolean,
                response?: RequestContactResponse
            ) => unknown
        ) => webApp?.requestContact?.(callback),
        [webApp]
    );
};

export default useReadyContact;
