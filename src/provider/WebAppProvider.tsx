import { WebApp as WebAppType } from "@twa-dev/types";
import React, { useEffect, useState } from "react";
import { WebAppContext } from "../context";
import { getTelegramWebApp } from "../utils/webApp";

type WebAppProviderProps = React.PropsWithChildren<{
    webApp?: WebAppType | null;
}>;

const WebAppProvider: React.FC<WebAppProviderProps> = ({ children, webApp }) => {
    const [twa, setTwa] = useState<WebAppType | null>(webApp ?? null);

    useEffect(() => {
        setTwa(webApp ?? getTelegramWebApp());
    }, [webApp]);

    return (
        <WebAppContext.Provider value={twa}>{children}</WebAppContext.Provider>
    );
};

export default WebAppProvider;
