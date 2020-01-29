import * as io from 'socket.io';

export interface Client {
    id: string
}

export interface User extends Client {
    socket: io.Socket
}

export function createUser(id: string, socket: io.Socket): User {
    return { id, socket };
}

export interface Player extends Client {
    username: string;
}

export function createPlayer(id: string): Player {
    return { id, username: "anonymous" }
}