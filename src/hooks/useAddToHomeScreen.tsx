import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useAddToHomeScreen = () => {
    const webApp = useWebApp();

    return useCallback(() => webApp?.addToHomeScreen(), [webApp]);
};

export default useAddToHomeScreen;
