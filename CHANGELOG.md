# Changelog

## 2.0.0 (unreleased)

### Breaking changes

- `useValidateInitData` no longer builds a URL by appending `/telegram/getData` to a base URL. It now accepts either the full endpoint URL to POST to, or a custom `(initData) => Promise<T>` validator function.
- Removed `useShowAlert`, `useShowConfirm`, `useShowPopup` — replaced by `usePopups()` (`{ alert, confirm, popup }`).
- Removed `useOpenLink`, `useOpenTelegramLink`, `useSwitchInlineQuery`, `useShareToStory`, `useShareMessage` — replaced by `useSharing()` (`{ openLink, openTelegramLink, switchInlineQuery, shareToStory, shareMessage }`).
- Removed `useRequestContact`, `useRequestWriteAccess`, `useRequestEmojiStatusAccess` — replaced by `usePermissions()` (`{ requestContact, requestWriteAccess, requestEmojiStatusAccess, requestChat }`).

### Added

- `useDeviceStorage`, `useSecureStorage` (Bot API 9.0+ device/secure local storage, mirrors `useCloudStorage`).
- `useHideKeyboard` (Bot API 9.1+).
- `usePermissions().requestChat` (Bot API 9.6+).
- `useBottomBarColor` (Bot API 7.10+ imperative control, in addition to `SetupWebApp`).
- `useIsVersionAtLeast` hook and `isVersionAtLeast` util for Bot API feature detection.
- `isSupported` flag on `useFullscreen`, `useOrientationLock`, `useVerticalSwipes`, and on `permissions.requestEmojiStatusAccess` / `permissions.requestChat` (as a property on the function).
- `useClosingConfirmation` now also returns the current `isEnabled` value.
- `iconCustomEmojiId` prop on `MainButton` / `SecondaryButton` (Bot API 9.5+).
- `InvoiceStatus` type exported from the package root, used by `useOpenInvoice`.
- Local type augmentation for `@twa-dev/types` (pinned at Bot API 8.0.2): `DeviceStorage`, `SecureStorage`, `hideKeyboard`, `requestChat`, `chat_join_request_query_id`.
- README recipe for testing validation UI without a backend (dev-only mock validator).

### Unchanged

- `useHomeScreen`, `useAddToHomeScreen`, `useReady`, `useClose`, `useExpand`.

## 1.0.5

See git history.
