var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
    var chatContainer = $("#messages");
    var newMessage = $('<li></li>');
    newMessage.html(`<b>${message.from}</b>: <i>${message.text}</i>`);
    chatContainer.append(newMessage);
    console.log('newMessage: ', message);
});

jQuery("#message-form").on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'Jatinder',
        text: $('[name=message]').val()
    }, function(ack) {
        console.log(ack)
    });
});