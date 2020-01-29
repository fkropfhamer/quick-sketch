import * as io from 'socket.io';
import * as express from 'express';
import * as http from 'http';
import Config from "../global/config";
import Event from "../global/event";
import User from './user';
import GameState, { Drawing } from '../global/gamestate';
import Game from './game';

export default class Server {
    games: Game[];
    users: User[];

    constructor() {
        const app = express();
        const webServer = http.createServer(app);
        const webSocket = io(webServer);

        this.games = [];
        this.users = [];

        app.use(express.static("public"));

        webServer.listen(Config.PORT, () => {
            console.log(`server listening on *:${Config.PORT}`);
        });

        webSocket.on(Event.CONNECTION, (socket: io.Socket) => {
            const id = socket.id;
            const user = new User(id, socket);
            const game = this.findGame(user);
            console.log(`user with id ${id} connected`);

            this.users.push(user);

            socket.on(Event.DISCONNECT, () => {
                console.log(`user with id ${id} disconnected`);
                game.removeUser(user);
                this.games = this.games.filter(game => game.players.length > 0)
            });

            socket.on(Event.SET_USERNAME, (username: string) => {
                user.username = username;
            });

            socket.on(Event.DRAW, (drawing: Drawing) => {
                game.draw(id, drawing);
            });
        });
    }

    findGame(user: User): Game {
        const openGames = this.games.filter(game => game.players.length < Config.MAX_PLAYER_NUMBER)
        if (openGames.length <= 0) {
            const newGame = new Game(user);
            this.games.push(newGame);
            return newGame;
        }
        const game = openGames.sort((a, b) => a.players.length - b.players.length)[0];
        game.players.push(user);
        return game;
    }
}
