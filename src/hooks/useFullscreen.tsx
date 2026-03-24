import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useFullscreen = () => {
    const webApp = useWebApp();

    const request = useCallback(() => webApp?.requestFullscreen?.(), [webApp]);
    const exit = useCallback(() => webApp?.exitFullscreen?.(), [webApp]);

    return { request, exit };
};

export default useFullscreen;
