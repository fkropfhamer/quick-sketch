import * as io from 'socket.io';
import * as express from 'express';
import * as http from 'http';
import Config from "../global/config";
import { Event } from "../global/event";
import { Client } from './user';
import GameState, { Drawing } from '../global/gamestate';
import Game from './game';

export default class Server {
    game: Game;
    clients: Client[];

    constructor() {
        const app = express();
        const webServer = http.createServer(app);
        const webSocket = io(webServer);

        this.game = new Game();
        this.clients = [];

        app.use(express.static("public"));

        webServer.listen(Config.PORT, () => {
            console.log(`server listening on *:${Config.PORT}`);
        });

        webSocket.on(Event.CONNECTION, (socket: io.Socket) => {
            const id = socket.id;
            const client = new Client(id, socket);

            console.log(`user with id ${id} connected`);

            this.clients.push(client);

            socket.on(Event.DISCONNECT, () => {
                console.log(`user with id ${id} disconnected`);
                this.clients = this.clients.filter((c) => !Object.is(c, client));
            });

            socket.on(Event.SET_USERNAME, (username: string) => {
                if ( username !== "") {
                    client.username = username;
                }
            });

            socket.on(Event.READY, () => {
                this.game.addClient(client);
            })

            socket.on(Event.DRAW, (drawing: Drawing) => {
                console.log("draw-event")
            });
        });
    }
}
