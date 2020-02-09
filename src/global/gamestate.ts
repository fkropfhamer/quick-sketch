import Client from "../server/client";
import Player from "./player";

export default class GameState {
    players: Player[];
    drawingPlayer: Player;
    drawing: Drawing;
    timer: number;
    termToDraw: string;
    isDrawing: boolean;

    constructor(clients: Client[], drawingClient: Client, drawing: Drawing, timer: number, termToDraw: string, id: string) {
        this.players = clients.map(client => Player.playerFromClient(client));
        this.drawingPlayer = Player.playerFromClient(drawingClient);
        this.drawing = drawing;
        this.timer = timer;
        this.isDrawing = this.drawingPlayer.id === id;
        this.termToDraw = this.isDrawing ? termToDraw : "";
    }
}


export type Drawing = Stroke[]
export type Stroke = [X, Y, T];
type X = number[]
type Y = number[]
type T = number[]
