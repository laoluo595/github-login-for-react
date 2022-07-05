// 封装请求
import { getStorage } from './util'
import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 请求
const http = axios.create({
    baseURL: "",
    timeout: 6000
})
// 请求拦截
http.interceptors.request.use(config => {
    //请求头设置
    let token = getStorage('token') || ''
    config.headers.Authorization = `token ${token}`
    return config
}, err => {
    console.log(err);
})
// 响应拦截
http.interceptors.response.use(res => {
    const status = +res.status || 200
    if (status === 500) {
        return Promise.reject(new Error('gg'))
    } else {
        return res.data
    }
}, error => {
    return Promise.reject(new Error(error))
})
// 返出
export default http