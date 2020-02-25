
// 1. 连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/summary', { useMongoClient: true })
const conn = mongoose.connection
conn.on('connected', function () {
  console.log('数据库连接成功!')
})

// 2. 得到对应特定集合的Model: UserModel
const userSchema = mongoose.Schema({
  // 用户名
  'username': {type: String,required: true},
  // 密码
  'password': {type: String,required: true},
  // 类型
},{collection:"users"})


// 3. 向外暴露
module.exports = mongoose.model('User', userSchema)

