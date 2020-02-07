/*
    数据增删改查模块封装
    req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
    req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
    req.body通常用来解析POST请求中的数据
     +req.query.id 可以将id转为整数
 */
// 引入mysql
var mysql = require('mysql');


// 引入SQL模块
var sql = require('./sql.js');
// 引入json模块
var json = require('./json.js');
// 使用连接池，提升性能

var config = {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'demo',
    port: 3306
};
var pool =mysql.createPool(config);
// var connection = mysql.createConnection({
//   host: 'localhost',
//   port:'3306',
//   user: 'root',
//   password: '123456',
//   database: 'demo' 
// });
var userData = {
    // add: function(req, res, next) {
    //     pool.getConnection(function(err, connection) {
    //         var param = req.query || req.params;
    //         connection.query(sql.insert, [param.id, param.name, param.age], function(err, result) {
    //             if (result) {
    //                 result = 'add'
    //             }
    //             // 以json形式，把操作结果返回给前台页面
    //             json(res, result);
    //             // 释放连接 
    //             connection.release();
    //         });
    //     });
    // },
    // delete: function(req, res, next) {
    //     pool.getConnection(function(err, connection) {
    //         var id = +req.query.id;
    //         connection.query(sql.delete, id, function(err, result) {
    //             if (result.affectedRows > 0) {
    //                 result = 'delete';
    //             } else {
    //                 result = undefined;
    //             }
    //             json(res, result);
    //             connection.release();
    //         });
    //     });
    // },
    // update: function(req, res, next) {
    //     var param = req.body;
    //     if (param.name == null || param.age == null || param.id == null) {
    //         json(res, undefined);
    //         return;
    //     }
    //     pool.getConnection(function(err, connection) {
    //         connection.query(sql.update, [param.name, param.age, +param.id], function(err, result) {
    //             if (result.affectedRows > 0) {
    //                 result = 'update'
    //             } else {
    //                 result = undefined;
    //             }
    //             json(res, result);
    //             connection.release();
    //         });
    //     });
    // },
    // queryById: function(req, res, next) {
    //     var id = +req.query.id;
    //     pool.getConnection(function(err, connection) {
    //         connection.query(sql.queryById, id, function(err, result) {
    //             if (result != '') {
    //                 var _result = result;
    //                 result = {
    //                     result: 'select',
    //                     data: _result
    //                 }
    //             } else {
    //                 result = undefined;
    //             }
    //             json(res, result);
    //             connection.release();
    //         });
    //     });
    // },
  //   User.findOne({
  //   email: body.email,
  //   password: md5(md5(body.password))
  // }, function (err, user) {
  //   if (err) {
  //     // return res.status(500).json({
  //     //   err_code: 500,
  //     //   message: err.message
  //     // })
  //     return next(err)
  //   }
    
  //   // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
  //   if (!user) {
  //     return res.status(200).json({
  //       err_code: 1,
  //       message: 'Email or password is invalid.'
  //     })
  //   }

  //   // 用户存在，登陆成功，通过 Session 记录登陆状态
  //   req.session.user = user

  //   res.status(200).json({
  //     err_code: 0,
  //     message: 'OK'
  //   })
  
    queryById: function(req, res, next,id,callback) {
        var id = id;
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryById, id, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'select',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                callback(result)
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next,callback) {
       pool.getConnection(function(err, connection) {

            connection.query(sql.queryAll, function(err, result) {

                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                }
                 else {
                    result = undefined;
                }
              // console.log(result.data)
              callback(result.data)
               // json(res, result);
                connection.release();
            });

        })
   }

    // queryAll: function(req, res, next) {
    //         connection.query('SELECT * FROM mydb', function(err, result) {    
    //             res.json(result);
    //            // connection.release();
    //         });
    //     }
       
};

module.exports = userData;