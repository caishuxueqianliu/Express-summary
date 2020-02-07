var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var jwt = require('jsonwebtoken');
var jwts = require('./token/index');



var app = express();

var svgCaptcha = require('svg-captcha');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

//token 生成
var token=jwts.generateToken({ UserName: 'liuhao' })
console.log(token)

//token 解析

jwts.verifyToken(token,(datas)=>{
  console.log(datas)
})


app.use(session({
  resave: true,  // 新增
  secret: 'itcast',
  resave: false,
  saveUninitialized: true // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

app.get('/token',(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");

    res.json(token)



})
app.get('/captcha', function (req, res) {

	res.setHeader("Access-Control-Allow-Origin", "*");
  //req.session.token = token;
  // console.log(req.session.token)
    var captcha = svgCaptcha.create({
    	size:4, //验证码长度
        fontSize:60,
        width:120,
        height:36,
        background:"violet"
    });

    req.session.captcha = captcha.text;    
    res.type('svg');
  res.status(200).send(captcha.data);
  console.log(req.session.captcha)


});

app.post('/captcha', function (req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
console.log(req.body.yzm)

  
});
app.listen(3000,()=>{
console.log('success...')})
module.exports = app;
