import { useCallback } from "react";
import useWebApp from "./useWebApp";
import { InvoiceStatuses } from "@twa-dev/types";

const useOpenInvoice = () => {
    const webApp = useWebApp();

    return useCallback(
        (url: string, callback?: (status: InvoiceStatuses) => unknown) =>
            webApp?.openInvoice?.(url, callback),
        [webApp]
    );
};

export default useOpenInvoice;
