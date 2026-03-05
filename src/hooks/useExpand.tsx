import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useExpand = () => {
    const webApp = useWebApp();

    return useCallback(() => webApp?.expand?.(), [webApp]);
};

export default useExpand;
