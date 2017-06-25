var server = require('ws').Server;
var s = new server({port: 5001});

s.on('connection', function(ws) {
    ws.on('message', function(message) {

        message = JSON.parse(message);
        //consolej atvaizduojamas gaunamos zinutes turinys
        console.log(message);

        if(message.type == "name") {
            ws.personName = message.data;
            return;
        }
        //Sends message data to user
        s.clients.forEach(function e(client) {
            if(client != ws)
                if(message.sendTo != message.user) {
                    client.send(JSON.stringify({
                        // type: "message",
                        name: ws.personName,
                        data: message.data,
                        sentFrom: message.user,
                        topicType: message.topic,
                        iAm: message.sendTo
                    }));
                } else {
                    console.log("Other user");
                }
        });
    });

    //When user disconnects from websocket message is sent to console
    ws.on('close', function() {
        console.log("I lost a client");
    });
});
