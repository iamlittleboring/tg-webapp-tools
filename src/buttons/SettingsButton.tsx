import { useEffect } from "react";
import { useWebApp } from "../hooks";

export interface SettingsButtonProps {
    onClick: VoidFunction;
    isVisible?: boolean;
}

/**
 * Controls Telegram's native Settings item in the Mini App context menu.
 *
 * The component shows or hides `Telegram.WebApp.SettingsButton`, subscribes to
 * its click event while mounted, and hides the item during cleanup.
 *
 * Requires Telegram Bot API 7.0+ support in the user's client.
 *
 * @example
 * ```tsx
 * <SettingsButton onClick={() => setSettingsOpen(true)} />
 * ```
 *
 * @example
 * ```tsx
 * <SettingsButton isVisible={showSettings} onClick={openSettings} />
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#settingsbutton
 */
export const SettingsButton: React.FC<SettingsButtonProps> = ({
    onClick,
    isVisible = true,
}) => {
    const settingsButton = useWebApp()?.SettingsButton;

    useEffect(() => {
        if (isVisible) {
            settingsButton?.show();
        } else {
            settingsButton?.hide();
        }

        return () => {
            settingsButton?.hide();
        };
    }, [isVisible, settingsButton]);

    useEffect(() => {
        if (!onClick) {
            return;
        }

        settingsButton?.onClick(onClick);

        return () => {
            settingsButton?.offClick(onClick);
        };
    }, [settingsButton, onClick]);

    return null;
};
