import React, {useState} from "react";
import {getBackEndUrl} from "../utils/Configs";
import {DEFAULT_REQUEST_HEADER} from "../common/Constants";

export const InvoiceContext = React.createContext({
        invoicesDataArray: [],
        setInvoicesData: {}
    }
);

export const InvoiceContextProvider = (props) => {
    const [invoicesDataArray, setInvoicesData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    const invoiceDataUpdateHandler = (index) => {
        invoicesDataArray.splice(index, 1);
        setError(null);
        setInvoicesData([]);
        setInvoicesData(invoicesDataArray);
    };

    const errorUpdateHandler = (data) => {
        setError(data);
    };

    const handleResponse = (response) => {
        return response.json().then((json) => {
            if (response.ok) {
                return {success: true, data: json};
            }
            return {success: false, data: json};
        });
    };

    if (!isLoaded) {
        fetch(getBackEndUrl().invoicesEndpoint, {
            method: 'GET',
            headers: DEFAULT_REQUEST_HEADER
        })
            .then(handleResponse)
            .then((resp) => {
                setInvoicesData(resp.data.data);
                setIsLoaded(true);
                return null;
            })
            .catch((e) => {
                setIsLoaded(true);
                setError(e);
            });
    }

    return (
        <InvoiceContext.Provider value={{
            invoicesDataArray,
            updateInvoiceData: invoiceDataUpdateHandler,
            setErrorData: errorUpdateHandler
        }}>
            {props.children}
        </InvoiceContext.Provider>
    );
};

export default InvoiceContextProvider;
