const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log(`new user connected`);

    // socket.emit('newEmail', {
    //     from: 'some@example.com',
    //     text: 'hey what\'s up'
    // });
    // socket.emit('newMessage', {
    //     message: 'hey wattup'
    // });

    socket.on('createMessage', (message) => {
        console.log('createMessage: ', message);
        //broadcast message
        io.emit('newMessage', {
            message: `broadcasted this message \n ${message.message} `
        });
    });
    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail: ', newEmail);
    // });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Node started on port ${port}`);
});