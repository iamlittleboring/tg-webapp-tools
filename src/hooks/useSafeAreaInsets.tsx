import useWebApp from "./useWebApp";

/**
 * Returns Telegram safe area and content safe area insets.
 *
 * @example
 * ```tsx
 * const { safeAreaInset } = useSafeAreaInsets();
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#safeareainset
 */
const useSafeAreaInsets = () => {
    const webApp = useWebApp();

    return {
        safeAreaInset: webApp?.safeAreaInset ?? null,
        contentSafeAreaInset: webApp?.contentSafeAreaInset ?? null,
    };
};

export default useSafeAreaInsets;
