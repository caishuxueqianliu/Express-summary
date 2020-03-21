var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var fs=require('fs')
var formidable = require('./node_modules/formidable');

const compressing = require('compressing');
var app = express();

app.use(session({
  resave: true,  // 新增
  secret: 'itcast',
  resave: false,
  saveUninitialized: true // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))



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
app.post('/data', function (req, res) {

 var email=req.body.email
  var month=req.body.month
 if(email){
      fs.mkdir(email, (err)=>{
      
      });
  }
fs.writeFile('./email.text',email,function (err) {
                console.log(err)
                
            })
     fs.writeFile('./month.text',month,function (err) {
                console.log(err)
                
            })   
  
});
app.post('/upload',  (req,res,next)=>{


 // var month=JSON.stringify(req.body.month)

    

 var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    // form.on('field',(field,value)=>{
    //  // console.log(field);
    //     //console.log(value);
    // });
    // form.on('file',(name,file)=>{
    //    // console.log(name);
    //    // console.log(file);
    // });
    // form.on('end',()=>{
    //     res.end('upload complete');
    // })
    
    form.parse(req,(err,fields,files)=>{


fs.readFile('./email.text', 'utf-8',(err,data)=>{

console.log('ddd+'+email)
if(data){
var email=data
   const month=3

  const year=2020
     
        let names=year+'年'+month+'月财务报告_'+email
        let extname = path.extname(files.file.name);
        let oldpath=__dirname+'/'+files.file.path
        console.log(oldpath)
        let newpath = __dirname+'/'+email+'/' +names+ extname;
        console.log(newpath)
       
      if(extname){
       fs.rename(oldpath, newpath,(err)=>{
        });
      }

 compressing.zip.compressDir(__dirname+'/'+email, __dirname+'/'+email+'.zip')
.then(() => {
    console.log('success');
})
.catch(err => {
    console.error(err);
});

// fs.unlink(__dirname+'/'+email, (err)=>{
//   console.log(err)
// });

}
})
})





            



      //  let extname1 = path.extname(files.file1.name);
      //   let oldpath1=__dirname+'/'+files.file1.path
      //   //console.log(oldpath)
      //   let newpath1 = __dirname + '/uploads/' +111+ extname1;
      //   console.log(newpath1)
      //   fs.rename(oldpath1, newpath1,(err)=>{

      //   });

      //   let extname2 = path.extname(files.file2.name);
      //   let oldpath2=__dirname+'/'+files.file2.path
      // //  console.log(oldpath)
      //   let newpath2 = __dirname + '/uploads/' +22+ extname2;
      // //  console.log(newpath)
      //   fs.rename(oldpath2, newpath2,(err)=>{

      //   });





       // let extname3 = path.extname(files.file3.name);
       //  let oldpath3=__dirname+'/'+files.file3.path
       //  //console.log(oldpath)
       //  let newpath3 = __dirname + '/uploads/' +333+ extname3;
       //  //console.log(newpath)
       //  fs.rename(oldpath3, newpath3,(err)=>{
       //  });



      // let extnamex = path.extname(files.filex.name);
      //   let oldpathx=__dirname+'/'+files.filex.path
      //   //console.log(oldpath)
      //   let newpathx = __dirname + '/uploads/' +'xxx'+ extnamex;
      //   //console.log(newpath)
      //   fs.rename(oldpathx, newpathx,(err)=>{
      //   });



      //    let extnames = path.extname(files.files.name);
      //   let oldpaths=__dirname+'/'+files.files.path
      //   //console.log(oldpath)
      //   let newpaths = __dirname + '/uploads/' +files.files.name+ extnames;
      //   //console.log(newpath)
      //   fs.rename(oldpaths, newpaths,(err)=>{
      //   });

       //      let extname2 = path.extname(files.file.name);
       //  let oldpath2=__dirname+'/'+files.file.path
       //  //console.log(oldpath)
       //  let newpath2 = __dirname + '/uploads/' +222+ extname;
       //  //console.log(newpath)
       //  fs.rename(oldpath2, newpath2,(err)=>{

       //  });
            
    

  




res.end()
})



app.get('/zip',(req,res)=>{

compressing.zip.compressDir('data/16117', 'data/16117.zip')
.then(() => {
    console.log('success');
})
.catch(err => {
    console.error(err);
});



})



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
