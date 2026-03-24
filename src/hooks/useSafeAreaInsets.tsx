import useWebApp from "./useWebApp";

const useSafeAreaInsets = () => {
    const webApp = useWebApp();

    return {
        safeAreaInset: webApp?.safeAreaInset ?? null,
        contentSafeAreaInset: webApp?.contentSafeAreaInset ?? null,
    };
};

export default useSafeAreaInsets;
