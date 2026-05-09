import { useCallback } from "react";
import useWebApp from "./useWebApp";

/**
 * Returns helpers for Telegram native haptic feedback.
 *
 * @example
 * ```tsx
 * const haptic = useHaptic();
 * haptic.impact.medium();
 * haptic.notification.success();
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#hapticfeedback
 */
const useHaptic = () => {
    const webApp = useWebApp();
    const hapticFeedback = webApp?.HapticFeedback;

    const impact = {
        light: useCallback(() => {
            hapticFeedback?.impactOccurred("light");
        }, [hapticFeedback]),
        medium: useCallback(() => {
            hapticFeedback?.impactOccurred("medium");
        }, [hapticFeedback]),
        heavy: useCallback(() => {
            hapticFeedback?.impactOccurred("heavy");
        }, [hapticFeedback]),
        rigid: useCallback(() => {
            hapticFeedback?.impactOccurred("rigid");
        }, [hapticFeedback]),
        soft: useCallback(() => {
            hapticFeedback?.impactOccurred("soft");
        }, [hapticFeedback]),
    };

    const notification = {
        error: useCallback(() => {
            hapticFeedback?.notificationOccurred("error");
        }, [hapticFeedback]),
        success: useCallback(() => {
            hapticFeedback?.notificationOccurred("success");
        }, [hapticFeedback]),
        warning: useCallback(() => {
            hapticFeedback?.notificationOccurred("warning");
        }, [hapticFeedback]),
    };

    const selection = useCallback(() => {
        hapticFeedback?.selectionChanged();
    }, [hapticFeedback]);

    return { impact, notification, selection };
};

export default useHaptic;
