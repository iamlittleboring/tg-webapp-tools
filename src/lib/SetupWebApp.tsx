import React, { useEffect } from "react";
import { useWebApp } from "../hooks";

export const SetupWebApp: React.FC<{
    backgroundColor: "bg_color" | "secondary_bg_color" | `#${string}`;
    headerColor: "bg_color" | "secondary_bg_color" | `#${string}`;
    bottomBarColor: "bg_color" | "secondary_bg_color" | `#${string}`;
}> = ({ backgroundColor, headerColor, bottomBarColor }) => {
    const webApp = useWebApp();

    useEffect(() => {
        webApp?.setBackgroundColor?.(backgroundColor);
        webApp?.setHeaderColor?.(headerColor);
        webApp?.setBottomBarColor?.(bottomBarColor);
    }, []);

    return null;
};
