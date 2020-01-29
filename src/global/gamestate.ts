import { Player } from "../server/user";

export default class GameState {
    players: Player[];
    drawingPlayer: Player;
    drawing: Drawing;
    wordToDraw: string;
    count: number;

    constructor(player: Player) {
        this.players = [player];
        this.drawingPlayer = player;
        this.drawing = [];
        this.wordToDraw = "test";
        this.count = 0;
    }

    static updateGameState(gameState: GameState): GameState {
        return gameState;
    }
    
    static hasPlayer(gameState: GameState, id: string): boolean {
        return gameState.players.filter((player) => player.id === id).length > 0
    }

    static playerDisconnected(gameState: GameState, id: string): GameState {
        const newPlayers = gameState.players.filter(player => player.id !== id);

        return { ...gameState, players: newPlayers };
    }

    static addPlayer(gameState: GameState, player: Player): GameState {
        const newPlayers = [...gameState.players, player];

        return { ...gameState, players: newPlayers };
    }

    static updateDrawing(gameState: GameState, id: string, drawing: Drawing): GameState {
        if (gameState.drawingPlayer.id === id) {
            return { ...gameState, drawing};
        }
    }
}



export type Drawing = Stroke[]

export type Stroke = [X, Y, T];

type X = number[]
type Y = number[]
type T = number[]