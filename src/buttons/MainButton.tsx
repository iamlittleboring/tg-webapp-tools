import React, { useEffect } from "react";
import { useWebApp } from "../hooks";

export const MainButton: React.FC<{
    text: string;
    color?: `#${string}`;
    textColor?: `#${string}`;
    isActive: boolean;
    isVisible?: boolean;
    isProgressVisible?: boolean;
    hasShineEffect?: boolean;
    onClick: VoidFunction;
}> = ({
    text,
    color,
    textColor,
    isActive = true,
    isVisible = true,
    isProgressVisible = false,
    hasShineEffect = false,
    onClick = () => {},
}) => {
    const mainButton = useWebApp()?.MainButton;

    useEffect(() => {
        mainButton?.setParams({
            text: text,
            color: color,
            text_color: textColor,
            is_active: isActive,
            is_visible: isVisible,
            has_shine_effect: hasShineEffect,
        });

        return () => {
            mainButton?.hide();
        };
    }, [mainButton, color, isActive, isVisible, text, textColor, hasShineEffect]);

    useEffect(() => {
        if (isProgressVisible) {
            mainButton?.showProgress();
            mainButton?.disable();
        } else {
            mainButton?.hideProgress();
            if (isActive) {
                mainButton?.enable();
            } else {
                mainButton?.disable();
            }
        }
    }, [mainButton, isActive, isProgressVisible]);

    useEffect(() => {
        mainButton?.onClick(onClick);

        return () => {
            mainButton?.offClick(onClick);
        };
    }, [mainButton, onClick]);

    return null;
};
