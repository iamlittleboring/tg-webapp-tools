import { useCallback } from "react";
import { ShareStoryParams } from "@twa-dev/types";
import useWebApp from "./useWebApp";

const useShareToStory = () => {
    const webApp = useWebApp();

    return useCallback(
        (mediaUrl: string, params?: ShareStoryParams) =>
            webApp?.shareToStory?.(mediaUrl, params),
        [webApp]
    );
};

export default useShareToStory;
