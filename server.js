"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var wss = new WebSocket.Server({
    port: 8080,
});
wss.on('connection', function (client) {
    client.on('message', function (data) {
        Array.from(wss.clients)
            .filter(function (connectedClient) { return connectedClient !== client; })
            .forEach(function (connectedClient) { return connectedClient.send(data); });
    });
    client.send('Welcome to the Server!');
});
//# sourceMappingURL=server.js.map