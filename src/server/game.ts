import { Client } from "./user";

export default class Game {
    clients: Client[];
    interval: NodeJS.Timeout;

    constructor() {
        this.clients = [];
    }

    addClient(client: Client) {
        this.clients.push(client);
        if (this.clients.length <= 0) {
            this.start();
        }
    }

    removeClient(client: Client) {
        this.clients = this.clients.filter((c) => !Object.is(c, client));
        if (this.clients.length === 0) {
            clearInterval(this.interval);
        }
    }

    start() {
        this.interval = setInterval(this.loop.bind(this), 1000);
    }

    loop() {
        console.log('loop')
    }
}