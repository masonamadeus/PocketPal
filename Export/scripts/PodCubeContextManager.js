class ContextManager {
    static ACTIONS = ['up', 'down', 'left', 'right', 'yes', 'no'];
    static BUTTON_ALIASES = {
        up: '⬆️',
        down: '⬇️',
        left: '⬅️',
        right: '➡️',
        yes: '⭕',
        no: '❌'
    };
    
    
    constructor() {        this._contexts = {};
        this._current = null;
        this.contextHintsSymbol = null;

        this.buttonAliases = {...ContextManager.BUTTON_ALIASES}; // Allow instance overrides
        
        // Subscribe to navigation events
        ContextManager.ACTIONS.forEach(action => {
            PodCube.MSG.subscribe(`Pressed-BTN_${action.toUpperCase()}`, 
                () => this.handleNav(action));
        });

    }

    setButtonAlias(button, alias) {
        if (ContextManager.ACTIONS.includes(button)) {
            this.buttonAliases[button] = alias;
            this.updateContextHints(); // Refresh display if needed
        }
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
    }        updateContextHints() {
        if (!this._current) return;

        const context = this._contexts[this._current];
        if (!context) return;

        // Clear all hints first
        this.yesHintSymbol.text = "";
        this.noHintSymbol.text = "";
        this.leftHintSymbol.text = "";
        this.rightHintSymbol.text = "";

        // Update each hint if there's a handler and hint text
        ContextManager.ACTIONS.forEach(action => {
            if (context.handlers[action] && context.hints[action]) {
                // Get corresponding hint symbol for this action
                const hintSymbol = this[`${action}HintSymbol`];
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