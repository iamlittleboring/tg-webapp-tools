import { Telegram, WebApp as WebAppType } from "@twa-dev/types";
import React, { useEffect, useState } from "react";
import { WebAppContext } from "../context";

const WebAppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [twa, setTwa] = useState<WebAppType | null>(null);
    useEffect(() => {
        const webapp = (window as unknown as Window & { Telegram: Telegram })
            .Telegram.WebApp;
        setTwa(webapp);
    }, []);

    return (
        <WebAppContext.Provider value={twa}>{children}</WebAppContext.Provider>
    );
};

export default WebAppProvider;
