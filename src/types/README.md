# Local type extensions

[telegram.ts](./telegram.ts) patches `@twa-dev/types` via TypeScript's `declare module` merging.

## Why this exists

`@twa-dev/types` is pinned at Bot API 8.0.2 and hasn't tracked newer Telegram releases, so it's missing everything from Bot API 9.0 onward: `DeviceStorage`, `SecureStorage`, `hideKeyboard`, `requestChat`, `chat_join_request_query_id`, `iconCustomEmojiId`. Rather than forking the upstream package or sprinkling `as any` across hooks, the missing pieces are declared here once and merged into `@twa-dev/types`' own interfaces.

## The import gotcha

Declaration merging only takes effect for files that are part of the same TypeScript program. Any source file that touches an augmented field (e.g. `webApp.DeviceStorage`, `webApp.hideKeyboard`) must `import "../types/telegram"` for a side effect, even though nothing is used from it directly — see [useDeviceStorage.tsx](../hooks/useDeviceStorage.tsx) or [usePermissions.tsx](../hooks/usePermissions.tsx) for the pattern.

For **consumers** of this package to see the augmented types too, the augmentation also needs to be reachable from the package's own emitted `.d.ts` graph — that's why [index.ts](../index.ts) side-effect-imports it at the top. If you add a new hook that relies on an augmented field, make sure it imports `../types/telegram` (directly or transitively) — otherwise the field will work at runtime but silently disappear from consumers' type-checking.

## Adding a field for a new Bot API version

1. Add the field/method to the relevant `interface` inside the `declare module "@twa-dev/types"` block, with a `/** Bot API X.Y+ */` doc comment.
2. If it's a new object (like `DeviceStorage`/`SecureStorage`), define its own exported interface above the augmentation block first.
3. `import "../types/telegram"` in whichever hook file uses it.
4. Run `npm run typecheck` — declaration merging errors show up there, not at runtime.
