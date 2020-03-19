var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');






var app = express();



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

//token 生成
// var token=jwts.generateToken({ UserName: 'liuhao' })
// console.log(token)

// //token 解析

// jwts.verifyToken(token,(datas)=>{
//   console.log(datas)
// })




// app.get('/token',(req,res)=>{
//   res.setHeader("Access-Control-Allow-Origin", "*");

//     res.json(token)



// })

// app.post('/captcha', function (req, res) {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// console.log(req.body.yzm)

  
// });

mongoose.connect('mongodb://localhost/summary', {useNewUrlParser: true})
  .then(() => {
    console.log('连接数据库成功!!!')
    // 只有当连接上数据库后才去启动服务器
    app.listen('3000', () => {
      console.log('服务器启动成功, 请访问: http://localhost:3000')
    })
  })
  .catch(error => {
    console.error('连接数据库失败', error)
  })

module.exports = app;
