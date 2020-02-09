import Client from "./client";
import Config from "../global/config";

export default class Game {
    clients: Client[];
    interval: NodeJS.Timeout;
    timer: number;
    isStarted: boolean;
    drawingClient: Client;

    constructor() {
        this.clients = [];
        this.isStarted = false;
    }

    addClient(client: Client) {
        this.clients.push(client);
        if (this.clients.length > 0 && !this.isStarted) {
            this.start();
        }
    }

    removeClient(client: Client) {
        this.clients = this.clients.filter((c) => !Object.is(c, client));
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

    changeDrawingPlayer() {
        console.log("test");
    };
}