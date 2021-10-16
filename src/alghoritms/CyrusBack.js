import {drawing} from "./CyrusBackDraw";
import {getPointsLine, getPolygonPoints} from "./core";

function getNormForSide(index, polygonPoints) {
    let k = index - 1;
    let j = index;
    if (index === polygonPoints.length) {
        k = polygonPoints.length - 1;
        j = 0;
    }
    return {
        x: polygonPoints[j].y - polygonPoints[k].y,
        y: polygonPoints[k].x - polygonPoints[j].x,
    }
}

function checkT(T, t) {
    if (t < 0 || t > 1) {
        // точка за пределами отрезка
        T.push(t);
        return true
    }
     return false
}

function findT(polygonPoints, vector, T, x1, y1, TInput, TOutput, isParallel) {
    for (let i = 1; i < polygonPoints.length + 1; i++) {
        let k = i - 1;
        const normForSide = getNormForSide(i, polygonPoints)
        const scalarPwithNorm = multipleScalar(normForSide.x, vector.x, normForSide.y, vector.y)
        const scalarNormWithVectorP1A1 =
            multipleScalar(normForSide.x, x1 - polygonPoints[k].x,
            normForSide.y, y1 - polygonPoints[k].y)
        const t = -scalarNormWithVectorP1A1 / scalarPwithNorm
        if (!scalarPwithNorm && scalarNormWithVectorP1A1 >= 0) {
            //отрезок параллелен грани
            //отрезок параллелен грани и находится за пределами
            isParallel.check = true;
            continue;
        }
        if (t == -0) {
            T.push(0)
            continue
        }
        if (checkT(T, t)) {
            continue
        }
        if (scalarPwithNorm > 0) {
            TOutput.push(t)
        }
        if (scalarPwithNorm < 0) {
            TInput.push(t)
        }
    }
}

function multipleScalar(x1, x2, y1, y2) {
    return x1 * x2 + y1 * y2
}

function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}



export function drawCyrusBack() {
    const {x1, y1, x2, y2} = getPointsLine()
    const polygonPoints = getPolygonPoints()
    const T = []
    const TInput = []
    const TOutput = []
    const vector = {x: x2 - x1, y: y2 - y1 }
    const isParallel = {check: false}
    TOutput.sort(compareNumeric)
    TInput.sort(compareNumeric)
    findT(polygonPoints, vector, T, x1, y1, TInput, TOutput, isParallel)
    drawing(polygonPoints, {x1, y1, x2, y2}, vector, T, TInput, TOutput, isParallel)
}