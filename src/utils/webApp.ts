import { Telegram, WebApp } from "@twa-dev/types";

type TelegramWindow = Window & {
    Telegram?: Telegram;
};

export const getTelegramWebApp = (
    source: TelegramWindow | undefined =
        typeof window !== "undefined"
            ? (window as TelegramWindow)
            : undefined
): WebApp | null => {
    return source?.Telegram?.WebApp ?? null;
};

export const createFeatureUnavailableError = (feature: string) =>
    new Error(
        `${feature} is unavailable. Make sure Telegram WebApp is initialized and supported in the current environment.`
    );
