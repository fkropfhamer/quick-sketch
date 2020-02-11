import * as io from 'socket.io';
import Player from '../global/player';
import { Event } from '../global/event';

export default class Client extends Player {
    socket: io.Socket;

    constructor(id: string, socket: io.Socket) {
        super(id);
        this.socket = socket;
    }

    notifyStart() {
        this.socket.emit(Event.START);
    }

    notifyClients(clients: Client[]) {
        const players = clients.map((client) => Player.playerFromClient(client))
        this.socket.emit(Event.PLAYERS, players);
    }
}