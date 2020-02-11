import * as React from "react";
import Player from "../../../global/player";

interface Props {
    players: Player[]
}

export default function Game(props: Props) {
    return (
        <div>
            <h1>GameState</h1>
            <PlayerList players={props.players}/>
        </div>
    )
}

function PlayerList(props: Props) {
    return (
        <div>
            {props.players.map((player) => <h1 key={player.id}>{player.username} {player.score}</h1>)}
        </div>
    )
} 