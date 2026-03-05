import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useSetEmojiStatus = () => {
    const webApp = useWebApp();

    return useCallback(
        (
            emojiId: string,
            duration?: number,
            callback?: (isSet: boolean) => unknown
        ) => webApp?.setEmojiStatus(emojiId, { duration: duration }, callback),
        [webApp]
    );
};

export default useSetEmojiStatus;
