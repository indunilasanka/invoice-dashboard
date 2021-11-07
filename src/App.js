import React from "react";

import {Route, Routes} from "react-router-dom";
import Invoice from "./Components/Invoice/Invoice";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Invoice/>}/>
        </Routes>
    );
}

export default App;
