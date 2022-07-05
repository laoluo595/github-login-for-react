// 转参数
export const parsingGithubRes = function(s) {
    let str = s
    const r = {}
    const kvs = str.split("&")
    for (var i = 0, len = kvs.length; i < len; i++) {
        var kv = kvs[i].split("=");
        r[kv[0]] = kv[1];
    }
    return r
}

// 设置存储
export const setStorage = function(key, value) {
    localStorage.setItem(key, value)
}

// 取存储
export const getStorage = function(key) {
    return localStorage.getItem(key)
}

// 删除存储
export const removeStorage = function(key) {
    return localStorage.removeItem(key)
}