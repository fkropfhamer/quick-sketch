import { Player } from "../server/user";

export default class GameState {
    players: Player[];
    drawingPlayer: Player;
    drawing: Drawing;
    timer: number;
    termToDraw: string;
    isDrawing: boolean;
}


export type Drawing = Stroke[]
export type Stroke = [X, Y, T];
type X = number[]
type Y = number[]
type T = number[]
