import {centerX, centerY, stage} from "../app";

export function drawLineInPolygon(x1, x2, y1, y2) {
    stage
        .path()
        .moveTo(x1 + centerX, -y1 + centerY)
        .lineTo(x2 + centerX, -y2 + centerY)
        .stroke({ color: "red" });
}