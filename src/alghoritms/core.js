import {centerX, centerY, stage} from "../app";

export function drawPolygon(polygonPoints) {
    const a = stage
        .path()
        .moveTo(polygonPoints[0].x + centerX, -polygonPoints[0].y + centerY);

    for (let i = 1; i < polygonPoints.length; i++) {
        a.lineTo(
            polygonPoints[i].x + centerX,
            -polygonPoints[i].y + centerY
        );
    }
    a.lineTo(
        polygonPoints[0].x + centerX,
        -polygonPoints[0].y + centerY
    );
}

export function drawLine(x1, y1, x2, y2) {
    stage.path().moveTo(x1 + centerX, -y1 + centerY)
        .lineTo(x2 + centerX, -y2 + centerY);
}

export function getPolygon(name) {
    const polygon = document.getElementsByName(name)[0].value
    return polygon.replace(/\r?\n/g, "");
}

export function getPointsLine() {
    const x1 = parseInt(document.getElementsByName("x-1")[0].value) * 10;
    const y1 = parseInt(document.getElementsByName("y-1")[0].value) * 10;
    const x2 = parseInt(document.getElementsByName("x-2")[0].value) * 10;
    const y2 = parseInt(document.getElementsByName("y-2")[0].value) * 10;

    return {x1, y1, x2, y2}
}

export function getPolygonPoints() {
    const polygon = getPolygon("polygon")
    const polygonCoords = polygon.split(";");
    let polygonPoints = []
    for (let i = 0; i < polygonCoords.length - 1; i += 2) {
        polygonPoints.push({
            x: parseInt(polygonCoords[i]) * 10,
            y: parseInt(polygonCoords[i + 1]) * 10,
        });
    }
    return polygonPoints
}