const dotenv = require('dotenv')
const path = require("path")
// 不知道为何，直接调用config不能找到根目录的env文件，必须指明道姓
dotenv.config({ path: path.resolve(__dirname, "../.env") })
module.exports = process.env