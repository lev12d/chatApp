const db =require('./database.js');

module.exports = function(app){
    app.all('*',function(req,res,next){
           next()
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
                               res.json({ status:1, msg:'登录成功!',nickname:data.nickname,data})
                           }else{
                               res.json({status:0, msg:'密码错误!'})
                          }
                       }
                 })
             }
        })
      
    })

    app.get('/api/getGroups',function(req,res){
         db.groupModel.find({},function(err,data){
              if(err){
                res.json({ status:-1,msg:'查询出错:'+ err});
                return
              }
              res.json({ status:1,msg:'查询成功',data})
         })
        // res.json({status:222,msg:'ss'})
    })

    app.post('/api/getChatLog',function(req,res){
          req.on('data',function(data){
            let  groupAccount = JSON.parse(data).groupAccount;
               console.log(groupAccount)
          })
    })
}