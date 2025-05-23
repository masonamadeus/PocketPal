import { PodCubeScreen } from "../classes/PodCube_Screen.js";

export class SC_MAIN extends PodCubeScreen {
    constructor(screenSymbol) {
        // call constructor of the parent class
        super(screenSymbol);
        // call init of parent class, which will call onInit
        this.init();
    }


    registerContexts() {
        const mainScreenContext = new PodCube.Class.Context({
            name: "main-screen",
            handlers: {
                up: {
                    handler: () => {
                        this.handleUp();
                    },
                    hint: "Upward"
                },
                down: {
                    handler: () => {
                        this.handleDown();
                    },
                    hint: "Down"
                },
                left: {
                    handler: () => {
                        this.handleLeft();
                    },
                    hint: "Left"
                },
                right: {
                    handler: () => {
                        this.handleRight();
                    },
                    hint: "Right"
                },
                yes: {
                    handler: () => {
                        this.handleYes();
                    },
                    hint: "P Button"
                }
                ,
                no: {
                    handler: () => {
                        this.handleNo();
                    },
                    hint: "C Button"
                },
            }
        });
        PodCube.ContextManager.setContext(mainScreenContext);
    }

    onInit() {

        // Register navigation contexts
        if (PodCube.ContextManager) {
            this.registerContexts();
        } else {
            PodCube.log("ContextManager not found. Skipping context registration.");
        }


    }


}
