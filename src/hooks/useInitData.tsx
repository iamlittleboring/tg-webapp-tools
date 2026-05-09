import useWebApp from "./useWebApp";

/**
 * Returns Telegram init data as both raw and parsed unsafe values.
 *
 * Verify `raw` on your backend before trusting user data.
 *
 * @example
 * ```tsx
 * const initData = useInitData();
 * sendToBackend(initData.raw);
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#webappinitdata
 */
const useInitData = () => {
    const webApp = useWebApp();

    return {
        raw: webApp?.initData ?? "",
        unsafe: webApp?.initDataUnsafe ?? null,
    };
};

export default useInitData;
