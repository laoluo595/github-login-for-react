import React from 'react'
import {  Navigate } from 'react-router-dom' 
import { getStorage } from '@/utils/util'
// RequireAuth 组件相当于一个拦截器，是否返回被拦截的组件要听他的
export default function RequireAuth({ children }) {
    const token = getStorage('token')
    return token ? ( // 判断 token是否存在
        children
    ) : (
        <Navigate to="/login" replace /> // 跳转到登录
    )
}
