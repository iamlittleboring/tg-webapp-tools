import { useCallback } from "react";
import useWebApp from "./useWebApp";

type CloudStorageKey = string;
type CloudStorageValue = string;
type CloudStorageItems = Record<CloudStorageKey, CloudStorageValue>;

interface Result<T> {
    data: T | null;
    error: Error | null;
}

export const useCloudStorage = () => {
    const webApp = useWebApp();
    const cloudStorage = webApp?.CloudStorage;

    const wrap = <T,>(
        fn: (resolve: (result: Result<T>) => void) => void
    ): Promise<Result<T>> =>
        new Promise((resolve) => {
            fn(resolve);
        });

    const getItem = useCallback(
        async (key: CloudStorageKey): Promise<Result<string>> => {
            return wrap((resolve) => {
                cloudStorage.getItem(key, (err, result) => {
                    if (err) resolve({ data: null, error: new Error(err) });
                    else resolve({ data: result ?? null, error: null });
                });
            });
        },
        [cloudStorage]
    );

    const setItem = useCallback(
        async (
            key: CloudStorageKey,
            value: CloudStorageValue
        ): Promise<Result<boolean>> => {
            return wrap((resolve) => {
                cloudStorage.setItem(key, value, (err, result) => {
                    if (err) resolve({ data: null, error: new Error(err) });
                    else resolve({ data: result ?? true, error: null });
                });
            });
        },
        [cloudStorage]
    );

    const getKeys = useCallback(async (): Promise<
        Result<CloudStorageKey[]>
    > => {
        return wrap((resolve) => {
            cloudStorage.getKeys((err, result) => {
                if (err) resolve({ data: null, error: new Error(err) });
                else resolve({ data: result ?? [], error: null });
            });
        });
    }, [cloudStorage]);

    const getItems = useCallback(
        async (keys: CloudStorageKey[]): Promise<Result<CloudStorageItems>> => {
            return wrap((resolve) => {
                cloudStorage.getItems(keys, (err, result) => {
                    if (err) resolve({ data: null, error: new Error(err) });
                    else resolve({ data: result ?? {}, error: null });
                });
            });
        },
        [cloudStorage]
    );

    const removeItem = useCallback(
        async (key: CloudStorageKey): Promise<Result<boolean>> => {
            return wrap((resolve) => {
                cloudStorage.removeItem(key, (err, result) => {
                    if (err) resolve({ data: null, error: new Error(err) });
                    else resolve({ data: result ?? true, error: null });
                });
            });
        },
        [cloudStorage]
    );

    const removeItems = useCallback(
        async (keys: CloudStorageKey[]): Promise<Result<boolean>> => {
            return wrap((resolve) => {
                cloudStorage.removeItems(keys, (err, result) => {
                    if (err) resolve({ data: null, error: new Error(err) });
                    else resolve({ data: result ?? true, error: null });
                });
            });
        },
        [cloudStorage]
    );

    return {
        getItem,
        setItem,
        getKeys,
        getItems,
        removeItem,
        removeItems,
    };
};

export default useCloudStorage;
