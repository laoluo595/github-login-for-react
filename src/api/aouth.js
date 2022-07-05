import request from '@/utils/request.js'
// 登录验证接口
export const login = (code) => request({ url: '/api/getToken', method: "get", params : {
    code
}})

// 获取用户信息
export const getUserInfo = (code) => request({ url: '/api/getUserInfo', method: "get"})