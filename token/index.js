



var jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: '456' }, 'shhhhh');
// console.log(token)


var jwts={   
   generateToken : function(data) {
        
 if (data) {
            this.data = data; // userID
        }

        let datas = this.data;
        let created = Math.floor(Date.now() / 1000);
        // let cert = fs.readFileSync(path.join(__dirname, './pem/private_key.pem'));私钥 可以自己生成
        let cert='liuhao'
        let token = jwt.sign({
            datas, // 自定义字段
            exp: created + 60 * 30, // 过期时间 30 分钟
            iat: created, // 创建时间
        }, cert);
        return token;
    },

verifyToken:function(token,callback){


jwt.verify(token, 'liuhao', (err, decoded)=> {
	//console.log(decoded)
  callback(decoded);
});


}




   }
//  jwt.verify(token, 'shhhhh', function(err, decoded) {
//   console.log(decoded) 
// });
 
//   var token = jwt.sign({
//   	foo: '456'
//             // data, // 自定义字段
//             // exp: created + 60 * 30, // 过期时间 30 分钟
//             // iat: created, // 创建时间
//         }, "shhhhh", {algorithm: 'RS256'}, function(err, token) {
//   console.log(token);
// });


// var decoded = jwt.verify(token, 'shhhhh');
// console.log(decoded.foo) 

module.exports = jwts;
