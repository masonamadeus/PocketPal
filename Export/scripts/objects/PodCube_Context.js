export class PodCubeContext {
    constructor(name, config = {}) {
        this.name = name;
        this.handlers = {};
        this.hints = {};

        for (const action of PodCube.ContextManager.ACTIONS) {
            const entry = config[action];
            if (!entry) continue;

            if (typeof entry.handler === 'function') {
                this.handlers[action] = entry.handler;
                if (typeof entry.hint === 'string') {
                    this.hints[action] = entry.hint;
                }
            } else {
                console.warn(`[Context] Invalid handler for action "${action}" in context "${name}"`);
            }
        }

        this.setup = typeof config.setup === 'function' ? config.setup : null;
    }

    getHandler(action) {
        return this.handlers[action] || null;
    }

    getHint(action) {
        return this.hints[action] || null;
    }
}

