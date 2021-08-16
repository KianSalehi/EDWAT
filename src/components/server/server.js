const { PLAY, PAUSE, SYNC_TIME, NEW_VIDEO, ASK_FOR_VIDEO_INFORMATION,
    SYNC_VIDEO_INFORMATION, JOIN_ROOM,SEND_MESSAGE, RECEIVED_MESSAGE,
    ASK_FOR_USERNAME, SEND_USERNAME }= require('../../constantVariables');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = module.exports.io = require('socket.io')(server);
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const path = require('path');
app.use(express.static(path.join(__dirname,'../../../build')));


io.on('connection', socket=>{
    //in sends to all
    //to sends to all except the sender
    socket.on((JOIN_ROOM), (data)=>{
        socket.join(data.room);
        socket.room = data.room;
        socket.username= data.username;

        const message = socket.username + " joined the room.";
        io.in(socket.room).emit(RECEIVED_MESSAGE, {
            sender: 'Server Notification',
            direction:'outgoing',
            message:message
        });
        io.in(socket.room).emit(ASK_FOR_USERNAME);
    });
    socket.on(PLAY, ()=>{
        socket.to(socket.room).emit(PLAY);
    });
    socket.on(PAUSE, ()=>{
        socket.to(socket.room).emit(PAUSE);
    });
    socket.on(SYNC_TIME, (currentTime)=>{
        socket.to(socket.room).emit(SYNC_TIME, currentTime);
    });
    socket.on(NEW_VIDEO, (url)=>{
        socket.to(socket.room).emit(NEW_VIDEO, url);
    });
    socket.on(ASK_FOR_VIDEO_INFORMATION, ()=>{
        socket.to(socket.room).emit(ASK_FOR_VIDEO_INFORMATION);
    });
    socket.on(SYNC_VIDEO_INFORMATION, ()=>{
        socket.to(socket.room).emit(SYNC_VIDEO_INFORMATION);
    });
    socket.on(SEND_MESSAGE, (data)=>{
        console.log(SEND_MESSAGE);
        socket.to(socket.room).emit(SEND_MESSAGE, data);
    });
    socket.on(SEND_USERNAME, (user)=>{
        socket.to(socket.room).emit(SEND_USERNAME, user);
    });
    socket.on('disconnect', ()=>{
        const message = socket.username + " disconnected";
        socket.in(socket.room).emit(RECEIVED_MESSAGE, {
            username: 'Server Notification',
            text: message
        });
        io.in(socket.room).emit(ASK_FOR_USERNAME);
    });
});

server.listen(PORT,()=>{
    console.log('listening on *:' + PORT);
})