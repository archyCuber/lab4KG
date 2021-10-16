import {drawLine, drawPolygon, getPointsLine, getPolygonPoints} from "./core";
import {drawLineInPolygon} from "./SazerDraw";
const INSIDE = 0; // 0000
const LEFT = 1; // 0001
const RIGHT = 2; // 0010
const BOTTOM = 4; // 0100
const TOP = 8; // 1000
let polygonPoints
let isInside
let x_max
let y_max
let x_min
let y_min


function initVariable() {
    polygonPoints = getPolygonPoints()
    isInside = false;
    x_max = polygonPoints[2].x;
    y_max = polygonPoints[2].y;
    x_min = polygonPoints[0].x;
    y_min = polygonPoints[0].y;
}

function getCode(x, y) {
    let code = INSIDE;
    if (x < x_min) code |= LEFT;//code = code | LEFT
    else if (x > x_max) code |= RIGHT;
    if (y < y_min) code |= BOTTOM;
    else if (y > y_max) code |= TOP;

    return code;
}

function checkLine(codes, line) {
    while (true) {
        if (codes.code1 == 0 && codes.code2 == 0) {
            // есть отрезок внутри
            isInside = true;
            break;
        } else if (codes.code1 & codes.code2) {
            // вне прямоугольника
            break;
        } else {
            // переносим точки
            let code_out;
            let x, y;
            if (codes.code1 != 0) code_out = codes.code1;
            else code_out = codes.code2;
            if (code_out & TOP) {
                x = line.x1 + ((line.x2 - line.x1) * (y_max - line.y1)) / (line.y2 - line.y1);
                y = y_max;
            } else if (code_out & BOTTOM) {
                x = line.x1 + ((line.x2 - line.x1) * (y_min - line.y1)) / (line.y2 - line.y1);
                y = y_min;
            } else if (code_out & RIGHT) {
                y = line.y1 + ((line.y2 - line.y1) * (x_max - line.x1)) / (line.x2 - line.x1);
                x = x_max;
            } else if (code_out & LEFT) {
                y = line.y1 + ((line.y2 - line.y1) * (x_min - line.x1)) / (line.x2 - line.x1);
                x = x_min;
            }
            if (code_out === codes.code1) {
                line.x1 = x;
                line.y1 = y;
                codes.code1 = getCode(line.x1, line.y1);
            } else {
                line.x2 = x;
                line.y2 = y;
                codes.code2 = getCode(line.x2, line.y2);
            }
        }
    }
}


export function sazer () {
    initVariable()
    const line = getPointsLine()
    drawPolygon(polygonPoints)
    drawLine(line.x1, line.y1, line.x2, line.y2)
    const codes = {code1: undefined, code2: undefined}

    codes.code1 = getCode(line.x1, line.y1);
    codes.code2 = getCode(line.x2, line.y2);
    checkLine(codes, line)

    if (isInside) {
        drawLineInPolygon(line.x1, line.x2, line.y1, line.y2)
    }
}