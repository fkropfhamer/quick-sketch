import User from "./user";
import Config from "../global/config";
import { Drawing } from "../global/gamestate";

export default class Game {
    players: User[];
    count: number;
    interval: NodeJS.Timeout;
    drawing: Drawing;
    drawingPlayer: User;
    wordToDraw: string = "test"
    drawingCount: number;

    constructor(player: User) {
        this.players = [player];
        this.count = 0;
        this.drawingCount = 0;
        this.drawing = [];
        
        this.start();
    }

    start() {
        this.drawingPlayer = this.players[0];
        this.interval = setInterval(this.loop.bind(this), Config.UPDATE_INTERVAL);
    }

    loop() {
        this.count += 1 
        this.count %= Config.DRAWTIME;
        if (this.count === 0 && this.players.length > 0) {
            this.drawingCount += 1
            this.drawingCount %= this.players.length
            this.drawingPlayer = this.players[this.drawingCount];
            this.drawingPlayer.notifyDrawing();
        } 
        this.players.forEach(player => player.notifyUpdate(this.players, this.count, this.drawing, this.drawingPlayer, this.wordToDraw));
    }

    draw(id: string, drawing: Drawing) {
        if (this.drawingPlayer.id === id) {
            this.drawing = drawing;
        }
    }

    removeUser(user: User) {
        this.players = this.players.filter(player => !Object.is(player, user));
    }
}