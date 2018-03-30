const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {//event listener
    console.log("A new user connected.");

    socket.emit('newMessage', {
        from: 'Obi-wan kenobi',
        text: 'Hello there',
        createdAt: 123123
    });

    socket.on('createMessage', (message) => {
        console.log('Sent new message',message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from client');
    });
});

server .listen(port,() => {
    console.log(`Server is up on port ${port}`);
});
