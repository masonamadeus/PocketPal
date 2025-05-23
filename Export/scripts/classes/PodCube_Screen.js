export class PodCubeScreen {
    constructor(screenInstance) {
        if (this.constructor === PodCube.PodCubeScreen) {
            throw new Error('PodCubeScreen is an abstract class and cannot be instantiated directly');
        }

        this.screenInstance = screenInstance;
    }

    init() {
        if (this.initialized) {
            console.warn(`${this.constructor.name}: Already initialized. Skipping re-initialization.`);
            return;
        }
        this.initialized = true;
        console.log('init called in parent screen class')
        this.onInit();
    }

    // Override these methods in your screen classes
    onInit() {}
    destroy() {

    }

    // Utility method to find a child by name in the screen instance
    getChild(name) {
        return this.screenInstance[name] || null;
    }
};
