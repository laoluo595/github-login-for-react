const Koa = require('koa');
const route = require('koa-route');
const axios = require('axios');
const { SERVER_PORT, REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = require('./config')
// 创建koa实例
const app = new Koa();

// 根据code拿token
const getToken = async (ctx, next) => {
    const { code }  = ctx.request.query
    const tokenResponse = await axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token',
        headers: {
            accept: 'application/json'
        },
        data: {
            client_id : REACT_APP_CLIENT_ID,
            client_secret : REACT_APP_CLIENT_SECRET,
            code
        }
    })

    const accessToken = tokenResponse.data.access_token
    if (accessToken) {
        ctx.body = {
            code: 0,
            message: '成功',
            result: {
                token: accessToken
            }
        }
    } else {
        ctx.body = {
            code: 1,
            message: '获取token失败，请查看code是否已经失效',
            result: null
        }
    }
}

// 根据token拿user信息
const getUserInfo = async (ctx, next) => {
    const { authorization } = ctx.request.headers
    // 如果有鉴权去找github拿，否则直接返回
    if (authorization) {
        try {
            const result = await axios({
                method: 'get',
                url: `https://api.github.com/user`,
                headers: {
                    accept: 'application/json',
                    Authorization: authorization
                }
            })
            ctx.body = {
                code: 0,
                message: '获取用户信息成功',
                result: result.data
            }
        }   catch{
            ctx.body = {
                code: 1,
                message: '访问github又特么失效了或者token已过期',
                result: null
            }
        }
    } else {
        ctx.body = {
            code: 1,
            message: 'token失效或者未传入token',
            result: null
        }
    }
}

// 监听路由
app.use(route.get('/getToken', getToken));
app.use(route.get('/getUserInfo', getUserInfo));

app.listen(SERVER_PORT || 8080, () => console.log(`Listening on ${SERVER_PORT}`));