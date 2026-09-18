# tg-webapp-tools

React helpers for working with the Telegram WebApp API.

## What is included

- `WebAppProvider` for exposing the Telegram WebApp instance through React context
- button components for Telegram native buttons
- hooks for common Telegram WebApp actions
- hooks for Telegram events, viewport/init/theme data, safe area insets
- hooks for native capabilities such as QR scan, fullscreen, story sharing, sensors, location, biometrics, and device/secure storage
- `SetupWebApp` for synchronizing Telegram UI colors with your app

## Installation

```bash
npm install @iamlittleboring/tg-webapp-tools @twa-dev/sdk
```

This package is published to npm. The consuming app also needs `react`, `react-dom`, and `@twa-dev/sdk`.

## Basic usage

Make sure the Telegram WebApp script is available before rendering your app.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
    SetupWebApp,
    WebAppProvider,
    useReady,
} from "@iamlittleboring/tg-webapp-tools";

const App = () => {
    const ready = useReady();

    React.useEffect(() => {
        ready();
    }, [ready]);

    return (
        <>
            <SetupWebApp
                backgroundColor="bg_color"
                headerColor="bg_color"
                bottomBarColor="secondary_bg_color"
            />
            <div>Telegram Mini App</div>
        </>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <WebAppProvider>
        <App />
    </WebAppProvider>
);
```

## Notes

- `WebAppProvider` is safe to render outside Telegram and during SSR. In unsupported environments, hooks receive `null` instead of crashing immediately.
- Some Telegram features are optional and may not exist on every client version. Hooks that wrap Bot API 7.7+/8.0+/9.x features expose an `isSupported` flag (see [Version detection](#version-detection)) instead of only failing silently at runtime.
- `useDownloadFile` throws a descriptive error if the Telegram client does not expose `downloadFile`, so it is best used after a capability check in the consuming app.
- `@twa-dev/types` (the upstream type definitions this package builds on) is currently pinned at Bot API 8.0.2 and hasn't tracked newer releases. Fields introduced in Bot API 9.0-10.1 (`DeviceStorage`, `SecureStorage`, `hideKeyboard`, `requestChat`, `chat_join_request_query_id`, `iconCustomEmojiId`) are augmented locally in this package (`src/types/telegram.ts`) so they're still fully typed.

## Version detection

```tsx
import { useIsVersionAtLeast, useFullscreen } from "@iamlittleboring/tg-webapp-tools";

const isSupported = useIsVersionAtLeast("8.0");

// or, built into feature hooks that wrap versioned APIs:
const { request, isSupported: fullscreenSupported } = useFullscreen();
```

A non-hook `isVersionAtLeast(current, target)` util is also exported for use outside components.

## Hook coverage

The package now includes wrappers for:

- app lifecycle and state: `useReady`, `useClose`, `useExpand`, `useWebAppEvent`, `useViewport`, `useInitData`, `useValidateInitData`, `useThemeParams`, `useSafeAreaInsets`, `useIsVersionAtLeast`
- native dialogs: `usePopups` (alert/confirm/popup), `useScanQrPopup`, `useReadTextFromClipboard`
- navigation and sharing: `useSharing` (openLink/openTelegramLink/switchInlineQuery/shareToStory/shareMessage), `useSendData`
- permissions: `usePermissions` (requestContact/requestWriteAccess/requestEmojiStatusAccess/requestChat), `useHomeScreen`, `useAddToHomeScreen`, `useClosingConfirmation`, `useVerticalSwipes`, `useFullscreen`, `useOrientationLock`, `useHideKeyboard`, `useBottomBarColor`
- storage: `useCloudStorage`, `useDeviceStorage`, `useSecureStorage`
- managers: `useBiometricManager`, `useAccelerometer`, `useDeviceOrientation`, `useGyroscope`, `useLocationManager`
- payments: `useOpenInvoice` (with the exported `InvoiceStatus` type)

### usePopups

Native alert/confirm/custom popup dialogs.

```tsx
const popups = usePopups();
popups.alert("Saved");
popups.confirm("Delete item?", (confirmed) => confirmed && deleteItem());
popups.popup({ title: "Delete", message: "Are you sure?", buttons: [] });
```

### useSharing

Opening links, switching to inline mode, and sharing to stories/chats.

```tsx
const sharing = useSharing();
sharing.openLink("https://example.com");
sharing.shareToStory("https://example.com/story.png");
```

### usePermissions

Requesting contact, write access, emoji status access, and chat picking. `requestEmojiStatusAccess` and `requestChat` carry an `isSupported` flag as a property on the function itself.

```tsx
const permissions = usePermissions();
permissions.requestContact((access, response) => console.log(access, response));

if (permissions.requestChat.isSupported) {
    permissions.requestChat(requestId);
}
```

### useDeviceStorage / useSecureStorage

Bot API 9.0+ persistent and secure per-device storage, mirroring the `useCloudStorage` API (`{ data, error }` results instead of Telegram callbacks).

```tsx
const deviceStorage = useDeviceStorage();
await deviceStorage.setItem("theme", "dark");
const { data } = await deviceStorage.getItem("theme");
```

```tsx
const secureStorage = useSecureStorage();
const { data, canRestore } = await secureStorage.getItem("auth_token");
if (!data && canRestore) {
    await secureStorage.restoreItem("auth_token");
}
```

### useHideKeyboard

Bot API 9.1+. Hides the on-screen keyboard if visible.

```tsx
const hideKeyboard = useHideKeyboard();
hideKeyboard();
```

### useBottomBarColor

Bot API 7.10+. Imperative bottom bar color control, in addition to setting it once via `SetupWebApp`.

```tsx
const setBottomBarColor = useBottomBarColor();
setBottomBarColor("secondary_bg_color");
```

### MainButton / SecondaryButton `iconCustomEmojiId`

Bot API 9.5+. Shows a custom emoji before the button text.

```tsx
<MainButton text="Pay" isActive iconCustomEmojiId="5361929555871004815" onClick={pay} />
```

## Validating init data

`useValidateInitData` sends `Telegram.WebApp.initData` to a URL of your choice, or to a custom async function, and resolves to `{ data, error }`.

```tsx
const validateInitData = useValidateInitData();

// Option 1: POST { initData } to a URL
const { data, error } = await validateInitData("https://backend.com/api/verify-telegram");

// Option 2: full control via your own function
const { data, error } = await validateInitData(async (initData) => {
    const res = await myApiClient.verifyTelegram(initData);
    return res.user;
});
```

Backend example (FastAPI, HMAC-SHA256 per the [Telegram docs](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app)):

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

### Recipe: testing without a backend

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

## Breaking changes (2.0.0)

- `useValidateInitData` no longer appends `/telegram/getData` to a base URL. Pass the full endpoint URL (or a custom validator function) instead.
- The following hooks were removed and replaced by grouped hooks:
  - `useShowAlert`, `useShowConfirm`, `useShowPopup` → `usePopups()`
  - `useOpenLink`, `useOpenTelegramLink`, `useSwitchInlineQuery`, `useShareToStory`, `useShareMessage` → `useSharing()`
  - `useRequestContact`, `useRequestWriteAccess`, `useRequestEmojiStatusAccess` → `usePermissions()`
- `useHomeScreen`, `useAddToHomeScreen`, `useReady`, `useClose`, and `useExpand` are unchanged.
