import * as WebSocket from "ws";

const wss = new WebSocket.Server({
    port: 8080,
});

export interface ExtendedWebSocket extends WebSocket {
    isAlive: boolean;
}

wss.on('connection', (client: ExtendedWebSocket) => {

    client.isAlive = true;
    client.on('message', data => {
        Array.from(wss.clients)
            .filter(connectedClient => connectedClient !== client)
            .forEach(connectedClient => connectedClient.send(data));
    });
    client.send('Welcome to the Server!')

    client.on('pong', () => {
        client.isAlive = true;
    });

});

setInterval(function ping() {
    wss.clients.forEach(function each(ws: ExtendedWebSocket) {
        if (ws.isAlive === false) {
            ws.terminate()
            console.log("client terminated")
        }
        ws.isAlive = false;
        ws.ping();
    });
}, 15000)