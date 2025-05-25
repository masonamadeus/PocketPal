import { PodCubeScreen } from "../classes/PodCube_Screen.js";
export class SC_BUSTED extends PodCubeScreen {
    constructor(symbol) {
        super(symbol)
        symbol.errorText.text = PodCube.errorText;
        this.defineContext("SC_BUSTED", {
            up: "oops", handler(ctx){PodCube.RESET();},
            down: "uh-oh", handler(ctx){PodCube.RESET();},
            left: "whoops", handler(ctx){PodCube.RESET();},
            right: "yikes", handler(ctx){PodCube.RESET();}

        })
        this.switchContext("SC_BUSTED");

    }
}