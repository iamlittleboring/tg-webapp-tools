import { useEffect } from "react";
import { useWebApp } from "../hooks";

export const SettingsButton: React.FC<{
    onClick: VoidFunction;
}> = ({ onClick }) => {
    const settingsButton = useWebApp()?.SettingsButton;

    useEffect(() => {
        settingsButton?.show();

        return () => {
            settingsButton?.hide();
        };
    }, [settingsButton]);

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
