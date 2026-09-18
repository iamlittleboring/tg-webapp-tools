import { useCallback } from "react";
import useWebApp from "./useWebApp";
import { InvoiceStatus } from "../types/telegram";

/**
 * Returns a callback that opens a Telegram invoice and reports its payment status.
 *
 * @example
 * ```tsx
 * const openInvoice = useOpenInvoice();
 * openInvoice(invoiceUrl, (status) => console.log(status));
 * ```
 *
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
const useOpenInvoice = () => {
    const webApp = useWebApp();

    return useCallback(
        (url: string, callback?: (status: InvoiceStatus) => unknown) =>
            webApp?.openInvoice?.(url, callback),
        [webApp]
    );
};

export default useOpenInvoice;
