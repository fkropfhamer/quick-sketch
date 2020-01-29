import * as io from 'socket.io';
import Event from '../global/event';
import GameState, { Drawing, Player } from '../global/gamestate';

export default class User {
    socket: io.Socket;
    id: string;
    username: string = "anonymous";
    score: number = 0;

    constructor (id: string, socket: io.Socket) {
        this.id = id;
        this.socket = socket;
    }

    notifyUpdate(users: User[], count: number, drawing: Drawing, drawingUser: User, wordToDraw: string) {
        const players = users.map((user) => Player.userToPlayer(user));
        const isDrawingPlayer = Object.is(this, drawingUser);
        const drawingPlayer = Player.userToPlayer(drawingUser);
        
        const gameState = new GameState(players, drawing, wordToDraw, count, drawingPlayer, isDrawingPlayer)

        this.socket.emit(Event.UPDATE, gameState)
    }

    notifyDrawing() {
        this.socket.emit(Event.DRAWING)
    } 
}