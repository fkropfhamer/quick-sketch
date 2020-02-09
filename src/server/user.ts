import * as io from 'socket.io';

export class Player {
    username: string;
    id: string;
    score: number;

    constructor(id: string) {
        this.id = id;
        this.username = "anonymous";
        this.score = 0;
    }

    static playerFromClient(client: Client): Player {
        return { username: client.username, id: client.id, score: client.score }
    }
}

export class Client extends Player {
    socket: io.Socket;

    constructor(id: string, socket: io.Socket) {
        super(id);
        this.socket = socket;
    }
}