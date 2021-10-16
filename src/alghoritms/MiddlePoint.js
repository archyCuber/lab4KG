import {drawLine, drawPolygon, getPointsLine, getPolygonPoints} from "./core";
import {centerX, centerY, stage} from "../app";

const INSIDE = 0; // 0000
const LEFT = 1; // 0001
const RIGHT = 2; // 0010
const BOTTOM = 4; // 0100
const TOP = 8; // 1000
const eps = 0.1;
let polygonPoints

function init() {
    polygonPoints = getPolygonPoints()
}

function getCode(x, y, x_min, y_min, x_max, y_max) {
    let code = INSIDE;
    if (x < x_min) code |= LEFT;
    else if (x > x_max) code |= RIGHT;
    if (y < y_min) code |= BOTTOM;
    else if (y > y_max) code |= TOP;

    return code;
}

function middleRes(x_min, y_min, x_max, y_max, x1, y1, x2, y2) {
    let middle_res = []
    if (Math.abs(x1 - x2) < eps && Math.abs(y1 - y2) < eps) {
        return;
    }
    let code_a = getCode(x1, y1, x_min, y_min, x_max, y_max);
    let code_b = getCode(x2, y2, x_min, y_min, x_max, y_max);

    if (code_a & (code_b > 0)) {
        return;
    }

    if (code_a === 0 && code_b === 0) {
        middle_res = middle_res.concat([
            { x: x1, y: y1 },
            { x: x2, y: y2 },
        ]);
    }
    let x3 = (x1 + x2) / 2;
    let y3 = (y1 + y2) / 2;
    let left = middleRes(x_min, y_min, x_max, y_max, x1, y1, x3, y3);
    let right = middleRes(x_min, y_min, x_max, y_max, x3, y3, x2, y2);
    if (left) {
        middle_res = middle_res.concat(left);
    }
    if (right) {
        middle_res = middle_res.concat(right);
    }
    return middle_res
}

export function middlePoint() {
    init()
    const {x1, y1, x2, y2} = getPointsLine()
    drawLine(x1, y1, x2, y2)
    drawPolygon(polygonPoints)

    const middle = middleRes( polygonPoints[0].x,
        polygonPoints[0].y,
        polygonPoints[2].x,
        polygonPoints[2].y,  x1,
        y1,
        x2,
        y2)

    if (!!middle.length) {
       const line =  stage
            .path()
            .stroke("red")
            .moveTo(middle[0].x + centerX, -middle[0].y + centerY);
        for (let i = 1; i < middle.length; i++) {
            line.lineTo(middle[i].x + centerX, -middle[i].y + centerY);
        }
    }
}