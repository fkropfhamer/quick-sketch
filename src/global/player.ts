import Client from "../server/client";

export default class Player {
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