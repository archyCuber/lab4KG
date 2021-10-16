const LEFT_PADDING = 50;
const TOP_PADDING = 50;

export function setDefaultDesk(width, height, stage) {
    for (let i = LEFT_PADDING; i < width; i += 10) {
        stage
            .path()
            .moveTo(i, TOP_PADDING)
            .lineTo(i, height)
            .stroke("#ceced1");
    }
    for (let i = TOP_PADDING; i < height; i += 10) {
        stage
            .path()
            .moveTo(50, i)
            .lineTo(width, i)
            .stroke("#ceced1");
    }

    stage
        .path()
        .moveTo((width + LEFT_PADDING) / 2, TOP_PADDING)
        .lineTo((width + LEFT_PADDING) / 2, height)
        .stroke("red");

    stage
        .path()
        .moveTo(50, (height + TOP_PADDING) / 2)
        .lineTo(width, (height + TOP_PADDING) / 2)
        .stroke("red");
}
