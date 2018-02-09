var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: 'me@some.com',
    //     text: 'hey'
    // });

    // socket.emit('createMessage', {
    //     message: 'create a message'
    // });

});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

// socket.on('newEmail', function(email) {
//     console.log('new email: ', email);
// });

socket.on('newMessage', function(message) {
    console.log('newMessage: ', message);
});