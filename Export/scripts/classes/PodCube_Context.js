/**
 * Represents a context with handlers and hints for various actions.
 * @class Context
 */

export class Context {
    /**
     * Creates an instance of Context.
     * @param {Object} [config={}] - Configuration object for the context.
     * @param {string} [config.name='default'] - Name of the context.
     * @param {Object} [config.handlers={}] - Handlers for various actions.
     * @param {Object} [config.hints={}] - Hints for various actions.
     */
    constructor(config = {}) {
        this.name = config.name || 'default';
        this.handlers = {};
        this.hints = {};

        for (const action of PodCube.ContextManager.actions) {
            const entry = config.handlers[action];
            if (!entry) continue;

            if (typeof entry.handler === 'function') {
                this.handlers[action] = entry.handler;
                if (typeof entry.hint === 'string') {
                    this.hints[action] = entry.hint;
                }
            } else {
                console.warn(`[Context] Invalid handler for action "${action}" in context "${config.name}"`);
            }
        }

        this.setup = typeof config.setup === 'function' ? config.setup : null;
    }

    /**
     * Gets the handler for a specific action.
     * @param {string} action - The action to get the handler for.
     * @returns {Function|null} The handler function or null if not found.
     */
    getHandler(action) {
        return this.handlers[action] || null;
    }

    /**
     * Gets the hint for a specific action.
     * @param {string} action - The action to get the hint for.
     * @returns {string|null} The hint string or null if not found.
     */
    getHint(action) {
        return this.hints[action] || null;
    }
}

