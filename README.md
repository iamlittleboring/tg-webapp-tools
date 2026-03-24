# tg-webapp-tools

React helpers for working with the Telegram WebApp API.

## What is included

- `WebAppProvider` for exposing the Telegram WebApp instance through React context
- button components for Telegram native buttons
- hooks for common Telegram WebApp actions
- hooks for Telegram events, viewport/init/theme data, safe area insets
- hooks for native capabilities such as QR scan, fullscreen, story sharing, sensors, location, and biometrics
- `SetupWebApp` for synchronizing Telegram UI colors with your app

## Installation

```bash
npm install tg-webapp-tools @twa-dev/sdk
```

This package expects `react`, `react-dom`, and `@twa-dev/sdk` to be installed by the consuming app.

## Basic usage

Make sure the Telegram WebApp script is available before rendering your app.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { SetupWebApp, WebAppProvider, useReady } from "tg-webapp-tools";

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
- Some Telegram features are optional and may not exist on every client version. Hooks in this package now guard against missing APIs where possible.
- `useDownloadFile` throws a descriptive error if the Telegram client does not expose `downloadFile`, so it is best used after a capability check in the consuming app.

## Development

```bash
npm run build
npm run typecheck
```

## Hook coverage

The package now includes wrappers for:

- app lifecycle and state: `useReady`, `useWebAppEvent`, `useViewport`, `useInitData`, `useThemeParams`, `useSafeAreaInsets`
- user prompts and system UI: `useShowAlert`, `useShowConfirm`, `useShowPopup`, `useScanQrPopup`, `useReadTextFromClipboard`
- navigation and sharing: `useOpenLink`, `useOpenTelegramLink`, `useSwitchInlineQuery`, `useSendData`, `useShareToStory`, `useShareMessage`
- permissions and device features: `useRequestContact`, `useRequestWriteAccess`, `useRequestEmojiStatusAccess`, `useHomeScreen`, `useClosingConfirmation`, `useVerticalSwipes`, `useFullscreen`, `useOrientationLock`
- managers: `useCloudStorage`, `useBiometricManager`, `useAccelerometer`, `useDeviceOrientation`, `useGyroscope`, `useLocationManager`
