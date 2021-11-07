import React from "react";

import "./styles/App.css";

import {Route, Routes} from "react-router-dom";
import Invoice from "./components/Invoice/Invoice";
import InvoiceContextProvider from "./components/InvoiceContext";

function App() {
    return (
        <Routes>
            <Route path="/" element={
                <InvoiceContextProvider>
                    <Invoice/>
                </InvoiceContextProvider>}/>
        </Routes>
    );
}

export default App;
