import * as React from "react";
import Player from "../../../global/player";
import PlayerList from "./PlayerList";
import Canvas from "./Canvas";

interface Props {
    players: Player[]
    socket: SocketIOClient.Socket;
}

export default function Game(props: Props) {
    return (
        <div>
            <h1>GameState</h1>
            <PlayerList players={props.players}/>
            <Canvas socket={props.socket}/>
        </div>
    )
}

