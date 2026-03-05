import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useReady = () => {
    const webApp = useWebApp();

    return useCallback(() => webApp?.ready?.(), [webApp]);
};

export default useReady;