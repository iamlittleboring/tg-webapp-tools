import useWebApp from "./useWebApp";

/**
 * Returns Telegram theme parameters for styling the Mini App.
 *
 * @example
 * ```tsx
 * const themeParams = useThemeParams();
 * const backgroundColor = themeParams?.bg_color;
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#themeparams
 */
const useThemeParams = () => {
    return useWebApp()?.themeParams ?? null;
};

export default useThemeParams;
