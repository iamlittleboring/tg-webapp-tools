import useWebApp from "./useWebApp";

const useThemeParams = () => {
    return useWebApp()?.themeParams ?? null;
};

export default useThemeParams;
