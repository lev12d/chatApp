const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userAccount:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    nickname:{type:String,required:true}
})

const groupSchema = new Schema({
    groupAccount:{ type:Number,required:true,unique:true},
    groupName : { type:String, required:true},
    groupMember : Array
})

const groupMsgSchema = new Schema({
    userAccount : {type:String,required:true},
    nickname : String,
    msgTime : Number,
    msg : String,
    groupAccount:Number,
    groupName:String
})

mongoose.Promise = global.Promise;
 mongoose.connect("mongodb://127.0.0.1:27017/chatApp");
 var database =  mongoose.connection
database.on('error',function(error){
       console.log("数据库连接失败"+error)
       return
})
database.once('open',function(){
     console.log("数据库连接成功!")
     initData();
})

const db = {
    userModel : mongoose.model('userModel',userSchema),
    groupModel : mongoose.model('groupModel',groupSchema),
    groupMsgModelA : mongoose.model('groupMsgModelA',groupMsgSchema),
    groupMsgModelB : mongoose.model('groupMsgModelB',groupMsgSchema)
}

 const initUser = [
    {
        'userAccount': 'zhangsan123',
        'password': '123456',
        'nickname':'张三'
    },
    {
        'userAccount': 'lisi123',
        'password': '123456',
        'nickname':'李四'
    },
    {
        'userAccount': 'wangwu123',
        'password': '123456',
        'nickname':'王五'
    },
    {
        'userAccount': 'liyang123',
        'password': '123456',
        'nickname':'李阳'
    }
]

const initGroup = [
    {
        'groupAccount' : 110,
        'groupName' : '同学群',
        'groupMember' : ['zhangsan123','lisi123']
    },
    {
        'groupAccount' : 120,
        'groupName' : '同事群',
        'groupMember' : ['wangwu123','liyang123']
    }
]

const initGroupMsgA = [
    {
    'userAccount' :'zhangsan123',
    'nickname' : '张三',
    'msgTime' : 1504509461000,
    'msg' : '吃饭了嘛',
    'groupAccount':110,
    'groupName':'同学群'
    },
    {
        'userAccount' :'zhangsan123',
        'nickname' : '张三',
        'msgTime' : 1504509461020,
        'msg' : '?',
        'groupAccount':110,
        'groupName':'同学群'
     },
     {
        'userAccount' :'lisi123',
        'nickname' : '李四',
        'msgTime' : 1504509461220,
        'msg' : '吃了',
        'groupAccount':110,
        'groupName':'同学群'
     }
]

const initGroupMsgB = [
    {
    'userAccount' :'wangwu123',
    'nickname' : '王五',
    'msgTime' : 1504509461000,
    'msg' : 'hi',
    'groupAccount':120,
    'groupName':'同事群'
    },
    {
        'userAccount' :'liyang123',
        'nickname' : '李阳',
        'msgTime' : 1504509461020,
        'msg' : 'hello',
        'groupAccount':120,
        'groupName':'同事群'
     },
    
]

const initData = function(){
    //初始化用户信息
    db.userModel.find({},function(err,data){
         if(err){
             console.log('初始化用户出错!'+ err)
         }else if(!data.length){
            initUser.map(item =>{
                db.userModel.create(item);
            })
         }else{
             console.log("用户数据："+data)
         }
    })
    //初始化群信息
    db.groupModel.find({},function(err,data){
        if(err){
            console.log('初始化群组出错!'+ err)
        }else if(!data.length){
            initGroup.map(item =>{
               db.groupModel.create(item);
           })
        }else{
            console.log("群信息："+data)
        }
   })

   //初始化第一个群的消息记录
   db.groupMsgModelA.find({},function(err,data){
    if(err){
        console.log('初始化群1消息出错!'+ err)
    }else if(!data.length){
        initGroupMsgA.map(item =>{
           db.groupMsgModelA.create(item);
       })
    }else{
        console.log("群1消息："+data)
    }
})

 //初始化第二个群的消息记录
 db.groupMsgModelB.find({},function(err,data){
    if(err){
        console.log('初始化群1消息出错!'+ err)
    }else if(!data.length){
        initGroupMsgB.map(item =>{
           db.groupMsgModelB.create(item);
       })
    }else{
        console.log("群2消息："+data)
    }
 })
}

module.exports = db;