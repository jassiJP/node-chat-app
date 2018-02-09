var socket = io();

function scrollToBottom () {
    //selectors
    var messages = $("#messages");
    var newMessage = messages.children('li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
    var template = $("#message-template").html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $("#messages").append(html);
    scrollToBottom();
    // var chatContainer = $("#messages");
    // var newMessage = $('<li></li>');
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // newMessage.text(`${message.from} ${formattedTime}: ${message.text}`);
    // chatContainer.append(newMessage);
    // console.log('newMessage: ', message);
});

socket.on('newLocationMessage', function(message) {
    var template = $("#location-message-template").html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime,
    });
    $("#messages").append(html);
    scrollToBottom();
    // console.log('got location message ', message);
    // var newLocationLi = $('<li></li>');
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // var a = $('<a target="_blank">My Current Location</a>');

    // newLocationLi.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // newLocationLi.append(a);
    // $("#messages").append(newLocationLi);
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
    var btnText = $this.text();

    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    $this.text("Sending...");
    $this.attr("disabled", "disabled");

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });


        $this.text(btnText);
        $this.attr("disabled", false);
    }, function () {
        $this.text(btnText);
        $this.attr("disabled", false);
        alert('Unable to fetch location');
    });
}); 