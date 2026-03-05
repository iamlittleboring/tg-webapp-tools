import { useEffect } from "react";
import { useWebApp } from "../hooks";

export const BackButton: React.FC<{
    onClick: VoidFunction;
}> = ({ onClick }) => {
    const backButton = useWebApp()?.BackButton;

    useEffect(() => {
        backButton?.show();

        return () => {
            backButton?.hide();
        };
    }, [backButton]);

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
