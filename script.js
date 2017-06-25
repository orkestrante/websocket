var form = document.getElementById('message-form');
var messageField = document.getElementById('message');
var users = document.getElementById("user-options");
var topics = document.getElementById("topic");
var username = document.getElementById("username");

function userSelection() {
    document.getElementById("chosen-user").innerHTML = users.value;
}

var socket = new WebSocket('ws://192.168.33.10:5001');

// Handle any errors that occur.
socket.onerror = function(error) {
    console.log('WebSocket Error: ' + error);
};

// Send a message when the form is submitted.
form.onsubmit = function(e) {
    e.preventDefault();
    var text = document.getElementById('message').value;
    socket.send(JSON.stringify({
        topic: topics.value,
        data: text,
        sendTo: username.value,
        user: users.value
    }));
    log.innerHTML +=
        "<div class='row'>"+
        "<span class='alert alert-success col-xs-12 col-sm-12' id='receivedMessage'>" +
        "<div>" + "You sent to "+username.value+ " : "+ text+
        "<div class='pull-right'>" +
        "<button type='button' class='btn btn-sm btn-danger'>" + "Remove" + "</button>" +
        "</div>" +
        "</div>" +
        "</span>"+"</div>"
    };

var log = document.getElementById('messages');
var name = users.value;

//Shows received data
socket.onmessage = function(event) {
    var json = JSON.parse(event.data);
        if (json.name == "Mario" && json.topicType == "Topic" || json.name == "Luigi" && json.topicType == "Topic") {
            log.innerHTML +=
                "<span class='alert alert-warning col-xs-12 col-sm-12' id='receivedMessage'>" +
                "<div>" + "You reveived : " + json.data +
                "<div class='pull-right'>" +
                "<button type='button' onclick='removeMessage()' class='btn btn-sm btn-danger'>" + "Remove" + "</button>" +
                "</div>" +
                "</div>" +
                "</span>";
        } else if (json.name == "Mario" && json.topicType == "Important" || json.name == "Luigi" && json.topicType == "Important") {
            log.innerHTML +=
                "<span class='alert alert-danger col-xs-12 col-sm-12' id='receivedMessage'>" +
                "<div>" + "You received : " + json.data +
                "<div class='pull-right'>" +
                "<button type='button' onclick='removeMessage()' class='btn btn-sm btn-danger'>" + "Remove" + "</button>" +
                "</div>" +
                "</div>" +
                "</span>";
        }
};

//When user is connected to websocket message is sent to server
socket.onopen = function() {
    socket.send(JSON.stringify({
            type: "name",
            data: name
        }
    ));
};

//Resets forms textarea
document.getElementById("reset").addEventListener("click", function(){
    messageField.value = "";
});

//Removes message
function removeMessage() {
    var x = document.getElementById("receivedMessage");
    x.remove(x.selected);
}
