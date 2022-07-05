const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
    app.use(
        createProxyMiddleware(
            // match含有api前缀的请求，转发给target
            '/api', {
                target: 'http://localhost:5951',
                /* 
                * 默认为false： 发送请求头中host会取当前本地localhost地址
                *  设置为true：  发送请求头中host会设置成当前target·
                */
                changeOrigin: true,
                // 是否去除前缀，根据业务场景去除
                pathRewrite: {'^/api': ''}
            }
        )
    )
}