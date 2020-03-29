//var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');
//var session = require('express-session')
//const mongoose = require('mongoose')
var bodyParser = require('body-parser')
//var indexRouter = require('./routes/index');
var fs=require('fs')
var formidable = require('./node_modules/formidable');
// 引入导入模块
//const multiparty = require('multiparty');
const compressing = require('compressing');
var app = express();

// app.use(session({
//   resave: true,  // 新增
//   secret: 'itcast',
//   resave: false,
//   saveUninitialized: true // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
// }))



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'./public/')))
app.use('/public/',express.static(path.join(__dirname,'./public/')))
//app.use('/', indexRouter);

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

app.get('/download', function (req, res) {
 var email= fs.readFileSync('./email.txt','utf-8')
 compressing.zip.compressDir(__dirname+'/'+email, __dirname+'/public/'+email+'.zip')
.then(() => {
    console.log('success');
    delDir(__dirname+'/'+email)
    res.send('success')
})
.catch(err => {
    console.error(err);
});

      //读取数据后 删除文件

  function delDir(path){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}

     // fs.rmdirSync(__dirname+'/'+email)


})
app.post('/data', function (req, res) {


//console.log(req.body.datas)
var email=req.body.datas.email
var yearstart=JSON.stringify(req.body.datas.yearstart)
var yearend=JSON.stringify(req.body.datas.yearend)
var monthstart=JSON.stringify(req.body.datas.monthstart)
var monthend=JSON.stringify(req.body.datas.monthend)
var monthl=JSON.stringify(req.body.datas.monthl)
var value=JSON.stringify(req.body.datas.value)
 if(email){
      fs.mkdir(email, (err)=>{
      //console.log(err)
      });
  }
fs.writeFile('./email.txt',email,function (err) {
                //console.log(err)               
            })
fs.writeFile('./yearstart.txt',yearstart,function (err) {
                //console.log(err)               
            })
fs.writeFile('./yearend.txt',yearend,function (err) {
                //console.log(err)               
            })
fs.writeFile('./monthstart.txt',monthstart,function (err) {
                //console.log(err)               
            })
fs.writeFile('./monthend.txt',monthend,function (err) {
                //console.log(err)               
            })
fs.writeFile('./monthl.txt',monthl,function (err) {
                //console.log(err)               
            })
fs.writeFile('./value.txt',value,function (err) {
                //console.log(err)               
            })
//      fs.writeFile('./month.text',month,function (err) {
//                 console.log(err)
                
//             })   
  
});


// app.post('/uploads',  (req,res,next)=>{
// console.log(req.body)

//   /* 生成multiparty对象，并配置上传目标路径 */
//   let form = new multiparty.Form();
//   /* 设置编辑 */
//   form.encoding = 'utf-8';
//   //设置文件存储路劲
//   form.uploadDir = './uploads';
//   //设置文件大小限制
//   // form.maxFilesSize = 1 * 1024 * 1024;
//   form.parse(req, function (err, fields, files) {
// console.log(req.month)
//     try {
//       let inputFile = files.file[0];
//       let uploadedPath = inputFile.path;
// console.log(inputFile)
//        let newPath = form.uploadDir + "/" + inputFile.name;

//    fs.renameSync(inputFile.path, newPath);

//       res.send({ data: "上传成功！" });
//       //读取数据后 删除文件
//       // fs.unlink(newPath, function () {
//       //   console.log("删除上传文件");
//       // })
//     } catch (err) {
//       console.log(err);
//       res.send({ err: "上传失败！" });
//     };
//   })
// }) 
app.post('/uploads',  (req,res,next)=>{


    

 var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";

    
    form.parse(req,(err,fields,files)=>{


 // try {
       

     var email= fs.readFileSync('./email.txt','utf-8')
    var yearstart= fs.readFileSync('./yearstart.txt','utf-8')
     var yearend= fs.readFileSync('./yearend.txt','utf-8')
      var monthstart= fs.readFileSync('./monthstart.txt','utf-8')
       var monthend= fs.readFileSync('./monthend.txt','utf-8')
        var monthl= fs.readFileSync('./monthl.txt','utf-8')
         var value= fs.readFileSync('./value.txt','utf-8')

   if(parseInt(yearstart)===parseInt(yearend)){

        var year2=yearstart
         var year3=yearstart
          var year4=yearstart
           var yearx=yearstart

          var month2=parseInt(monthstart)+1
           var month3=parseInt(monthstart)+2
          var month4=parseInt(monthstart)+3

   }
else {
 if(parseInt(monthl)===3) {

       if (parseInt(monthstart)===11) {
          var year2=yearstart
         var year3=yearstart
        //  var year4=parseInt(yearstart)+1
if(parseInt(value)<11){
  var yearx=parseInt(yearstart)+1
}
else {
  var yearx=parseInt(yearstart)
}
          var month2=parseInt(monthstart)+1
           var month3=parseInt(monthstart)+2-12
          //var month4=parseInt(monthstart)+3-12


       }
       else if (parseInt(monthstart)===12) {
          var year2=parseInt(yearstart)+1
         var year3=parseInt(yearstart)+1
          //var year4=parseInt(yearstart)+1
if(parseInt(value)<12){
  var yearx=parseInt(yearstart)+1
}else {
  var yearx=parseInt(yearstart)
}
          var month2=parseInt(monthstart)+1-12
           var month3=parseInt(monthstart)+2-12
          //var month4=parseInt(monthstart)+3-12

       }
       

 }
else if(parseInt(monthl)===4){
  

       if (parseInt(monthstart)===10) {
          var year2=yearstart
         var year3=parseInt(yearstart)
          var year4=parseInt(yearstart)+1
if(parseInt(value)<10){
  var yearx=parseInt(yearstart)+1
}
          var month2=parseInt(monthstart)+1
           var month3=parseInt(monthstart)+2
          var month4=parseInt(monthstart)+3-12


       }
       else if (parseInt(monthstart)===11) {
          var year2=yearstart
         var year3=parseInt(yearstart)+1
          var year4=parseInt(yearstart)+1
if(parseInt(value)<11){
  var yearx=parseInt(yearstart)+1
}else {
  var yearx=parseInt(yearstart)
}
          var month2=parseInt(monthstart)+1
           var month3=parseInt(monthstart)+2-12
          var month4=parseInt(monthstart)+3-12
       }
     
       else if (parseInt(monthstart)===12) {
           var year2=parseInt(yearstart)+1
         var year3=parseInt(yearstart)+1
          var year4=parseInt(yearstart)+1
if(parseInt(value)<12){
  var yearx=parseInt(yearstart)+1
}else {
  var yearx=parseInt(yearstart)
}
          var month2=parseInt(monthstart)+1-12
           var month3=parseInt(monthstart)+2-12
          var month4=parseInt(monthstart)+3-12
       }

}

}


if(files.pic1){
    let name1=yearstart+'年'+monthstart+'月财务报告_'+email
        let extname = path.extname(files.pic1.name);
        let oldpath=__dirname+'/'+files.pic1.path    
        let newpath = __dirname+'/'+email+'/' +name1+ extname;
   //fs.renameSync(oldpath, newpath);
 fs.rename(oldpath, newpath,(err)=>{
    //console.log(err)
   });
}
       
if (files.pic2) {
let name2=year2+'年'+month2+'月财务报告_'+email
      let extname2 = path.extname(files.pic2.name);
        let oldpath2=__dirname+'/'+files.pic2.path     
        let newpath2 = __dirname+'/'+email+'/' +name2+ extname2;
   fs.rename(oldpath2, newpath2,(err)=>{
    //console.log(err)
   });
}


if(files.pic3){
let name3=year3+'年'+month3+'月财务报告_'+email
   let extname3 = path.extname(files.pic3.name);
        let oldpath3=__dirname+'/'+files.pic3.path     
        let newpath3 = __dirname+'/'+email+'/' +name3+ extname3;
  // fs.renameSync(oldpath3, newpath3);

 fs.rename(oldpath3, newpath3,(err)=>{
    //console.log(err)
   });
}
     
if(files.pic4){
  let name4=year4+'年'+month4+'月财务报告_'+email
  let extname4 = path.extname(files.pic4.name);
        let oldpath4=__dirname+'/'+files.pic4.path     
        let newpath4 = __dirname+'/'+email+'/' +name4+ extname4;
  // fs.renameSync(oldpath4, newpath4);
 fs.rename(oldpath4, newpath4,(err)=>{
    //console.log(err)
   });
}
//     if(files.dlxx){

//   let namesk='登陸信息'
//   let extnamedl = path.extname(files.skxx.name);
//         let oldpathdl=__dirname+'/'+files.dlxx.path     
//         let newpathdl = __dirname+'/' +namedl+ extnamedl;
//   // fs.renameSync(oldpath4, newpath4);
//  fs.rename(oldpathdl, newpathdl,(err)=>{
//     //console.log(err)
//    });

//  var dlxx=fs.readFileSync(newpathdl,'utf-8');

// console.log(dlxx)


// }  
if(files.skxx){

 var xx= new Date().toLocaleDateString().replace('-','年').replace('-','月')
  let namesk=xx+'收款信息_'+email
  let extnamesk = path.extname(files.skxx.name);
        let oldpathsk=__dirname+'/'+files.skxx.path     
        let newpathsk = __dirname+'/'+email+'/' +namesk+ extnamesk;
  // fs.renameSync(oldpath4, newpath4);
 fs.rename(oldpathsk, newpathsk,(err)=>{
    //console.log(err)
   });
}


      if(files.file1){
        let namex=yearx+'年'+value+'月财务报告_'+email
let extnamex= path.extname(files.file1.name);
        let oldpathx=__dirname+'/'+files.file1.path     
        let newpathx = __dirname+'/'+email+'/' + namex+extnamex;
   //fs.renameSync(oldpathx, newpathx);
 fs.rename(oldpathx, newpathx,(err)=>{
    //console.log(err)
   });

      }
  
if(files.file2){
let extnames = path.extname(files.file2.name);
        let oldpaths=__dirname+'/'+files.file2.path     
        let newpaths = __dirname+'/'+email+'/' + files.file2.name;
   //fs.renameSync(oldpaths, newpaths);
 fs.rename(oldpaths, newpaths,(err)=>{
    //console.log(err)
   });

}
  

      res.send({ data: "上传成功！" });

      
    // } catch (err) {
    //   //console.log(err);
    //   res.send({ err: "上传失败！" });
    // };

     
       
  




        







     





})
})

  
// app.post('/upload',  (req,res,next)=>{


//  // var month=JSON.stringify(req.body.month)

    

//  var form = new formidable.IncomingForm();
//     form.uploadDir = "./uploads";
//     // form.on('field',(field,value)=>{
//     //  // console.log(field);
//     //     //console.log(value);
//     // });
//     // form.on('file',(name,file)=>{
//     //    // console.log(name);
//     //    // console.log(file);
//     // });
//     // form.on('end',()=>{
//     //     res.end('upload complete');
//     // })
    
//     form.parse(req,(err,fields,files)=>{


// fs.readFile('./email.text', 'utf-8',(err,data)=>{

// console.log('ddd+'+email)
// if(data){
// var email=data
// // fs.readFile('./month.text', 'utf-8',(err,data)=>{


//    const month=2
//  const month1=3
//   const month2=4
//   const year=2020
     
//         let names=year+'年'+month+'月财务报告_'+email
//         let extname = path.extname(files.file.name);
//         let oldpath=__dirname+'/'+files.file.path
//         console.log(oldpath)
//         let newpath = __dirname+'/'+email+'/' +names+ extname;
//         console.log(newpath)
       
  
//        fs.rename(oldpath, newpath,(err)=>{
//         });
      




// //2

// // const month1=parseInt(data)+1
//         let names1=year+'年'+month1+'月财务报告_'+email
//         let extname1 = path.extname(files.file.name);
//         let oldpath1=__dirname+'/'+files.file.path
   
//         let newpath1 = __dirname+'/'+email+'/' +names1+ extname1;
       
       
  
//        fs.rename(oldpath1, newpath1,(err)=>{
//         });
      



// //3
        

// // const month2=parseInt(data)+2
//         let names2=year+'年'+month2+'月财务报告_'+email
//         let extname2 = path.extname(files.file.name);
//         let oldpath2=__dirname+'/'+files.file.path
    
//         let newpath2 = __dirname+'/'+email+'/' +names2+ extname2;
    
       
   
//        fs.rename(oldpath, newpath,(err)=>{
//         });
     



// //CWBG

//         let names3=year+'年'+month1+'月财务报告_'+email
//         let extname3 = path.extname(files.file.name);
//         let oldpath3=__dirname+'/'+files.file.path
       
//         let newpath3 = __dirname+'/'+email+'/' +names3+ extname3;

       
//       if(extname3){
//        fs.rename(oldpath3, newpath3,(err)=>{
//         });
//       }


// //XSE
        
//         let extnameX = path.extname(files.file.name);
//         let oldpathX=__dirname+'/'+files.file.path
       
//         let newpathX = __dirname+'/'+ extnameX;
       
//       if(extname){
//        fs.rename(oldpathX, newpathX,(err)=>{
//         });
//       }

//  compressing.zip.compressDir(__dirname+'/'+email, __dirname+'/'+email+'.zip')
// .then(() => {
//     console.log('success');
// })
// .catch(err => {
//     console.error(err);
// });

// fs.unlink(__dirname+'/'+email, (err)=>{
//   console.log(err)
// });

// // })

// }
// })


//})





            



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
            
    

  








app.get('/zip',(req,res)=>{

compressing.zip.compressDir('data/16117', 'data/16117.zip')
.then(() => {
    console.log('success');
})
.catch(err => {
    console.error(err);
});



})



// mongoose.connect('mongodb://localhost/summary', {useNewUrlParser: true})
//   .then(() => {
//     console.log('连接数据库成功!!!')
//     // 只有当连接上数据库后才去启动服务器
//     app.listen('3000', () => {
//       console.log('服务器启动成功, 请访问: http://localhost:3000')
//     })
//   })
//   .catch(error => {
//     console.error('连接数据库失败', error)
//   })
app.listen('3000', () => {
      console.log('服务器启动成功, 请访问: http://localhost:3000')
    })
module.exports = app;
