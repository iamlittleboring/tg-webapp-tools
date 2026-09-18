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
    /** Bot API 9.5+ */
    iconCustomEmojiId?: string;
    onClick: VoidFunction;
}> = ({
    text,
    color,
    textColor,
    isActive = true,
    isVisible = true,
    isProgressVisible = false,
    hasShineEffect = false,
    iconCustomEmojiId,
    onClick = () => {},
}) => {
    const mainButton = useWebApp()?.MainButton;

    useEffect(() => {
        // Assigned to a variable (not passed inline) so TS structural typing allows the
        // extra icon_custom_emoji_id field without excess-property-check errors against
        // @twa-dev/types' stale, unexported BottomButtonParams shape.
        const params = {
            text: text,
            color: color,
            text_color: textColor,
            is_active: isActive,
            is_visible: isVisible,
            has_shine_effect: hasShineEffect,
            icon_custom_emoji_id: iconCustomEmojiId,
        };

        mainButton?.setParams(params);

        return () => {
            mainButton?.hide();
        };
    }, [
        mainButton,
        color,
        isActive,
        isVisible,
        text,
        textColor,
        hasShineEffect,
        iconCustomEmojiId,
    ]);

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
