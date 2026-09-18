import { useCallback } from "react";
import useWebApp from "./useWebApp";
import { createFeatureUnavailableError } from "../utils/webApp";
import "../types/telegram";

interface Result<T> {
    data: T | null;
    error: Error | null;
}

/**
 * Returns promise-based helpers for Telegram DeviceStorage (persistent, per-device local storage).
 *
 * Each helper resolves to `{ data, error }` instead of using Telegram callbacks.
 *
 * @example
 * ```tsx
 * const deviceStorage = useDeviceStorage();
 * const result = await deviceStorage.getItem("theme");
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#devicestorage
 */
export const useDeviceStorage = () => {
    const webApp = useWebApp();
    const deviceStorage = webApp?.DeviceStorage;

    const wrap = <T,>(
        fn: (resolve: (result: Result<T>) => void) => void
    ): Promise<Result<T>> =>
        new Promise((resolve) => {
            fn(resolve);
        });

    const unavailable = <T,>(): Promise<Result<T>> =>
        Promise.resolve({
            data: null,
            error: createFeatureUnavailableError("DeviceStorage"),
        });

    const setItem = useCallback(
        async (key: string, value: string): Promise<Result<boolean>> => {
            if (!deviceStorage) {
                return unavailable();
            }

            return wrap((resolve) => {
                deviceStorage.setItem(key, value, (err, result) => {
                    if (err) resolve({ data: null, error: new Error(err) });
                    else resolve({ data: result ?? true, error: null });
                });
            });
        },
        [deviceStorage]
    );

    const getItem = useCallback(
        async (key: string): Promise<Result<string>> => {
            if (!deviceStorage) {
                return unavailable();
            }

            return wrap((resolve) => {
                deviceStorage.getItem(key, (err, value) => {
                    if (err) resolve({ data: null, error: new Error(err) });
                    else resolve({ data: value ?? null, error: null });
                });
            });
        },
        [deviceStorage]
    );

    const removeItem = useCallback(
        async (key: string): Promise<Result<boolean>> => {
            if (!deviceStorage) {
                return unavailable();
            }

            return wrap((resolve) => {
                deviceStorage.removeItem(key, (err, result) => {
                    if (err) resolve({ data: null, error: new Error(err) });
                    else resolve({ data: result ?? true, error: null });
                });
            });
        },
        [deviceStorage]
    );

    const clear = useCallback(async (): Promise<Result<boolean>> => {
        if (!deviceStorage) {
            return unavailable();
        }

        return wrap((resolve) => {
            deviceStorage.clear((err, result) => {
                if (err) resolve({ data: null, error: new Error(err) });
                else resolve({ data: result ?? true, error: null });
            });
        });
    }, [deviceStorage]);

    return { setItem, getItem, removeItem, clear };
};

export default useDeviceStorage;
