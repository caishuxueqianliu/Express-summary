var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');

var app = express();

var svgCaptcha = require('svg-captcha');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);


app.use(session({
  resave: true,  // 新增
  secret: 'itcast',
  resave: false,
  saveUninitialized: true // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))


app.get('/captcha', function (req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
    var captcha = svgCaptcha.create({
    	size:4, //验证码长度
        fontSize:50,
        width:120,
        height:34,
        background:"#cc9966"
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
