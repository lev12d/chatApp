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

    app.post('/api/getGroups',function(req,res){
         req.on('data',function(data){
            let userAccount = JSON.parse(data).userAccount;
            //找出当前登录用户加入的群组
            db.groupModel.find({groupMember:userAccount},function(err,data){
                if(err){
                    res.json({status:-1,msg:'查询出错'+err})
                }else{
                    if(!data){
                      res.json({status:0,msg:'该用户暂时未加入任何群组'});
                    }else{
                        res.json({status:1,msg:'查询用户群组成功',data})
                    }
                }
            })
         })
    })

    app.post('/api/getChatLog',function(req,res){
          req.on('data',function(data){
            let  groupAccount = JSON.parse(data).groupAccount;
              currentModel = groupAccount === 110?db.groupMsgModelA:db.groupMsgModelB;
              currentModel.find({},function(err,data){
                     if(err){
                         res.json({status:-1,msg:'查询出错'+err})
                     }else{
                         if(!data){
                           res.json({status:0,msg:'该群还没有任何消息记录'});
                         }else{
                             res.json({status:1,msg:'读取消息记录成功',data})
                         }
                     }
              })
          })
    })
}