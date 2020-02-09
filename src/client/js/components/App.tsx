import * as io from "socket.io-client";
import * as React from "react";
import GameState from "../../../global/gamestate";
import GameStateRenderer from "./GamestateRenderer";
import Username from "./Username";
import Config from "../../../global/config";
import { Event } from "../../../global/event";

interface State {
    isConnected: boolean;
    isPlaying: boolean;
    gameState: GameState;
    username: string;
}

export default class App extends React.Component {
    state: State;

    private socket: SocketIOClient.Socket;

    constructor(props: null) {
        super(props);
        this.state = {
            isConnected: false,
            isPlaying: false,
            gameState: null,
            username: "",
        }
    }

    setUsername(username: string) {
        console.log(username);
        this.setState({username});
        this.connect();
        this.socket.emit(Event.SET_USERNAME, username);
        this.socket.emit(Event.READY);
    }

    connect() {
        this.socket = io(`http://localhost:${Config.PORT}`);
        this.setupSocket();
    }

    setupSocket() {
        console.log("dfasf");
    }

    render() {
        return (
            <div>
                <h1>{this.state.isConnected ? "connected" : "disconnected"}</h1>
                <h1>Username: {this.state.username}</h1>
                {this.state.isPlaying ? <GameStateRenderer /> : <Username username={this.state.username} setUsername={this.setUsername.bind(this)}/>}
            </div>
            )
    }
}