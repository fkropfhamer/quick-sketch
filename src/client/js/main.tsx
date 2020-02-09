/* import * as io from 'socket.io-client';
import { Event } from '../../global/event';
import GameState, { Drawing, Stroke } from '../../global/gamestate';

const socket = io();
 
let mouseIsPressed = false;
let drawing: Drawing = [];
let lastMove = {mouseIsPressed: false, x: -Infinity, y: -Infinity}
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext("2d");
const id = socket.id;

socket.on(Event.CONNECT, () => {
    console.log('connected');
    drawing = [];
});

socket.on(Event.UPDATE, (gameState: GameState) => {
    reset(canvas, context)
    draw(gameState.drawing, context);
});

socket.on(Event.DRAWING, () => {
    drawing = [];
    alert('you have to draw!')
});

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

function main(): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.background = "grey";

    document.addEventListener("mousedown", () => {
        mouseIsPressed = true;
    });

    document.addEventListener("mouseup", () => {
        mouseIsPressed = false;
    });

    canvas.addEventListener("mousemove", (event) => {
        if(mouseIsPressed) {
            if(!lastMove.mouseIsPressed) {
                drawing.push([[], [], []]);
            }
            const lastStroke = drawing[drawing.length - 1];
            lastStroke[0].push(event.offsetX);
            lastStroke[1].push(event.offsetY);
            socket.emit(Event.DRAW, drawing)
        } 
        lastMove = {mouseIsPressed, x: event.offsetX, y: event.offsetY}
    })
}

main(); */

import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";

const root = document.getElementById("root");
if (root) {
    ReactDOM.render(<App />, root);
}
