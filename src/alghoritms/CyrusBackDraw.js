import {centerX, centerY, stage} from "../app";
import {drawLine, drawPolygon} from "./core";

function drawLineInPolygon(x1, y1, line, tOutput, tInput) {
    stage.path()
    .moveTo(x1 + line.x * tOutput + centerX, -(y1 + line.y * tOutput) + centerY)
    .lineTo(x1 + line.x * tInput + centerX, -(y1 + line.y * tInput) + centerY)
    .stroke({ color: "red" });
}

function drawPoints(T, TMax, TMin, x1, y1, line) {
    for (let i = 0; i < T.length; i++) {
        stage.circle(
            x1 + line.x * T[i] + centerX,
            -(y1 + line.y * T[i]) + centerY,
            1
        );
    }
    for (let i = 0; i < TMax.length; i++) {
        stage.circle(
            x1 + line.x * TMax[i] + centerX,
            -(y1 + line.y * TMax[i]) + centerY,
            1
        );
    }
    for (let i = 0; i < TMin.length; i++) {
        stage.circle(
            x1 + line.x * TMin[i] + centerX,
            -(y1 + line.y * TMin[i]) + centerY,
            1
        );
    }
}

export function drawing(polygonPoints, line, vector, T, TInput, TOutput, isParallel) {
    const min = TInput[0] || 0
    const max = TOutput.length ? TOutput[TOutput.length - 1] : 1
    drawPolygon(polygonPoints)
    drawLine(line.x1, line.y1, line.x2, line.y2)
    drawPoints(T, TInput, TOutput, line.x1, line.y1, vector)
    if (min <= max && !isParallel.check) {
        drawLineInPolygon(line.x1, line.y1, vector, max, min)
    }
}