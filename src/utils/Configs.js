export const getBackEndUrl = () => {
    const CONFIG = {};
    if (process.env.REACT_APP_ENV === 'dev') {
        CONFIG.bffBaseUrl = 'http://localhost:8080/v1/ims/';
    } else if (process.env.REACT_APP_ENV === 'stg') {
        CONFIG.bffBaseUrl = 'http://localhost:8080/v1/ims/';
    } else if (process.env.REACT_APP_ENV === 'prod') {
        CONFIG.bffBaseUrl = 'http://localhost:8080/v1/ims/';
    } else {
        CONFIG.bffBaseUrl = 'http://localhost:8080/v1/ims/';
    }

    // Invoice URLs
    CONFIG.invoicesEndpoint = `${CONFIG.bffBaseUrl}invoices/PENDING`;
    CONFIG.invoiceUpdateEndpoint = `${CONFIG.bffBaseUrl}invoices/`;

    return CONFIG;
};
