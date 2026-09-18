# Validating init data

`useValidateInitData` ([useValidateInitData.tsx](./useValidateInitData.tsx)) sends `Telegram.WebApp.initData` to a URL of your choice, or to a custom async function, and resolves to `{ data, error }` instead of throwing.

```tsx
const validateInitData = useValidateInitData();

const { data, error } = await validateInitData("https://backend.com/api/verify-telegram");
// or, with full control:
const { data, error } = await validateInitData(async (initData) => {
    const res = await myApiClient.verifyTelegram(initData);
    return res.user;
});
```

## Verifying init data on your backend (FastAPI example)

HMAC-SHA256 per the [Telegram docs](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app):

```py
import hashlib
import hmac
import json
from urllib.parse import parse_qsl

from fastapi import FastAPI, HTTPException, Request

app = FastAPI()
BOT_TOKEN = "123456:ABC-DEF"

@app.post("/api/verify-telegram")
async def verify_telegram(request: Request):
    data = dict(parse_qsl((await request.json())["initData"]))
    received_hash = data.pop("hash", "")
    check_string = "\n".join(f"{k}={v}" for k, v in sorted(data.items()))
    secret = hmac.new(b"WebAppData", BOT_TOKEN.encode(), hashlib.sha256).digest()
    valid_hash = hmac.new(secret, check_string.encode(), hashlib.sha256).hexdigest()

    if not hmac.compare_digest(valid_hash, received_hash):
        raise HTTPException(403, "Invalid initData")

    return {"user": json.loads(data["user"])}
```

## Testing without a backend

While your backend endpoint doesn't exist yet, pass a mock validator instead of a URL, gated behind a dev-only check. This only exercises your app's success/failure UI branches — it does **not** verify `initData` cryptographically, so never ship it enabled in production.

```tsx
const mockValidator = (initData: string) =>
    new Promise((resolve, reject) => {
        webApp?.showPopup(
            {
                message: "Validation succeeded?",
                buttons: [
                    { id: "yes", type: "default", text: "Yes" },
                    { id: "no", type: "default", text: "No" },
                ],
            },
            (id) =>
                id === "yes"
                    ? resolve({ user: webApp.initDataUnsafe.user })
                    : reject(new Error("mock: validation failed"))
        );
    });

const { data, error } = await validateInitData(
    import.meta.env.DEV ? mockValidator : "https://backend.com/api/verify-telegram"
);
```
