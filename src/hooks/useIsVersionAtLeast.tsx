import useWebApp from "./useWebApp";

/**
 * Returns whether the current Telegram client supports at least the given Bot API version.
 *
 * Returns `false` outside Telegram or before the provider receives a WebApp instance.
 *
 * @example
 * ```tsx
 * const isSupported = useIsVersionAtLeast("8.0");
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useIsVersionAtLeast = (version: string) => {
    const webApp = useWebApp();

    return webApp?.isVersionAtLeast(version) ?? false;
};

export default useIsVersionAtLeast;
