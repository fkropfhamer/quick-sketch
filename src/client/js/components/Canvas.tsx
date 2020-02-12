import * as React from "react";
import { Event } from "../../../global/event";
import { Drawing, Stroke } from "../../../global/gamestate";

interface State {
    mouseIsPressed: boolean;
    mouseWasPressed: boolean;
    context: CanvasRenderingContext2D;
}

interface Props {
    socket: SocketIOClient.Socket
}

export default class Canvas extends React.Component<Props> {
    state: State;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(props: Props) {
        super(props);
        this.state = {
            mouseIsPressed: false,
            mouseWasPressed: false,
            context: null,
        }

        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener("mousedown", () => {
            this.state.mouseIsPressed = true;
        });
    
        document.addEventListener("mouseup", () => {
            this.state.mouseIsPressed = false;
        });
    }

    componentDidMount() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");
        this.setState({context: this.context})

        this.canvas.addEventListener("mousemove", (event) => {
            if(this.state.mouseIsPressed) {
                const x = event.offsetX;
                const y = event.offsetY;
                this.props.socket.emit(Event.DRAW, {x, y, mouseWasPressed: this.state.mouseWasPressed})
            } 
            this.state.mouseWasPressed = this.state.mouseIsPressed;
        })

        this.props.socket.on(Event.DRAWING, (drawing: Drawing) => {
            draw(drawing, this.state.context);
        });
    }

    render() {
        return <canvas id="canvas"/>
    }
}

function drawLine(x1: number, y1: number, x2: number, y2: number, context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function reset(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(drawing: Drawing, context: CanvasRenderingContext2D): void {
    drawing.forEach(stroke => {
        drawStroke(stroke, context);
    });
}

function drawStroke(stroke: Stroke, context: CanvasRenderingContext2D) {
    for(let i = 0; i < stroke[0].length - 1; i++) {
        const x1 = stroke[0][i];
        const y1 = stroke[1][i];
        const x2 = stroke[0][i + 1];
        const y2 = stroke[1][i + 1];
        

        drawLine(x1, y1, x2, y2, context)
    };
}