import { WebApp } from "@twa-dev/types";
import { createContext } from "react";

const WebAppContext = createContext<WebApp | null>(null);

export default WebAppContext;
