import useWebApp from "./useWebApp";

const useInitData = () => {
    const webApp = useWebApp();

    return {
        raw: webApp?.initData ?? "",
        unsafe: webApp?.initDataUnsafe ?? null,
    };
};

export default useInitData;
