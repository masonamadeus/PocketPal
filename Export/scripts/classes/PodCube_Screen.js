export class PodCubeScreen {
    constructor(screenInstance) {
        if (this.constructor === PodCube.PodCubeScreen) {
            throw new Error('PodCubeScreen is an abstract class and cannot be instantiated directly');
        }

        this.symbol = screenInstance;
        this.contexts = {};
        
    }

    init() {
        if (this.initialized) {
            console.warn(`${this.constructor.name}: Already initialized. Skipping re-initialization.`);
            return;
        }
        this.initialized = true;

        this.currentContext = PodCube.MSG.createObservable(null);
        console.log('init called in parent screen class')
        this.onInit();
    }

    // Override these methods in your screen classes
    onInit() {

    }

    onShow() {

    }

    destroy() {
    }

    handleInput(action) {
        const ctx = this.currentContext.get();
        const handler = ctx[action].handler;
        if (handler) handler.call(this);
    }

    defineContext(name, actions) {
        this.contexts[name] = actions;
    }

    /*
    * context[name].up
    */

    switchContext(name) {
        this.currentContext.set(this.contexts[name]);
    }

    // Utility method to find a child by name in the screen instance
    getChild(name) {
        return this.screenInstance[name] || null;
    }
};
