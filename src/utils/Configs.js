export const getBackEndUrl = () => {
    const CONFIG = {};
    if (process.env.REACT_APP_ENV === 'dev') {
        CONFIG.bffBaseUrl = 'http://localhost:8080/ims/v1/';
    } else if (process.env.REACT_APP_ENV === 'stg') {
        CONFIG.bffBaseUrl = 'http://localhost:8080/ims/v1/';
    } else if (process.env.REACT_APP_ENV === 'prod') {
        CONFIG.bffBaseUrl = 'http://localhost:8080/ims/v1/';
    } else {
        CONFIG.bffBaseUrl = 'http://localhost:8080/ims/v1/';
    }

    // Invoice URLs
    CONFIG.invoicesEndpoint = `${CONFIG.bffBaseUrl}invoices/PENDING`;
    CONFIG.invoiceUpdateEndpoint = `${CONFIG.bffBaseUrl}invoices/`;

    return CONFIG;
};
