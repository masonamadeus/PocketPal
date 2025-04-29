const MSG = {
    _subscriptions: {},
    debugEnabled: true, // Global flag to enable or disable debug messages
    logDefault: true, // Default value for logging

    // Enable debug mode
    enableDebug: function() {
        this.debugEnabled = true;
    },

    // Disable debug mode
    disableDebug: function() {
        this.debugEnabled = false;
    },

    // Debug method
    debug: function(...args) {
        if (!this.debugEnabled) {
            return; // Suppress debug messages if debug mode is disabled
        }
        console.log("[DEBUG]", ...args); // Prefix debug messages with "[DEBUG]"
    },

    subscribe: function(eventType, handler, log = this.logDefault) {
        if (log) {
            console.log("MSG.subscribe: " + eventType.toString());
        }
        if (!this._subscriptions[eventType]) {
            this._subscriptions[eventType] = [];
        }
        this._subscriptions[eventType].push(handler);
    },

    publish: function(eventType, data, log = this.logDefault) {

        if (log) {
            console.log("MSG.publish: " + eventType.toString());
        }
        
        if (!this._subscriptions[eventType]) {
            return;
        }
        this._subscriptions[eventType].forEach(handler => {
            handler(data);
        });
    },

    keyboard: function(e) { //TRANSLATES SOME SPECIAL KEYS
        var k = e.key;
        if (k == " ") {
            k = "space";
        }
        MSG.pub("Keyboard-" + k, e);
    }
};

// ALIASES
MSG.sub = MSG.subscribe;
MSG.pub = MSG.publish;
MSG.log = MSG.debug;

// Add keyboard listener
window.addEventListener("keydown", MSG.keyboard);





