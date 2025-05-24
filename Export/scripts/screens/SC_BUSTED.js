import { PodCubeScreen } from "../classes/PodCube_Screen.js";
export class SC_BUSTED extends PodCubeScreen {
    constructor(symbol) {
        super(symbol)
        symbol.errorText.text = PodCube.errorText;

    }
}