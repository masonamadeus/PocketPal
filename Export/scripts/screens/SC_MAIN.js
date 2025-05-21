import { PodCubeScreen } from "../objects/PodCube_Screen.js";

export class SC_MAIN extends PodCubeScreen {
    constructor(screenSymbol) {
        // call constructor of the parent class
        super(screenSymbol);
        // call init of parent class, which will call onInit
        this.init();
    }

    
    registerContexts() {
        PodCube.ContextManager.registerContext("main-screen", {
            up: () => {
                // Handle up navigation
            },
            down: () => {
                // Handle down navigation
            },
            left: () => {
                // Handle left navigation
            },
            right: () => {
                // Handle right navigation
            },
            yes: () => {
                // Handle yes action
            },
        });
    }

    onInit() {

        // Register navigation contexts
        if (window.PodCube.ContextManager) {
            this.registerContexts();
        } else {
            PodCube.log("ContextManager not found. Skipping context registration.");
        }


    }

   
}
