import useWebApp from "./useWebApp";

/**
 * Returns the current Telegram viewport state and heights.
 *
 * @example
 * ```tsx
 * const viewport = useViewport();
 * console.log(viewport.height, viewport.stableHeight);
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#viewport
 */
const useViewport = () => {
    const webApp = useWebApp();

    return {
        isExpanded: webApp?.isExpanded ?? false,
        height: webApp?.viewportHeight ?? 0,
        stableHeight: webApp?.viewportStableHeight ?? 0,
    };
};

export default useViewport;
