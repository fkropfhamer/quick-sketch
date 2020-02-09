import * as io from 'socket.io';
import Player from '../global/player';

export default class Client extends Player {
    socket: io.Socket;

    constructor(id: string, socket: io.Socket) {
        super(id);
        this.socket = socket;
    }
}