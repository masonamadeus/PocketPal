class SC_MAIN extends PodCubeScreen {
    constructor() {
        super();
        this.episodeSymbols = [];
        this.selectedIndex = 0;
        this.scrollContainer = new createjs.Container();
        this.scrollContainer.x = 0;
        this.scrollContainer.y = 0;
        this.addChild(this.scrollContainer);
    }

    init() {
        // Prevent multiple initializations
        if (this.initialized) {
            console.warn("SC_MAIN: Already initialized. Skipping re-initialization.");
            return;
        }
        this.initialized = true;

        // Register navigation contexts
        if (window.PodCube.ContextManager) {
            this.registerContexts();
        }

        // Create scroll container and mask
        const mask = new createjs.Shape();
        mask.graphics.beginFill("#000").drawRect(0, 0, this.nominalBounds.width, this.nominalBounds.height);
        this.scrollContainer.mask = mask;

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
}