import { useCallback } from "react";
import { ScanQrPopupParams } from "@twa-dev/types";
import useWebApp from "./useWebApp";

const useScanQrPopup = () => {
    const webApp = useWebApp();

    const show = useCallback(
        (params: ScanQrPopupParams, callback?: (text: string) => void | true) =>
            webApp?.showScanQrPopup?.(params, callback),
        [webApp]
    );

    const close = useCallback(
        () => webApp?.closeScanQrPopup?.(),
        [webApp]
    );

    return { show, close };
};

export default useScanQrPopup;
