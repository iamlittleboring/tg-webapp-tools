import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useOrientationLock = () => {
    const webApp = useWebApp();

    const lock = useCallback(() => webApp?.lockOrientation?.(), [webApp]);
    const unlock = useCallback(() => webApp?.unlockOrientation?.(), [webApp]);

    return { lock, unlock };
};

export default useOrientationLock;
