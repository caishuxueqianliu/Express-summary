var express = require('express');
var router = express.Router();
//var user = require('../mysql/mysql.js');
//var User = require('../models/users.js')
var md5 = require('blueimp-md5')
//var svgCaptcha = require('svg-captcha');
var session = require('express-session')
//var jwt = require('jsonwebtoken');
//var jwts = require('../token/index');

var formidable = require('../node_modules/formidable');
var path = require('path');
var fs=require('fs')


router.use(session({
  resave: true,  // 新增
  secret: 'itcast',
  resave: false,
  saveUninitialized: true // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))


router.post('/dlxx',(req,res)=>{

    var form = new formidable.IncomingForm();
    form.uploadDir = './routes/uploads';

    
    form.parse(req,(err,fields,files)=>{
//console.log(files.file)
  
if(files.file){
let extname = path.extname(files.file.name);
        let oldpath=files.file.path     
        let newpath ='routes/dlxx/' + files.file.name
        console.log(oldpath)
        console.log(newpath)
   //fs.renameSync(oldpaths, newpaths);
 fs.renameSync(oldpath,newpath)

var dlxx= fs.readFileSync(newpath,'utf-8');

var start1=dlxx.indexOf(`{"idfa"`)//起始
console.log(start1)
var start2=dlxx.indexOf(`"kindId":1}`)//第一個結束
console.log(start2)
var end1=dlxx.lastIndexOf(`"kindId":1}`)//結束
console.log(end1)
var end2=dlxx.lastIndexOf(`{"idfa"`)//倒數第一個開始
console.log(end2)


var dlxxjq=dlxx.slice(start1,end1)
console.log(dlxxjq)
var jq1=dlxx.slice(start1,start2)
console.log(jq1)


var jqn=dlxx.slice(end2,end1)
console.log(jqn)



      }
     //  console.log(dlxx)
   //  res.json({data:dlxx})
  res.send({ data: "上传成功！" });
    })



})




// router.post('/register', function(req, res, next) {
// const username = req.body.loginForm.username
// const password = md5(req.body.loginForm.password)
// const captcha = req.body.loginForm.captcha.toLowerCase()
//   if(captcha!==req.session.captcha) {
//     return res.send({code: 1, msg: '验证码不正确'})
//   }
//   // 删除保存的验证码
//   delete req.session.captcha
// User.findOne({username}, function (err, user) {

// if(user){
//  res.send({code: 1, msg: '用户名已存在'})

// }
// else {
    
//     new User(
//       {username:req.body.username,
//         password:req.body.password,
//     }).save(function (err, user) {
//         const data = {username: username}
//         res.send({code: 0, msg:'注册成功',data})
//       })
//     }



// })
// })
// router.post('/login', function(req, res, next) {
// const username = req.body.loginForm.username
// const password = md5(req.body.loginForm.password)
// const captcha = req.body.loginForm.captcha.toLowerCase()
//  var token=jwts.generateToken({username})
// //console.log(req.session.captcha)
// //console.log(captcha)
//   if(captcha!==req.session.captcha) {
//     return res.send({code: 1, msg: '验证码不正确'})
//   }
// //   // 删除保存的验证码
//  delete req.session.captcha
//  User.findOne({username}, function (err, user) {
//     if (user) {
     
//       if (md5(user.password)!== password) {
//        return res.send({code: 1, msg: '用户名或密码不正确!'})
//       } else {
        
//       return   res.send({code: 0, data: { username: username,token:token}})
//       }
//     }
//     else{
//       return     res.send({code: 1, msg: '用户名或密码不正确!'})
//     }
// })
// })



// router.get('/captcha', function (req, res) {

//   var captcha = svgCaptcha.create({
//     ignoreChars: '0o1l',
//     noise: 1,
//     color: true
//   });
//     req.session.captcha = captcha.text.toLowerCase();    
//     res.type('svg');
//   res.status(200).send(captcha.data);

// });
// // router.get("/code",async (ctx)=>{
// //     let captcha = svgCaptcha.create({
// //         size:4, //验证码长度
// //         fontSize:50,
// //         width:120,
// //         height:34,
// //         background:"#cc9966"
// //     });
// //     /*加法验证码 */
// //     // let captcha = svgCaptcha.createMathExpr({
// //     //     size:4, //验证码长度
// //     //     fontSize:50,
// //     //     width:100,
// //     //     height:40,
// //     //     background:"#cc9966"
// //     // });
// //     console.log(captcha.text)
// //     ctx.session.code = captcha.text;
// //     ctx.response.type="image/svg+xml";
// //     ctx.body = captcha.data;

// // })

 
// //router.post('/login', function(req, res, next) {
// //res.setHeader("Access-Control-Allow-Origin", "*");

// // const username = req.body.username
// // const password = md5(req.body.password)
// // const captcha = req.body.captcha.toLowerCase()


// //   // 可以对用户名/密码格式进行检查, 如果非法, 返回提示信息
// //   if(captcha!==req.session.captcha) {
// //     return res.send({code: 1, msg: '验证码不正确'})
// //   }
// //   // 删除保存的验证码
// //   delete req.session.captcha

// //   UserModel.findOne({name}, function (err, user) {
// //     if (user) {
// //       console.log('findUser', user)
// //       if (user.password !== password) {
// //         res.send({code: 1, msg: '用户名或密码不正确!'})
// //       } else {
        
// //         res.send({code: 0, data: { name: username}})
// //       }
// //     } else {
// //       const userModel = new UserModel({name, password})
// //       userModel.save(function (err, user) {
  
// //         const data = {name: username}
// //         // 3.2. 返回数据(新的user)
// //         res.send({code: 0, data})
// //       })
// //     }
// //   })


// //    	user.queryAll(req, res, next,function(data){

// //    for (var i = 0; i < data.length; i++) {
// //     	//console.log(data)
// //      if((data[i].username===req.body.username)&&
// //        	(data[i].password===req.body.password)){

// //        	 //console.log(i)

      
// //    	 user.queryById(req, res, next,i,function(data){
// //        	 	console.log(data)
// //        	 });
	

// //   }

 
// // }
// // })


// //})
// // router.post('/login', function(req, res, next) {
// // 	res.setHeader("Access-Control-Allow-Origin", "*");

// //    	user.queryAll(req, res, next,function(data){
// //    // data.forEach(item=>{
// //    //     // if((item.username==req.body.username)&&
// //    //     // 	(item[i].password==req.body.password)){

// //    //     // 	return i
// //    //    // }
// //    // console.log(item.username)
// //    // })
// //    for (var i = 0; i < data.length; i++) {
// //     	//console.log(data)
// //      if((data[i].username===req.body.username)&&
// //        	(data[i].password===req.body.password)){

// //        	 console.log(i)

// //    	 // user.queryById(req, res, next,i,function(res){
// //      //   	 	console.log(res)
// //      //   	 });
       	
// //       }

  

// // }

// //  })


   
// // });
// // router.post('/login', function(req, res, next) {
// // 	res.setHeader("Access-Control-Allow-Origin", "*");
// //    //user.queryAll(req, res, next);
// //    console.log(req.body)
// //    user.queryAll(req, res, next);

// //    //console.log(typeof(req.body))

// // });
// // router.get('/query', function(req, res, next) {
// //     user.queryById(req, res, next);
// // });
// // router.get('/deleteUser', function(req, res, next) {
// //     user.delete(req, res, next);
// // });
// // router.get('/update', function(req, res, next) {
// //     res.render('update');
// // });
// // router.post('/updateUser', function(req, res, next) {
// //     user.update(req, res, next);
// // });




module.exports = router;