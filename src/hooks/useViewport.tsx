import useWebApp from "./useWebApp";

const useViewport = () => {
    const webApp = useWebApp();

    return {
        isExpanded: webApp?.isExpanded ?? false,
        height: webApp?.viewportHeight ?? 0,
        stableHeight: webApp?.viewportStableHeight ?? 0,
    };
};

export default useViewport;
