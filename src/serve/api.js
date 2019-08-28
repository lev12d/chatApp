const db =require('./database.js');

module.exports = function(app){
    app.all('*',function(req,res,next){
           next()
    })

    app.get('/',function(req,res){
        res.send('<h1>这是服务器向客户端发送的一条数据</h1>');
      // res.json({status:1,msg:'success'})
    })
    
    app.post('/api/login',function(req,res){
        req.on('data',function(data){
            userObj=JSON.parse(data);
             if(userObj.username ==''||userObj.password ==''){
                  res.json({ status:-1,msg:'账号或密码不能为空!' })
             }else{
                 db.userModel.findOne({ userAccount: userObj.username},function(err,data){
                       if(err){
                          res.json({ status:-2, msg:'查询出错:' +err})
                       }else if(!data){                         
                        res.json({ status:-1, msg:'该用户不存在!'})
                       }else{
                           if(data.password === userObj.password){
                               res.json({ status:1, msg:'登录成功!',nickname:data.nickname})
                           }else{
                               res.json({status:0, msg:'密码错误!'})
                          }
                       }
                 })
             }
        })
      
    })
}