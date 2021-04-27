"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var wss = new WebSocket.Server({
    port: 8080,
});
wss.on('connection', function (client) {
    client.isAlive = true;
    client.on('message', function (data) {
        Array.from(wss.clients)
            .filter(function (connectedClient) { return connectedClient !== client; })
            .forEach(function (connectedClient) { return connectedClient.send(data); });
    });
    client.send('Welcome to the Server!');
    client.on('pong', function () {
        client.isAlive = true;
    });
});
setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) {
            ws.terminate();
            console.log("client terminated");
        }
        ws.isAlive = false;
        ws.ping();
    });
}, 15000);
//# sourceMappingURL=server.js.map