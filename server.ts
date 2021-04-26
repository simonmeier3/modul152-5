import * as WebSocket from "ws";

const wss = new WebSocket.Server({
    port: 8080,
});

wss.on('connection', (client: WebSocket) => {

    client.on('message', data => {
       Array.from(wss.clients)
           .filter(connectedClient => connectedClient !== client)
           .forEach(connectedClient => connectedClient.send(data));
    });
    client.send('Welcome to the Server!')

    setInterval(() => {
        if (client.isAlive === false){
            client.terminate();
        }

        client.ping();
        client.isAlive = false;
    }, 15000);
});

