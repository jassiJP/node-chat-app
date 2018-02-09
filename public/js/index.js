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

socket.on('newLocationMessage', function(message) {
    console.log('got location message ', message);
    var newLocationLi = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');

    newLocationLi.text(`${message.from}: `);
    a.attr('href', message.url);
    newLocationLi.append(a);
    $("#messages").append(newLocationLi);
});

jQuery("#message-form").on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'Jatinder',
        text: $('[name=message]').val()
    }, function(ack) {
        $('[name=message]').val('');
        console.log(ack)
    });
});

var locationButton = $('#send-location');

locationButton.on('click', function () {
    var $this = $(this);

    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    $this.attr("disabled", "disabled");

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

        $this.attr("disabled", false);
    }, function () {
        $this.attr("disabled", false);
        alert('Unable to fetch location');
    });
}); 