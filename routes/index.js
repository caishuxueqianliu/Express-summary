var express = require('express');
var router = express.Router();
var user = require('../mysql/mysql.js');




// router.get("/code",async (ctx)=>{
//     let captcha = svgCaptcha.create({
//         size:4, //验证码长度
//         fontSize:50,
//         width:120,
//         height:34,
//         background:"#cc9966"
//     });
//     /*加法验证码 */
//     // let captcha = svgCaptcha.createMathExpr({
//     //     size:4, //验证码长度
//     //     fontSize:50,
//     //     width:100,
//     //     height:40,
//     //     background:"#cc9966"
//     // });
//     console.log(captcha.text)
//     ctx.session.code = captcha.text;
//     ctx.response.type="image/svg+xml";
//     ctx.body = captcha.data;

// })

 


router.get('/', function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
    user.queryAll(req, res, next);
});

// router.get('/query', function(req, res, next) {
//     user.queryById(req, res, next);
// });
// router.get('/deleteUser', function(req, res, next) {
//     user.delete(req, res, next);
// });
// router.get('/update', function(req, res, next) {
//     res.render('update');
// });
// router.post('/updateUser', function(req, res, next) {
//     user.update(req, res, next);
// });
module.exports = router;