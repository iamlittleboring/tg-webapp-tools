import { useCallback } from "react";
import useWebApp from "./useWebApp";
import { createFeatureUnavailableError } from "../utils/webApp";

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
