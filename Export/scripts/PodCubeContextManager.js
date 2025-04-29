const ContextManager = {
    _contexts: {},
    _current: null,

    registerContext(name, handlers) {
        this._contexts[name] = handlers;
        // Debug: log registration
        console.log(`[ContextManager] Registered context: ${name}`);
    },

    setContext(name) {
        if (this._contexts[name]) {
            this._current = name;
            // Debug: log context switch
            console.log(`[ContextManager] Switched to context: ${name}`);
        } else {
            console.warn(`ContextManager: Context "${name}" not registered.`);
        }
    },

    getCurrentContext() {
        return this._current;
    },

    handleNav(action) {
        if (!this._current) {
            console.warn("[ContextManager] No context set.");
            return;
        }
        const ctx = this._contexts[this._current];
        if (ctx && typeof ctx[action] === "function") {
            ctx[action]();
        } else {
            console.warn(`[ContextManager] No handler for action "${action}" in context "${this._current}"`);
        }
    }
};

// Subscribe to navigation events once, globally
MSG.subscribe("Pressed-BTN_UP", () => ContextManager.handleNav("up"));
MSG.subscribe("Pressed-BTN_DOWN", () => ContextManager.handleNav("down"));
MSG.subscribe("Pressed-BTN_LEFT", () => ContextManager.handleNav("left"));
MSG.subscribe("Pressed-BTN_RIGHT", () => ContextManager.handleNav("right"));
MSG.subscribe("Pressed-BTN_YES", () => ContextManager.handleNav("yes"));
MSG.subscribe("Pressed-BTN_NO", () => ContextManager.handleNav("no"));

// Expose globally
window.ContextManager = ContextManager;
