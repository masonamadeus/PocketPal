import { PodCubeScreen } from "../classes/PodCube_Screen.js";

export class SC_MAIN extends PodCubeScreen {
    constructor(screenSymbol) {
        // call constructor of the parent class
        super(screenSymbol);
    }


    registerContexts() {
        PodCube.ContextManager.define("Main Screen", {
            up: {
                hint: "Upward",
                handler(ctx) {
                    PodCube.log("Up pressed");
                }
            },
            down: {
                hint: "Down",
                handler(ctx) {
                    PodCube.log("Down pressed");
                }
            },
            left: {
                hint: "Left",
                handler(ctx) {
                    PodCube.log("Left pressed");
                }
            },
            right: {
                hint: "Right",
                handler(ctx) {
                    PodCube.log("Right pressed");
                }
            },
            yes: {
                hint: "P Button",
                handler(ctx) {
                    PodCube.log("P Button pressed");
                }
            },
            no: {
                hint: "C Button",
                handler(ctx) {
                    PodCube.log("C Button pressed");
                }
            }
        });
    }

    onInit() {

        // Register navigation contexts
        if (PodCube.ContextManager) {
            this.registerContexts();
            PodCube.ContextManager.switch("Main Screen", this);
        } else {
            PodCube.log("ContextManager not found. Skipping context registration.");
        }


    }


}
