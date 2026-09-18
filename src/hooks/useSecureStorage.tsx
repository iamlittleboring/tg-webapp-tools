import { useCallback } from "react";
import useWebApp from "./useWebApp";
import { createFeatureUnavailableError } from "../utils/webApp";
import "../types/telegram";

interface Result<T> {
    data: T | null;
    error: Error | null;
}

interface GetItemResult extends Result<string> {
    /** Whether Telegram can restore this key on the current device via `restoreItem`. */
    canRestore: boolean;
}

/**
 * Returns promise-based helpers for Telegram SecureStorage (Keychain/Keystore-backed storage
 * for sensitive per-device data, such as tokens).
 *
 * Each helper resolves to `{ data, error }` instead of using Telegram callbacks.
 * `getItem` additionally resolves `canRestore`, matching Telegram's third callback argument.
 *
 * @example
 * ```tsx
 * const secureStorage = useSecureStorage();
 * const result = await secureStorage.getItem("auth_token");
 * if (!result.data && result.canRestore) {
 *   await secureStorage.restoreItem("auth_token");
 * }
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#securestorage
 */
export const useSecureStorage = () => {
    const webApp = useWebApp();
    const secureStorage = webApp?.SecureStorage;

    const wrap = <T,>(
        fn: (resolve: (result: T) => void) => void
    ): Promise<T> =>
        new Promise((resolve) => {
            fn(resolve);
        });

    const unavailable = <T,>(): Promise<Result<T>> =>
        Promise.resolve({
            data: null,
            error: createFeatureUnavailableError("SecureStorage"),
        });

    const setItem = useCallback(
        async (key: string, value: string): Promise<Result<boolean>> => {
            if (!secureStorage) {
                return unavailable();
            }

            return wrap((resolve) => {
                secureStorage.setItem(key, value, (err, result) => {
                    if (err) resolve({ data: null, error: new Error(err) });
                    else resolve({ data: result ?? true, error: null });
                });
            });
        },
        [secureStorage]
    );

    const getItem = useCallback(
        async (key: string): Promise<GetItemResult> => {
            if (!secureStorage) {
                const result = await unavailable<string>();
                return { ...result, canRestore: false };
            }

            return wrap<GetItemResult>((resolve) => {
                secureStorage.getItem(key, (err, value, canRestore) => {
                    if (err) {
                        resolve({
                            data: null,
                            error: new Error(err),
                            canRestore: false,
                        });
                    } else {
                        resolve({
                            data: value ?? null,
                            error: null,
                            canRestore: canRestore ?? false,
                        });
                    }
                });
            });
        },
        [secureStorage]
    );

    const restoreItem = useCallback(
        async (key: string): Promise<Result<string>> => {
            if (!secureStorage) {
                return unavailable();
            }

            return wrap((resolve) => {
                secureStorage.restoreItem(key, (err, value) => {
                    if (err) resolve({ data: null, error: new Error(err) });
                    else resolve({ data: value ?? null, error: null });
                });
            });
        },
        [secureStorage]
    );

    const removeItem = useCallback(
        async (key: string): Promise<Result<boolean>> => {
            if (!secureStorage) {
                return unavailable();
            }

            return wrap((resolve) => {
                secureStorage.removeItem(key, (err, result) => {
                    if (err) resolve({ data: null, error: new Error(err) });
                    else resolve({ data: result ?? true, error: null });
                });
            });
        },
        [secureStorage]
    );

    const clear = useCallback(async (): Promise<Result<boolean>> => {
        if (!secureStorage) {
            return unavailable();
        }

        return wrap((resolve) => {
            secureStorage.clear((err, result) => {
                if (err) resolve({ data: null, error: new Error(err) });
                else resolve({ data: result ?? true, error: null });
            });
        });
    }, [secureStorage]);

    return { setItem, getItem, restoreItem, removeItem, clear };
};

export default useSecureStorage;
