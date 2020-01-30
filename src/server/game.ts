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
    timer: number;

    constructor(player: User) {
        this.players = [player];
        this.count = 0;
        this.drawingCount = 0;
        this.drawing = [];
        this.timer = 0;
        this.start();
    }

    start() {
        this.drawingPlayer = this.players[0];
        this.interval = setInterval(this.loop.bind(this), Config.UPDATE_INTERVAL);
    }

    loop() {
        this.count += 1 
        this.count %= Config.DRAWTIME;
        if (this.count % (20) === 0) {
            this.timer += 1;
            console.log(this.timer);
        }
        if (this.count === 0) {
            
        } 
        this.players.forEach(player => player.notifyUpdate(this.players, this.count, this.drawing, this.drawingPlayer, this.wordToDraw));
    }

    nextRound() {
        this.timer = 0;
        this.drawing = [];
        this.drawingCount += 1
        this.drawingCount %= this.players.length
        this.drawingPlayer = this.chooseDrawingPlayer(this.drawingCount)
        this.drawingPlayer.notifyDrawing();
    }

    draw(id: string, drawing: Drawing) {
        if (this.drawingPlayer.id === id) {
            this.drawing = drawing;
        }
    }

    removeUser(user: User) {
        this.players = this.players.filter(player => !Object.is(player, user));
        if (this.players.length === 0) {
            clearInterval(this.interval);
        } 
    }

    chooseDrawingPlayer(drawingCount: number): User {
        console.log(drawingCount);
        if(this.players.length > 1) {
            return this.players[drawingCount];
        }
        return this.players[0];
    }
}