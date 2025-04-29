// ScreenManager.js - Ultra-Simple, Event-Driven Screen Manager

const ScreenManager = {
    currentScreenInstance: null, // Currently loaded screen instance
    _scManager: null,
    screenCache: {}, // Cache for storing initialized screens
    screenHistory: [], // Stack for screen history

    init: function() {
        MSG.subscribe("Navigate-Screen", this.handleNavigateScreenEvent.bind(this));
        MSG.subscribe("Navigate-Back", this.goBack.bind(this)); // Listen for back navigation
        console.log("ScreenManager: Initialized and listening for 'Navigate-Screen' events.");

        if (exportRoot?.region_1?.screenManager) {
            this._scManager = exportRoot.region_1.screenManager;
        } else {
            console.error("ScreenManager: Failed to initialize _scManager. Ensure exportRoot.region_1.screenManager exists.");
        }
    },

    handleNavigateScreenEvent: function(eventData) {
        if (eventData && eventData.linkageName) {
            this.loadScreen(eventData.linkageName);
        } else {
            console.warn("ScreenManager: 'Navigate-Screen' event missing data.");
        }
    },

    loadScreen: function(linkageName) {
        if (!this._scManager) {
            console.error("ScreenManager: _scManager is not initialized. Cannot load screen.");
            return;
        }

        // UNLOAD CURRENT SCREEN
        if (this.currentScreenInstance) {
            // Push current screen to history before unloading
            if (this.currentScreenInstance.linkageName) {
                this.screenHistory.push(this.currentScreenInstance.linkageName);
            } else if (linkageName !== this.currentScreenInstance.constructor.name) {
                // fallback if linkageName property is not set
                this.screenHistory.push(this.currentScreenInstance.constructor.name);
            }
            this.unloadCurrentScreen();
        }

        // Check if the NEW screen is already cached
        if (this.screenCache[linkageName]) {
            this.currentScreenInstance = this.screenCache[linkageName];
            console.log(`ScreenManager: Reusing cached screen '${linkageName}'.`);
        } else {
            const newScreen = new lib[linkageName]();
            // Attach linkageName for history tracking
            newScreen.linkageName = linkageName;
            this.screenCache[linkageName] = newScreen; // Cache the screen
            this.currentScreenInstance = newScreen;
            console.log(`ScreenManager: Created and cached new screen '${linkageName}'.`);
        }

        this._scManager.addChild(this.currentScreenInstance);
        stage.update();

        MSG.publish("Loaded-Screen", { name: linkageName, instance: this.currentScreenInstance });
    },

    goBack: function() {
        if (this.screenHistory.length === 0) {
            console.warn("ScreenManager: No previous screen in history.");
            return;
        }
        const previousLinkageName = this.screenHistory.pop();
        if (previousLinkageName) {
            this.loadScreen(previousLinkageName);
        }
    },

    unloadCurrentScreen: function() {
        if (!this.currentScreenInstance) {
            console.warn("ScreenManager: No current screen to unload.");
            return;
        }

        if (typeof this.currentScreenInstance.destroy === "function") {
            this.currentScreenInstance.destroy();
            MSG.publish("SCREEN_DISPOSED", { screen: this.currentScreenInstance });
        }

        this._scManager.removeChild(this.currentScreenInstance);
        this.currentScreenInstance = null;

        console.log("ScreenManager: Current screen unloaded.");
    }
};

ScreenManager.init();

// Wrap MSG.publish in a function to prevent immediate execution
MSG.subscribe("Pressed-BTN_HOME", () => {
    MSG.publish("Navigate-Screen", { linkageName: "SC_MAIN" });
});

MSG.subscribe("Pressed-BTN_TRANSMISSIONS", () => {
    MSG.publish("Navigate-Screen", { linkageName: "SC_TRANSMISSIONS" });
});

MSG.subscribe("Pressed-BTN_QUEUE", () => {
    MSG.publish("Navigate-Screen", { linkageName: "SC_QUEUE" });
});

// Example: Subscribe a button to go back
// MSG.subscribe("Pressed-BTN_BACK", () => {
//     MSG.publish("Navigate-Back");
// });

console.log("ScreenManager: Object defined and initialized.");