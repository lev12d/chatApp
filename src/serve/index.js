const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const api = require('./api.js');
api(app);

http.listen(9001,function(){
    console.log('Server listening at port: 9001')
})