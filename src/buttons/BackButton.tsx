import { useEffect } from "react";
import { useWebApp } from "../hooks";

export interface BackButtonProps {
    onClick: VoidFunction;
    isVisible?: boolean;
}

/**
 * Controls Telegram's native Back Button in the Mini App header.
 *
 * The component shows or hides `Telegram.WebApp.BackButton`, subscribes to its
 * click event while mounted, and hides the button during cleanup.
 *
 * @example
 * ```tsx
 * <BackButton onClick={() => navigate(-1)} />
 * ```
 *
 * @example
 * ```tsx
 * <BackButton isVisible={canGoBack} onClick={handleBack} />
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#backbutton
 */
export const BackButton: React.FC<BackButtonProps> = ({ onClick, isVisible = true }) => {
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
