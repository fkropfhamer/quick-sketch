import * as io from "socket.io";
import Server from "./server";

export default class User {
    private socket: io.Socket;
    private server: Server;
    private username: string;

    constructor(socket: io.Socket, server: Server) {
        this.socket = socket;
        this.server = server;

        this.setupSocket();
    }

    private setupSocket(): void {
        this.socket.on("disconnect", this.onDisconnect.bind(this));
        this.socket.on("set_username", this.onSetUserName.bind(this));
    }

    private onDisconnect(): void {
        this.server.userDisconnected(this);
    }

    private onSetUserName(username: string): void {
        this.username = username;
    }
}
