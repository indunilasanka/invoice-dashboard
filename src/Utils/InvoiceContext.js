import React, {useContext, useEffect, useState} from "react";
import {getBackEndUrl} from "./Configs";

const InvoiceContext = React.createContext({
        invoicesDataArray: [],
        setInvoicesData: () => {
        }
    }
);

const initialState = [];

export const InvoiceContextProvider = ({children}) => {

    const [invoicesDataArray, setInvoicesData] = useState(initialState);

    const requestHeader = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    };

    const handleResponse = (response) => {
        return response.json().then((json) => {
            if (response.ok) {
                return {success: true, data: json};
            }
            return {success: false, data: json};
        });
    };

    useEffect(() => fetch(getBackEndUrl().invoicesEndpoint, {
        method: 'GET',
        headers: requestHeader,
        credentials: 'include'
    })
        .then(handleResponse)
        .then((resp) => {
            setInvoicesData(resp.data.data);
            return null;
        })
        .catch((e) => {
            //handle error
        }));

    return (
        <InvoiceContext.Provider value={{invoicesDataArray}}>
            {children}
        </InvoiceContext.Provider>
    );
};

export const useInvoiceContext = () => {
    return useContext(InvoiceContext);
};
