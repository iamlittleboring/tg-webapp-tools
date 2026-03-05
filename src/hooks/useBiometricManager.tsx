import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useBiometricManager = () => {
    const webApp = useWebApp();

    const biometricManager = webApp?.BiometricManager;

    // return useCallback(() => webApp?.showPopup?.(params, callback), [webApp]);
};

export default useBiometricManager;
