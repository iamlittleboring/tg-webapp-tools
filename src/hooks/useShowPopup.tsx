import { useCallback } from "react";
import useWebApp from "./useWebApp";
import { PopupParams } from "@twa-dev/types";

const useShowPopup = () => {
    const webApp = useWebApp();

    return useCallback(
        (params: PopupParams, callback?: (id?: string) => unknown) =>
            webApp?.showPopup?.(params, callback),
        [webApp]
    );
};

export default useShowPopup;
