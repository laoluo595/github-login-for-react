import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' 
import RequireAuth from '@/component/RequireAuth';
import OauthRedirect from '@/view/OauthRedirect';
import Login from '@/view/Login';
import Success from '@/view/Success';
import ErrorPage from '@/view/ErrorPage';


// 路由表
const routerLis = [
    // {
    //     path: '/oauthRedirect',
    //     element : <OauthRedirect />
    // },
    {
        path: '/success',
        element : <Success />
    }
]
// react-router-v6
const HistoryRouter = () => {
    return (
        // histry路由
        <BrowserRouter>
            <Routes>
                {/* router 6.x element 里放标签，吐血 */}
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/oauthRedirect" element={<OauthRedirect />}/>
                {/* 遍历路由表，把需要登录鉴权的循环出来 */}
                {
                    routerLis.map(item => (
                        <Route key={item.path} path={item.path} element={
                            <RequireAuth>
                                {item.element}
                            </RequireAuth>
                        }/>
                    ))
                }
                <Route path="/*" element={<ErrorPage />}/>
            </Routes>
        </BrowserRouter>
    )
}
export default HistoryRouter;

    