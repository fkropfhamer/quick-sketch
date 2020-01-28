import * as express from "express";
import * as http from "http";
import * as io from "socket.io";
import Config from "../global/config";
import User from "./user";

export default class Server {
    private app: express.Express;
    private socket: io.Server;
    private server: http.Server;
    private connectedUsers: User[] = [];

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.socket = io(this.server);

        this.app.use(express.static("public"));

        this.server.listen(Config.PORT, () => {
        console.log(`server listening on *:${Config.PORT}`);
        });

        this.socket.on("connection", (socket: io.Socket) => {
            console.log("user connected");
            const newUser = new User(socket, this);
            this.connectedUsers.push(newUser);
        });
    }

    public userDisconnected(user: User): void {
        console.log("user disconnected");
        this.connectedUsers = this.connectedUsers.filter((u: User) => !Object.is(u, user));
    }

}
