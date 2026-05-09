import { useContext } from "react";
import { WebAppContext } from "../context";

/**
 * Returns the current Telegram WebApp instance from context.
 *
 * Returns `null` outside Telegram or before the provider receives a WebApp instance.
 *
 * @example
 * ```tsx
 * const webApp = useWebApp();
 * webApp?.ready();
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useWebApp = () => useContext(WebAppContext);

export default useWebApp;
