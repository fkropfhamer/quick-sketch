import * as React from "react";
import GameState from "../../../global/gamestate";
import GameStateRenderer from "./GamestateRenderer";
import Username from "./Username";

interface State {
    isConnected: boolean;
    isPlaying: boolean;
    gameState: GameState;
}

export default class App extends React.Component {
    state: State;

    constructor(props: null) {
        super(props);
        this.state = {
            isConnected: false,
            isPlaying: false,
            gameState: null,
        }
    }

    render() {
        return (
            <div>
                {!this.state.isConnected ? <h1>{"disconnected"}</h1> : this.state.isPlaying ? <GameStateRenderer /> : <Username />}
            </div>
            )
    }
}