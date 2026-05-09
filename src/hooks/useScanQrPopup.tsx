import { useCallback } from "react";
import { ScanQrPopupParams } from "@twa-dev/types";
import useWebApp from "./useWebApp";

/**
 * Returns helpers for opening and closing Telegram's native QR scanner popup.
 *
 * @example
 * ```tsx
 * const qrPopup = useScanQrPopup();
 * qrPopup.show({ text: "Scan QR code" }, (text) => {
 *   console.log(text);
 *   return true;
 * });
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
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
