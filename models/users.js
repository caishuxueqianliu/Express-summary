
// 1. 连接数据库
const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/summary', { useMongoClient: true })
// const conn = mongoose.connection
// conn.on('connected', function () {
//   console.log('数据库连接成功!')
// })
const md5 = require('blueimp-md5')
// 2. 得到对应特定集合的Model: UserModel
const userSchema = mongoose.Schema({
  // 用户名
  'username': {type: String,required: true},
  // 密码
  'password': {type: String,required: true},
  // 类型
},{collection:"users"})

// 3. 定义Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('users', userSchema)

// 初始化默认超级管理员用户: admin/admin
UserModel.findOne({username: 'admin'}).then(user => {
  if(!user) {
    UserModel.create({username: 'admin', password: admin})
            .then(user => {
              console.log('初始化用户: 用户名: admin 密码为: admin')
            })
  }
})
// 3. 向外暴露
module.exports = mongoose.model('User', userSchema)

