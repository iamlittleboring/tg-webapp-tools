import { useEffect } from "react";
import { useWebApp } from "../hooks";

export const SettingsButton: React.FC<{
    onClick: VoidFunction;
    isVisible?: boolean;
}> = ({ onClick, isVisible = true }) => {
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
