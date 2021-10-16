import {setDefaultDesk} from "./initDesk";
import './root.css'
import './styled/deskContainer.css'
import './styled/importArea.css'
import {drawCyrusBack} from "./alghoritms/CyrusBack";
import {sazer} from "./alghoritms/Sazer";
import {middlePoint} from "./alghoritms/MiddlePoint";

export let centerX, centerY;
export const LEFT_PADDING = 50;
export const TOP_PADDING = 50;
export const STAGE_WIDTH = 800 + LEFT_PADDING;
export const STAGE_HEIGHT = 500 + TOP_PADDING;
export const stage = acgraph.create("stage-container");
window.onload = function() {
    centerX = (STAGE_WIDTH + LEFT_PADDING) / 2;
    centerY = (STAGE_HEIGHT + TOP_PADDING) / 2;
    stage.rect(
        LEFT_PADDING,
        TOP_PADDING,
        STAGE_WIDTH - LEFT_PADDING,
        STAGE_HEIGHT - TOP_PADDING
    );
    setDefaultDesk(STAGE_WIDTH, STAGE_HEIGHT, stage);
};

const btn = document.getElementsByName('cyrus')[0]
btn.addEventListener('click', drawCyrusBack)

const btnSazer = document.getElementsByName('sazer')[0]
btnSazer.addEventListener('click', sazer)

const btnMiddle = document.getElementsByName('middle')[0]
btnMiddle.addEventListener('click', middlePoint)