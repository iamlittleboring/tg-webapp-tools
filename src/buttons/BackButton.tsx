import { useEffect } from "react";
import { useWebApp } from "../hooks";

export const BackButton: React.FC<{
    onClick: VoidFunction;
    isVisible?: boolean;
}> = ({ onClick, isVisible = true }) => {
    const backButton = useWebApp()?.BackButton;

    useEffect(() => {
        if (isVisible) {
            backButton?.show();
        } else {
            backButton?.hide();
        }

        return () => {
            backButton?.hide();
        };
    }, [backButton, isVisible]);

    useEffect(() => {
        if (!onClick) {
            return;
        }

        backButton?.onClick(onClick);

        return () => {
            backButton?.offClick(onClick);
        };
    }, [backButton, onClick]);

    return null;
};
