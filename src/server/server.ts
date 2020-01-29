import * as io from 'socket.io';
import * as express from 'express';
import * as http from 'http';
import Config from "../global/config";
import Event from "../global/event";
import { User, createUser, createPlayer, Player, Client } from './user';
import GameState from '../global/gamestate';

export default class Server {
    games: GameState[];
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
            const user = createUser(id, socket);
            const player = createPlayer(id);
            console.log(`user with id ${id} connected`);

            this.users = Server.addUser(this.users, user);
            this.games = Server.addPlayer(this.games, player);

            socket.on(Event.DISCONNECT, () => {
                this.users = Server.userDisconnected(this.users, id);
                this.games = Server.playerDisconnected(this.games, id);
                console.log(`user with id ${id} disconnected`);
            });

            socket.on(Event.SET_USERNAME, (username: string) => {
                this.games = Server.setUsername(this.games, id, username);
            })

            socket.on("draw", (data) => {
                const game = Server.getGameOfClient(this.games, id);

                game.drawing = data;
            })

            
        setInterval(() => {
                this.games = Server.updateGames(this.games);
                Server.notifyPlayers(this.games, this.users);
            }, 20);
        });
    }

    static userDisconnected(users: User[], id:string): User[] {
        return users.filter(user => user.id !== id)
    }

    static playerDisconnected(games: GameState[], id: string): GameState[] {
        const game = this.getGameOfClient(games, id);
        const newGame = GameState.playerDisconnected(game, id);
        const otherGames = games.filter((g) => game !== g)
        return [...otherGames, newGame];
    }

    static notifyPlayers(games: GameState[], users: User[]): void {
        games.forEach((game) => {
            game.players.forEach((player) => {
                this.notifyUpdate(game, player.id, users)
            })
            
        })
    } 

    static notifyUpdate(gameState: GameState, id: string, users: User[]): void {
        const user = users.filter((user) => user.id === id)[0];
        if (user) {
            user.socket.emit(Event.UPDATE, gameState);
        }
    }

    static updateGames(games: GameState[]): GameState[] {
        return games;
    }

    static setUsername(games: GameState[], id: string, username: string): GameState[] {
        return games;
    }

    static getGameOfClient(games: GameState[], id: string): GameState {
        return games.filter(game => GameState.hasPlayer(game, id))[0];
    } 

    static addUser(users: User[], user: User): User[] {
        return [...users, user];
    }

    static addPlayer(games: GameState[], player: Player): GameState[] {
        const openGames = games.filter((game) => game.players.length < 10);
        if (openGames.length > 0) {
            const game = openGames.sort((a, b) => a.players.length - b.players.length)[0];
            const newGame = GameState.addPlayer(game, player);
            const otherGames = games.filter(g => game !== g);
            return [...otherGames, newGame];
        }
        
        const newGame = new GameState(player);
        return [...games, newGame];
    }
}

