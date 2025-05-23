export class ContextManager {

    /**
     * Creates an instance of ContextManager.
     */
    constructor() {        
        this.actions = ['up', 'down', 'left', 'right', 'yes', 'no',];
        this._current = null;
        PodCube.MSG.subscribe("Ready-Animate", () => {
            this.mapHintSymbols();
            this.homeHint.text = "Home";
            this.transHint.text = "Transmissions";
            PodCube.MSG.subscribe("Pressed-BTN_MAIN", () => {
                PodCube.ScreenManager.loadScreen("SC_MAIN");
            })
        })

        // Subscribe to navigation events
        this.actions.forEach(action => {

            PodCube.MSG.subscribe(`Pressed-BTN_${action.toUpperCase()}`, 
                () => this.handleNav(action));
        });

    }

    /**
     * Maps hint symbols to the corresponding context hints.
     */
    mapHintSymbols() {
        // pass references directly to the text fields of each context hint, to the contextmanager
        this.upHint = exportRoot.region_2.upHint.label;
        this.downHint = exportRoot.region_2.downHint.label;
        this.leftHint = exportRoot.region_2.leftHint.label;
        this.rightHint = exportRoot.region_2.rightHint.label;
        this.yesHint = exportRoot.region_3.yesHint.label;
        this.noHint = exportRoot.region_3.noHint.label;
        this.transHint = exportRoot.region_3.transHint.label;
        this.homeHint = exportRoot.region_3.homeHint.label;
    }

    /**
     * Sets the current context.
     * @param {Context} context - The context to set as the current context.
     */
    setContext(context) {

        // if context is the podcube class, set the context to the current context
        if (context instanceof PodCube.Class.Context) {

            
            this._current = context;
            
            // Run setup function if provided
            if (context.setup) context.setup();
            
            this.updateContextHints();

            PodCube.MSG.publish("Context-Changed", context);

        } else {
            console.warn(`ContextManager: Context "${context}" not the right class.`);
        }
    }        
    
    /**
     * Updates the hints for the current context.
     */
    updateContextHints() {

        // If no context is set, do nothing
        if (!this._current) return;

        // Get the current context
        const context = this._current;

        // If no context is set, do nothing
        if (!context) return;

        // Update each hint if there's hint text
        PodCube.ContextManager.actions.forEach(action => {
            if (context.hints[action]) {
                // Get corresponding hint symbol for this action
                const hintSymbol = this[`${action}Hint`];
                if (hintSymbol) {
                    hintSymbol.text = context.hints[action];
                }
            }
        });
    }

    /**
     * Gets the current context.
     * @returns {Context|null} The current context or null if not set.
     */
    getCurrentContext() {
        return this._current;
    }
    
    /**
     * Handles navigation actions.
     * @param {string} action - The action to handle.
     */
    handleNav(action) {
        if (!this._current) {
            PodCube.log("[ContextManager] No context set.");
            return;
        }

        // Check if the action is valid
        if (!this.actions.includes(action)) {
            PodCube.log(`[ContextManager] Invalid action "${action}"`);
            return;
        }

        // Check if the current context has a handler for the action
        if (!this._current.handlers[action]) {
            PodCube.log(`[ContextManager] No handler for action "${action}" in context "${this._current.name}"`);
            return;
        }

        // Call the handler for the action
        const handler = this._current.handlers[action];
        handler();
        
    }
}


