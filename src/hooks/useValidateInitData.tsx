import { useCallback } from "react";
import useWebApp from "./useWebApp";

type ValidateInitDataResult<T> = {
    data: T | null;
    error: Error | null;
};

type ValidateInitDataRequestOptions = {
    endpoint?: string;
    requestInit?: RequestInit;
};

const DEFAULT_ENDPOINT = "/telegram/getData";

const getEndpointUrl = (baseUrl: string, endpoint = DEFAULT_ENDPOINT) => {
    const normalizedBaseUrl = /^(https?:)?\/\//.test(baseUrl)
        ? baseUrl
        : `https://${baseUrl}`;
    const url = new URL(normalizedBaseUrl);
    const basePath = url.pathname.replace(/\/+$/, "");
    const endpointPath = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

    url.pathname = `${basePath}${endpointPath}`;

    return url.toString();
};

/**
 * Returns a callback that sends Telegram `initData` to your backend for validation and JSON decoding.
 *
 * The callback appends `/telegram/getData` to the passed base URL and sends the raw
 * `Telegram.WebApp.initData` value in a JSON POST body.
 *
 * @example
 * ```tsx
 * const validateInitData = useValidateInitData();
 * const result = await validateInitData("https://backend.com");
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
 * @app.post("/telegram/getData")
 * async def get_telegram_data(request: Request):
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
 *     return data
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */
const useValidateInitData = <T = unknown>() => {
    const webApp = useWebApp();

    return useCallback(
        async (
            baseUrl: string,
            options: ValidateInitDataRequestOptions = {}
        ): Promise<ValidateInitDataResult<T>> => {
            try {
                const initData = webApp?.initData ?? "";

                if (!initData) {
                    throw new Error("Telegram initData is unavailable.");
                }

                const requestInit = options.requestInit ?? {};
                const headers = new Headers(requestInit.headers);

                if (!headers.has("Content-Type")) {
                    headers.set("Content-Type", "application/json");
                }

                const response = await fetch(
                    getEndpointUrl(baseUrl, options.endpoint),
                    {
                        ...requestInit,
                        method: "POST",
                        headers,
                        body: requestInit.body ?? JSON.stringify({ initData }),
                    }
                );

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
