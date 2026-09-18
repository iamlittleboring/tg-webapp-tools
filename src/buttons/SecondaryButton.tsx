import React, { useEffect } from "react";
import { useWebApp } from "../hooks";

export const SecondaryButton: React.FC<{
    text: string;
    color?: `#${string}`;
    textColor?: `#${string}`;
    position?: "top" | "left" | "bottom" | "right";
    isActive: boolean;
    isVisible?: boolean;
    isProgressVisible?: boolean;
    hasShineEffect?: boolean;
    /** Bot API 9.5+ */
    iconCustomEmojiId?: string;
    onClick: VoidFunction;
}> = ({
    text,
    color,
    textColor,
    position,
    isActive = true,
    isVisible = true,
    isProgressVisible = false,
    hasShineEffect = false,
    iconCustomEmojiId,
    onClick = () => {},
}) => {
    const secondaryButton = useWebApp()?.SecondaryButton;

    useEffect(() => {
        const params = {
            text: text,
            color: color,
            text_color: textColor,
            position: position,
            is_active: isActive,
            is_visible: isVisible,
            has_shine_effect: hasShineEffect,
            icon_custom_emoji_id: iconCustomEmojiId,
        };

        secondaryButton?.setParams(params);

        return () => {
            secondaryButton?.hide();
        };
    }, [
        secondaryButton,
        color,
        isActive,
        isVisible,
        position,
        text,
        textColor,
        hasShineEffect,
        iconCustomEmojiId,
    ]);

    useEffect(() => {
        if (isProgressVisible) {
            secondaryButton?.showProgress();
            secondaryButton?.disable();
        } else {
            secondaryButton?.hideProgress();
            if (isActive) {
                secondaryButton?.enable();
            } else {
                secondaryButton?.disable();
            }
        }
    }, [secondaryButton, isActive, isProgressVisible]);

    useEffect(() => {
        if (!onClick) {
            return;
        }
        secondaryButton?.onClick(onClick);

        return () => {
            secondaryButton?.offClick(onClick);
        };
    }, [secondaryButton, onClick]);

    return null;
};
