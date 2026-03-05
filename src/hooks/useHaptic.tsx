import { useCallback } from "react";
import useWebApp from "./useWebApp";

const useHaptic = () => {
    const webApp = useWebApp();
    const hapticFeedback = webApp?.HapticFeedback;

    const impact = {
        light: useCallback(() => {
            hapticFeedback.impactOccurred("light");
        }, [hapticFeedback]),
        medium: useCallback(() => {
            hapticFeedback.impactOccurred("medium");
        }, [hapticFeedback]),
        heavy: useCallback(() => {
            hapticFeedback.impactOccurred("heavy");
        }, [hapticFeedback]),
        rigid: useCallback(() => {
            hapticFeedback.impactOccurred("rigid");
        }, [hapticFeedback]),
        soft: useCallback(() => {
            hapticFeedback.impactOccurred("soft");
        }, [hapticFeedback]),
    };

    const notification = {
        error: useCallback(() => {
            hapticFeedback.notificationOccurred("error");
        }, [hapticFeedback]),
        success: useCallback(() => {
            hapticFeedback.notificationOccurred("success");
        }, [hapticFeedback]),
        warning: useCallback(() => {
            hapticFeedback.notificationOccurred("warning");
        }, [hapticFeedback]),
    };

    return { impact, notification };
};

export default useHaptic;
