import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import OauthRedirect from '/src/view/oauthRedirect';
import Success from '/src/view/success';
const HistoryRouter = () => {
    return (
        // histry路由
        <BrowserRouter>
            <Routes>
                <Route path="/oauthRedirect" element={OauthRedirect}/>
                <Route path="/success" element={Success}/>
            </Routes>
        </BrowserRouter>
    )
}

export default HistoryRouter;

    