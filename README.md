# tg-webapp-tools

React helpers for working with the Telegram WebApp API.

## What is included

- `WebAppProvider` for exposing the Telegram WebApp instance through React context
- button components for Telegram native buttons
- hooks covering the Telegram WebApp JS API: lifecycle, dialogs, sharing, permissions, storage (cloud/device/secure), sensors, location, biometrics, payments
- `SetupWebApp` for synchronizing Telegram UI colors with your app

Full usage examples for every hook are in its JSDoc (`@example`, visible on hover in your editor). See [src/hooks/README.md](https://github.com/iamlittleboring/tg-webapp-tools/blob/main/src/hooks/README.md) for validating init data on a backend and testing without one, and [CHANGELOG.md](CHANGELOG.md) for release history.

## Installation

```bash
npm install @iamlittleboring/tg-webapp-tools @twa-dev/sdk
```

This package is published to npm. The consuming app also needs `react`, `react-dom`, and `@twa-dev/sdk`.

## Quick start

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

- `WebAppProvider` is safe to render outside Telegram and during SSR — hooks receive `null` instead of crashing.
- Hooks wrapping versioned Bot API features (fullscreen, orientation lock, vertical swipes, emoji status access, requestChat) expose an `isSupported` flag; use `useIsVersionAtLeast(version)` / `isVersionAtLeast(current, target)` for anything else.
- `@twa-dev/types` (the upstream type definitions) is pinned at Bot API 8.0.2. Fields from Bot API 9.0-10.1 (`DeviceStorage`, `SecureStorage`, `hideKeyboard`, `requestChat`, `chat_join_request_query_id`, `iconCustomEmojiId`) are augmented locally in `src/types/telegram.ts`.

## Hooks

- **lifecycle & state**: `useReady`, `useClose`, `useExpand`, `useWebAppEvent`, `useViewport`, `useInitData`, `useThemeParams`, `useSafeAreaInsets`, `useIsVersionAtLeast`
- **dialogs**: `usePopups` (alert/confirm/popup), `useScanQrPopup`, `useReadTextFromClipboard`
- **navigation & sharing**: `useSharing` (openLink/openTelegramLink/switchInlineQuery/shareToStory/shareMessage), `useSendData`
- **permissions & UI**: `usePermissions` (requestContact/requestWriteAccess/requestEmojiStatusAccess/requestChat), `useHomeScreen`, `useAddToHomeScreen`, `useClosingConfirmation` (reactive `isEnabled`), `useVerticalSwipes`, `useFullscreen`, `useOrientationLock`, `useHideKeyboard`, `useBottomBarColor`
- **storage**: `useCloudStorage`, `useDeviceStorage`, `useSecureStorage`
- **sensors & managers**: `useBiometricManager`, `useAccelerometer`, `useDeviceOrientation`, `useGyroscope`, `useLocationManager`
- **payments**: `useOpenInvoice` (status typed as the exported `InvoiceStatus`)
- **init data**: `useValidateInitData` — see below

## Validating init data

`useValidateInitData` sends `Telegram.WebApp.initData` to a URL of your choice, or to a custom async function, and resolves to `{ data, error }`.

```tsx
const validateInitData = useValidateInitData();

const { data, error } = await validateInitData("https://backend.com/api/verify-telegram");
// or, with full control:
const { data, error } = await validateInitData(async (initData) => {
    const res = await myApiClient.verifyTelegram(initData);
    return res.user;
});
```

See [src/hooks/README.md](https://github.com/iamlittleboring/tg-webapp-tools/blob/main/src/hooks/README.md) for a backend (FastAPI/HMAC) example and a dev-only mock-validator recipe for testing without one.

## Breaking changes (2.0.0)

- `useValidateInitData` no longer appends `/telegram/getData` to a base URL — pass the full endpoint URL (or a custom validator function) instead.
- Removed, replaced by grouped hooks:
  - `useShowAlert`, `useShowConfirm`, `useShowPopup` → `usePopups()`
  - `useOpenLink`, `useOpenTelegramLink`, `useSwitchInlineQuery`, `useShareToStory`, `useShareMessage` → `useSharing()`
  - `useRequestContact`, `useRequestWriteAccess`, `useRequestEmojiStatusAccess` → `usePermissions()`
- `useHomeScreen`, `useAddToHomeScreen`, `useReady`, `useClose`, and `useExpand` are unchanged.
