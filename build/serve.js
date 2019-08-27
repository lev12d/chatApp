var app = require('express')();
var express = require('express')
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

app.use(express.static(path.join(__dirname, '/static')))

app.get('/',function(req,res){
     
       res.sendFile(__dirname+'/index.html');
       // res.send('<h1>这是服务器向客户端发送的一条数据</h1>');
      
});


io.on('connection',function(socket){
     //console.log('a user connected');
     socket.on('chat message',function(msg){
        //  console.log( '客户端发过来的信息为：'+' '+msg)
        io.emit('chat message',msg);
     })
});

http.listen(9000,function(){ 
    var a = new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://localhost:9000`],
        },
      })
      console.log(a.compilationSuccessInfo.messages)
   // console.log('Your application is running here: http://localhost:9000');
});
