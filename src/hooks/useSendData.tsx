import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useSendData = () => {
    const webApp = useWebApp();

    return useCallback(
        (data: unknown) => webApp?.sendData?.(data),
        [webApp]
    );
};

export default useSendData;
