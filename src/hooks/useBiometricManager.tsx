import { useCallback } from "react";
import {
    BiometricAuthenticateParams,
    BiometricRequestAccessParams,
} from "@twa-dev/types";
import useWebApp from "./useWebApp";

const useBiometricManager = () => {
    const biometricManager = useWebApp()?.BiometricManager;

    const init = useCallback(
        (callback?: VoidFunction) => biometricManager?.init?.(callback),
        [biometricManager]
    );

    const requestAccess = useCallback(
        (
            params: BiometricRequestAccessParams,
            callback?: (isAccessGranted: boolean) => unknown
        ) => biometricManager?.requestAccess?.(params, callback),
        [biometricManager]
    );

    const authenticate = useCallback(
        (
            params: BiometricAuthenticateParams,
            callback?: (isAuthenticated: boolean) => unknown
        ) => biometricManager?.authenticate?.(params, callback),
        [biometricManager]
    );

    const updateToken = useCallback(
        (
            token: string,
            callback?: (isBiometricTokenUpdated: boolean) => unknown
        ) => biometricManager?.updateBiometricToken?.(token, callback),
        [biometricManager]
    );

    const openSettings = useCallback(
        () => biometricManager?.openSettings?.(),
        [biometricManager]
    );

    return {
        biometricManager: biometricManager ?? null,
        init,
        requestAccess,
        authenticate,
        updateToken,
        openSettings,
    };
};

export default useBiometricManager;
