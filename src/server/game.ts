import Client from "./client";
import Config from "../global/config";
import { DrawEvent, Drawing } from "../global/gamestate";

export default class Game {
    clients: Client[];
    interval: NodeJS.Timeout;
    timer: number;
    isStarted: boolean;
    drawingClient: Client;
    drawing: Drawing;

    constructor() {
        this.clients = [];
        this.isStarted = false;
        this.drawing = [];
    }

    addClient(client: Client) {
        this.clients.push(client);
        if (this.clients.length > 0 && !this.isStarted) {
            this.start();
        }
        client.notifyStart();
        this.clients.forEach((c) => c.notifyClients(this.clients));
    }

    removeClient(client: Client) {
        this.clients = this.clients.filter((c) => !Object.is(c, client));
        this.clients.forEach((c) => c.notifyClients(this.clients));
        if (this.clients.length === 0) {
            clearInterval(this.interval);
            this.isStarted = false;
        } else if (Object.is(client, this.drawingClient)) {
            this.changeDrawingPlayer();
            
        }
    }

    start() {
        this.isStarted = true;
        this.timer = 0;
        this.interval = setInterval(this.loop.bind(this), 1000);
    }

    loop() {
        this.timer += 1;
        if (this.timer % Config.DRAWTIME === 0) {
            this.timer = 0;
            this.changeDrawingPlayer();
        }
        console.log(`loop ${this.timer}`);
    }

    addDrawEvent(drawEvent: DrawEvent) {
        if(!drawEvent.mouseWasPressed) {
            this.drawing.push([[], [], []]);
        }
        const lastStroke = this.drawing[this.drawing.length - 1];
        lastStroke[0].push(drawEvent.x);
        lastStroke[1].push(drawEvent.y);
        this.clients.forEach((client) => client.notifyDrawing(this.drawing))
    }

    changeDrawingPlayer() {
        console.log("test");
    };
}