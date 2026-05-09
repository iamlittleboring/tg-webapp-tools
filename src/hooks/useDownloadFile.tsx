import { useCallback } from "react";
import useWebApp from "./useWebApp";
import { createFeatureUnavailableError } from "../utils/webApp";

/**
 * Returns a callback that asks Telegram to download a file for the user.
 *
 * Throws a feature-unavailable error when the current Telegram client does not
 * expose `downloadFile`.
 *
 * @example
 * ```tsx
 * const downloadFile = useDownloadFile();
 * downloadFile("https://example.com/report.pdf", "report.pdf");
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useDownloadFile = () => {
    const webApp = useWebApp();

    return useCallback(
        (
            url: string,
            fileName: string,
            callback?: (isAccepted: boolean) => unknown
        ) => {
            if (!webApp?.downloadFile) {
                throw createFeatureUnavailableError("downloadFile");
            }

            return webApp.downloadFile(
                { url: url, file_name: fileName },
                callback
            );
        },
        [webApp]
    );
};

export default useDownloadFile;
