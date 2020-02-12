import * as io from 'socket.io';
import * as express from 'express';
import * as http from 'http';
import Config from "../global/config";
import { Event } from "../global/event";
import Client from './client';
import GameState, { Drawing, DrawEvent } from '../global/gamestate';
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
                this.game.removeClient(client);
            });

            socket.on(Event.SET_USERNAME, (username: string) => {
                if ( username !== "") {
                    client.username = username;
                    console.log(`user with id ${id} changed name to ${username}`)
                }
            });

            socket.on(Event.READY, () => {
                console.log(`user with id ${id} is ready`)
                this.game.addClient(client);
            })

            socket.on(Event.DRAW, (drawEvent: DrawEvent) => {
                console.log("draw-event", drawEvent)
                this.game.addDrawEvent(drawEvent)
            });
        });
    }
}
