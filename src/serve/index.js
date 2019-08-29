const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const api = require('./api.js');
api(app);

http.listen(9001,function(){
    console.log('\033[40;32m Server listening at port: 9001 \033[0m');
})

var chatMsg = {}
var roomNum = {}

io.on('connection',function(socket){
      console.log('\033[40;32m A user connected!\033[0m')
})