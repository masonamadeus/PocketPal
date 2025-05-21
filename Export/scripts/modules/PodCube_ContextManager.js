export class ContextManager {
    static ACTIONS = ['up', 'down', 'left', 'right', 'yes', 'no'];
    
    constructor() {        this._contexts = {};
        this._current = null;

        this.buttonAliases = {...ContextManager.BUTTON_ALIASES}; // Allow instance overrides
        
        // Subscribe to navigation events
        ContextManager.ACTIONS.forEach(action => {
            PodCube.MSG.subscribe(`Pressed-BTN_${action.toUpperCase()}`, 
                () => this.handleNav(action));
        });

    }

    registerContext(name, config) {
        // Allow array syntax [handler, hint]
        const context = ContextManager.ACTIONS.reduce((acc, action) => {
            const handler = config[action];
            if (Array.isArray(handler)) {
                acc.handlers[action] = handler[0];
                acc.hints[action] = handler[1];
            } else if (typeof handler === 'function') {
                acc.handlers[action] = handler;
            }
            return acc;
        }, { handlers: {}, hints: {} });

        this._contexts[name] = context;
        console.log(`[ContextManager] Registered context: ${name}`);
    }

    setContext(name) {
        const context = this._contexts[name];
        if (context) {
            this._current = name;
            
            // Run setup function if provided
            if (context.setup) context.setup();
            
            this.updateContextHints();
            PodCube.MSG.publish("Context-Changed", name);
        } else {
            console.warn(`ContextManager: Context "${name}" not registered.`);
        }
    }        
    
    updateContextHints() {
        //if (!this._current) return;

        const context = this._contexts[this._current];
        //if (!context) return;

        // Clear all hints first
        this.yesHint.text = "P Button";
        this.noHint.text = "C Button";
        this.leftHint.text = "Left";
        this.rightHint.text = "Right";
        this.upHint.text = "Up";
        this.downHint.text = "Down";

        // Update each hint if there's a handler and hint text
        ContextManager.ACTIONS.forEach(action => {
            if (context.handlers[action] && context.hints[action]) {
                // Get corresponding hint symbol for this action
                const hintSymbol = this[`${action}Hint`];
                if (hintSymbol) {
                    hintSymbol.text = context.hints[action];
                }
            }
        });
    }

    getCurrentContext() {
        return this._current;
    }    handleNav(action) {
        if (!this._current) {
            console.warn("[ContextManager] No context set.");
            return;
        }
        const ctx = this._contexts[this._current]?.handlers;
        if (ctx && typeof ctx[action] === "function") {
            ctx[action]();
        } else {
            console.warn(`[ContextManager] No handler for action "${action}" in context "${this._current}"`);
        }
    }
}

/*
// Example usage

PodCube.ContextManager.registerContext("transmissions-list", {
    up: [() => this.selectPrevious(), "Previous"],
    down: [() => this.selectNext(), "Next"],
    right: [() => this.showDetails(), "Details"],
    yes: [() => this.addToQueue(), "Queue"]
});

*/
