import { InvoiceStatuses } from "@twa-dev/types";

type StorageErrorCallback = (
    error: string | null,
    result?: boolean
) => unknown;

/** `"paid" | "cancelled" | "failed" | "pending"` — mirrors Telegram's `InvoiceStatuses`. */
export type InvoiceStatus = InvoiceStatuses;

/**
 * @see https://core.telegram.org/bots/webapps#devicestorage
 */
export interface DeviceStorage {
    setItem: (
        key: string,
        value: string,
        callback?: StorageErrorCallback
    ) => DeviceStorage;
    getItem: (
        key: string,
        callback: (error: string | null, value?: string | null) => unknown
    ) => DeviceStorage;
    removeItem: (key: string, callback?: StorageErrorCallback) => DeviceStorage;
    clear: (callback?: StorageErrorCallback) => DeviceStorage;
}

/**
 * @see https://core.telegram.org/bots/webapps#securestorage
 */
export interface SecureStorage {
    setItem: (
        key: string,
        value: string,
        callback?: StorageErrorCallback
    ) => SecureStorage;
    getItem: (
        key: string,
        callback: (
            error: string | null,
            value?: string | null,
            canRestore?: boolean
        ) => unknown
    ) => SecureStorage;
    restoreItem: (
        key: string,
        callback?: (error: string | null, value?: string | null) => unknown
    ) => SecureStorage;
    removeItem: (key: string, callback?: StorageErrorCallback) => SecureStorage;
    clear: (callback?: StorageErrorCallback) => SecureStorage;
}

/**
 * `@twa-dev/types` is pinned at Bot API 8.0.2 and hasn't tracked newer
 * releases, so the fields below (Bot API 9.0-10.1) are added here locally.
 */
declare module "@twa-dev/types" {
    interface WebApp {
        /** Bot API 9.0+ */
        DeviceStorage: DeviceStorage;
        /** Bot API 9.0+ */
        SecureStorage: SecureStorage;
        /** Bot API 9.1+ */
        hideKeyboard: () => void;
        /** Bot API 9.6+ */
        requestChat: (
            requestId: string,
            callback?: (isSent: boolean) => unknown
        ) => void;
    }

    interface WebAppInitData {
        /** Bot API 10.1+ */
        chat_join_request_query_id?: string;
    }
}
