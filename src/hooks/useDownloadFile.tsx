import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useDownloadFile = () => {
    const webApp = useWebApp();

    return useCallback(
        (
            url: string,
            fileName: string,
            callback?: (isAccepted: boolean) => unknown
        ) => webApp.downloadFile({ url: url, file_name: fileName }, callback),
        []
    );
};

export default useDownloadFile;
