import { useCallback } from "react";
import useWebApp from "./useWebApp";

type ValidateInitDataResult<T> = {
    data: T | null;
    error: Error | null;
};

type InitDataValidator<T> = (initData: string) => Promise<T>;

/**
 * Returns a callback that verifies Telegram `initData` against your own backend
 * (or any custom validator), and resolves to `{ data, error }` instead of throwing.
 *
 * Pass a URL to POST `{ initData }` to, or pass your own async function for full
 * control over the request (or for local/dev-only checks — see README for a
 * mock-validator recipe).
 *
 * @example
 * ```tsx
 * const validateInitData = useValidateInitData();
 * const { data, error } = await validateInitData("https://backend.com/api/verify-telegram");
 * ```
 *
 * @example Custom validator
 * ```tsx
 * const { data, error } = await validateInitData(async (initData) => {
 *   const res = await myApiClient.verifyTelegram(initData);
 *   return res.user;
 * });
 * ```
 *
 * @example FastAPI backend
 * ```py
 * import hashlib
 * import hmac
 * import json
 * from urllib.parse import parse_qsl
 *
 * from fastapi import FastAPI, HTTPException, Request
 *
 * app = FastAPI()
 * BOT_TOKEN = "123456:ABC-DEF"
 *
 * @app.post("/api/verify-telegram")
 * async def verify_telegram(request: Request):
 *     data = dict(parse_qsl((await request.json())["initData"]))
 *     received_hash = data.pop("hash", "")
 *     check_string = "\n".join(f"{k}={v}" for k, v in sorted(data.items()))
 *     secret = hmac.new(b"WebAppData", BOT_TOKEN.encode(), hashlib.sha256).digest()
 *     valid_hash = hmac.new(secret, check_string.encode(), hashlib.sha256).hexdigest()
 *
 *     if not hmac.compare_digest(valid_hash, received_hash):
 *         raise HTTPException(403, "Invalid initData")
 *
 *     for key in ("user", "receiver", "chat"):
 *         if key in data:
 *             data[key] = json.loads(data[key])
 *
 *     return {"user": data.get("user")}
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */
const useValidateInitData = <T = unknown>() => {
    const webApp = useWebApp();

    return useCallback(
        async (
            target: string | InitDataValidator<T>
        ): Promise<ValidateInitDataResult<T>> => {
            try {
                const initData = webApp?.initData ?? "";

                if (!initData) {
                    throw new Error("Telegram initData is unavailable.");
                }

                if (typeof target === "function") {
                    return { data: await target(initData), error: null };
                }

                const response = await fetch(target, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ initData }),
                });

                if (!response.ok) {
                    throw new Error(
                        `Telegram initData request failed with status ${response.status}.`
                    );
                }

                return {
                    data: (await response.json()) as T,
                    error: null,
                };
            } catch (error) {
                return {
                    data: null,
                    error:
                        error instanceof Error
                            ? error
                            : new Error(String(error)),
                };
            }
        },
        [webApp]
    );
};

export default useValidateInitData;
