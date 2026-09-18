/**
 * Compares two dot-separated Bot API version strings.
 *
 * Mirrors the comparison Telegram clients use internally for `WebApp.isVersionAtLeast`.
 *
 * @example
 * ```ts
 * isVersionAtLeast("7.10", "7.9"); // true
 * isVersionAtLeast("8.0", "8.0.1"); // false
 * ```
 */
export const isVersionAtLeast = (
    currentVersion: string,
    targetVersion: string
): boolean => {
    const current = currentVersion.split(".").map(Number);
    const target = targetVersion.split(".").map(Number);

    for (let i = 0; i < Math.max(current.length, target.length); i++) {
        const diff = (current[i] ?? 0) - (target[i] ?? 0);

        if (diff !== 0) {
            return diff > 0;
        }
    }

    return true;
};
