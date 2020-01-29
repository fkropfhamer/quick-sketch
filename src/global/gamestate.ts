import User from "../server/user";

export default class GameState {
    players: Player[];
    drawingPlayer: Player;
    drawing: Drawing;
    wordToDraw: string;
    count: number;
    isDrawing: boolean;

    constructor(players: Player[], drawing: Drawing, wordToDraw: string, count: number, drawingPlayer: Player, isDrawing: boolean) {
        this.players = players;
        this.drawing = drawing;
        this.wordToDraw = wordToDraw;
        this.drawingPlayer = drawingPlayer;
        this.count = count;
        this.isDrawing = isDrawing;
    }
}

export class Player {
    username: string;
    score: number;

    static userToPlayer(user: User): Player {
        return { username: user.username, score: user.score }
    }
}

export type Drawing = Stroke[]
export type Stroke = [X, Y, T];
type X = number[]
type Y = number[]
type T = number[]