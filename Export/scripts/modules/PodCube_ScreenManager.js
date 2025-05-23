/**
 * ScreenManager.js
 * Handles the lifecycle and navigation of screens in the PodCube application.
 * 
 * This manager:
 * - Creates and caches screen instances
 * - Handles screen navigation and history
 * - Manages screen controllers
 * - Coordinates with Adobe Animate/CreateJS stage
 */

import * as ScreenList from '../screens/ScreenList.js'; // Import all screens

export class ScreenManager {
    /**
     * Initialize the ScreenManager and set up navigation event handlers
     */
    constructor() {

        // Core screen management properties
        this.currentScreenInstance = null;  // Reference to currently displayed screen
        this._scManager = null;            // CreateJS container for screens
        this.screenCache = {};             // Store initialized screens for reuse
        this.screenHistory = [];           // Track navigation history for back button
        this.needsInitialization = true;   // Flag for lazy initialization
        this.navigationQueue = [];         // Queue for navigation requests before initialization

        /**
         * Screen navigation mapping
         * Maps hardware buttons and events to screen names and special actions
         * @private
         * @type {Object.<string, string|Function>}
         */
        this.navigationMap = {
            "Navigate-Screen": (data) => this.handleNavigateScreenEvent(data),
            "Pressed-BTN_TRANSMISSIONS": "SC_TRANSMISSIONS",
            "Pressed-BTN_QUEUE": "SC_QUEUE",
            "Pressed-BTN_HOME": "SC_HOME",
            "Pressed-BTN_SETTINGS": "SC_SETTINGS",
            "Pressed-BTN_BACK": () => this.goBack()
        };

        // Set up all navigation event handlers
        Object.entries(this.navigationMap).forEach(([event, action]) => {
            PodCube.MSG.subscribe(event, (data) => {
                // Queue navigation requests if not initialized
                if (!this._scManager) {
                    if (!this.tryInitialize()) {
                        this.queueNavigationRequest({ action, data });
                        return;
                    }
                }

                // Handle the navigation action
                this.executeNavigationAction(action, data);
            });
        });

    }    /**
     * Initialize the screen manager container from Adobe Animate stage
     * This connects our JavaScript manager to the visual stage hierarchy
     */
    init() {
        // Only initialize once
        if (!this.needsInitialization) {
            return;
        }

        // Look for our container in the Adobe Animate stage structure
        if (exportRoot?.region_1?.screenManager) {
            this._scManager = exportRoot.region_1.screenManager;
            this.needsInitialization = false;

            // Process any queued navigation requests
            while (this.navigationQueue.length > 0) {
                const request = this.navigationQueue.shift();
                console.log('ScreenManager: Processing queued navigation request');
                this.executeNavigationAction(request.action, request.data);
            }

            // Publish initialization complete event
            PodCube.MSG.publish('ScreenManager-Ready', {
                timestamp: Date.now()
            });
        } else {
            console.error("ScreenManager: Failed to initialize _scManager. Ensure exportRoot.region_1.screenManager exists.");
        }
    }

    /**
     * Try to initialize the screen manager
     * @returns {boolean} True if initialization succeeded
     * @private
     */
    tryInitialize() {
        this.init();
        return this._scManager !== null;
    }

    /**
     * Queue a navigation request for later execution
     * @param {Object} request The navigation request
     * @private
     */
    queueNavigationRequest(request) {
        this.navigationQueue.push(request);
        console.log(`ScreenManager: Queued navigation request. Queue size: ${this.navigationQueue.length}`);
    }

    /**
     * Execute a navigation action
     * @param {string|Function} action The action to execute
     * @param {*} data Additional data for the action
     * @private
     */
    executeNavigationAction(action, data) {
        if (typeof action === 'function') {
            action(data);
        } else {
            this.loadScreen(action);
        }
    }

    /**
     * Handle navigation events from the messaging system
     * These usually come from UI interactions or system events
     * 
     * @param {Object} eventData - Navigation event data
     * @param {string} eventData.linkageName - The screen to navigate to
     */
    handleNavigateScreenEvent(eventData) {
        // Queue the request if we're not initialized
        if (!this._scManager) {
            if (!this.tryInitialize()) {
                this.queueNavigationRequest({
                    action: eventData.linkageName,
                    data: eventData
                });
                return;
            }
        }

        // Validate the navigation request
        if (!eventData || !eventData.linkageName) {
            console.error("ScreenManager: Invalid navigation event data", eventData);
            return;
        }

        try {
            this.loadScreen(eventData.linkageName);
        } catch (error) {
            console.error("ScreenManager: Error during navigation:", error);
            // Try to recover by going back to the previous screen
            if (this.screenHistory.length > 0) {
                const fallbackScreen = this.screenHistory.pop();
                console.log(`ScreenManager: Attempting fallback to ${fallbackScreen}`);
                this.loadScreen(fallbackScreen);
            }
        }
    }

    /**
   * Creates a new screen instance with its associated controller.
   * 
   * The process:
   * 1. Checks if the symbol exists in the Adobe Animate library
   * 2. Creates the CreateJS/Animate symbol instance
   * 3. Looks for a matching controller class in the PodCube namespace
   * 4. If found, attaches and initializes the controller
   * 
   * @param {string} linkageName - The Adobe Animate linkage name (e.g., "SC_TRANSMISSIONS")
   * @returns {CreateJS.MovieClip|null} The created screen instance or null if creation fails
   */

    createScreen(linkageName) {
        try {
            // First, verify the symbol exists in the Adobe Animate library
            if (!PodCube.lib?.[linkageName]) {
                console.error(`ScreenManager: Screen symbol '${linkageName}' not found in library.`);
                return null;
            }

            // Create the CreateJS/Animate MovieClip instance
            const screenSymbol = new PodCube.lib[linkageName]();
            screenSymbol.linkageName = linkageName;

            // Check if a controller class exists in the PodCube namespace
            if (ScreenList[linkageName]) {
                // Create an instance of the controller
                const controllerClass = ScreenList[linkageName];
                const controllerInstance = new controllerClass(screenSymbol);
               

                // Attach the controller to the screen symbol
                screenSymbol.controller = controllerInstance;

                // Initialize the controller if it has an init method
                if (typeof controllerInstance.init === "function") {
                    controllerInstance.init();
                }
            }

            return screenSymbol;

        } catch (error) {
            console.error(`ScreenManager: Failed to create screen '${linkageName}':`, error);
            return null;
        }
    }  
    
    /**
     * Update the navigation history when switching screens
     * This enables back-button functionality
     * 
     * @param {string} newScreenName - Name of the screen being navigated to
     */
    updateHistory(newScreenName) {
        // Only add to history if we have a current screen
        if (this.currentScreenInstance?.linkageName) {
            this.screenHistory.push(this.currentScreenInstance.linkageName);
        }
    }

    /**
     * Main screen loading function
     * Handles the entire process of switching from one screen to another
     * 
     * @param {string} linkageName - The Adobe Animate linkage name of the screen to load
     */
    loadScreen(linkageName) {
        // Verify we have our stage container
        if (!this._scManager) {
            if (!this.tryInitialize()) {
                this.queueNavigationRequest({
                    action: linkageName,
                    data: null
                });
                console.log(`ScreenManager: Queued direct loadScreen request for ${linkageName}`);
                return;
            }
        }

        // Never navigate to the same screen
        if (this.currentScreenInstance?.linkageName === linkageName) {
            console.log(`ScreenManager: Already on screen ${linkageName}`);
            return;
        }

        // Update history and unload current screen
        this.updateHistory(linkageName);

        this.unloadCurrentScreen();       
        // First try to get a cached instance of the screen
        // This improves performance and maintains screen state
        let screen = this.screenCache[linkageName];

        // If not cached, create a new instance
        if (!screen) {
            screen = this.createScreen(linkageName);
            // Exit if screen creation failed
            if (!screen) {
                console.error(`ScreenManager: Failed to create screen ${linkageName}`);
                return;
            }
            // Cache the new screen for future use
            this.screenCache[linkageName] = screen;
        }

        // Display the screen in three steps:
        // 1. Update our current screen reference
        this.currentScreenInstance = screen;
        // 2. Add to the CreateJS display list
        this._scManager.addChild(screen);
        // 3. Trigger a stage update to render changes
        stage.update();

        // Broadcast that screen is loaded and ready
        // This lets other systems react to screen changes
        PodCube.MSG.publish("Loaded-Screen", {
            name: linkageName,    // Screen identifier
            instance: screen      // Reference to actual screen
        });
    }    
    
    /**
     * Navigate to the previous screen in history
     * This is typically triggered by the back button
     */
    goBack() {
        // Check if we have any history to go back to
        if (this.screenHistory.length === 0) {
            console.warn("ScreenManager: No previous screen in history.");
            return;
        }

        // Pop the last screen from history and navigate to it
        const previousLinkageName = this.screenHistory.pop();
        if (previousLinkageName) {
            this.loadScreen(previousLinkageName);
        }
    }

    /**
     * Clean up and remove the current screen
     * This handles both visual cleanup and controller disposal
     */
    unloadCurrentScreen() {
        // Check if we actually have a screen to unload
        if (!this.currentScreenInstance) {
            console.warn("ScreenManager: No current screen to unload.");
            return;
        }

        try {
            // If screen has a destroy method (from controller), call it
            if (typeof this.currentScreenInstance.destroy === "function") {
                this.currentScreenInstance.destroy();

                // Notify system that screen resources can be cleaned up
                PodCube.MSG.publish("SCREEN_DISPOSED", {
                    screen: this.currentScreenInstance
                });
            }

            // Remove all event listeners
            if (typeof this.currentScreenInstance.removeAllEventListeners === "function") {
                this.currentScreenInstance.removeAllEventListeners();
            }

            // Remove from visual hierarchy and clear reference
            if (this._scManager?.contains(this.currentScreenInstance)) {
                this._scManager.removeChild(this.currentScreenInstance);
            }

            // Clear strong references that might prevent garbage collection
            if (this.currentScreenInstance.controller) {
                this.currentScreenInstance.controller = null;
            }

            this.currentScreenInstance = null;

        } catch (error) {
            console.error("ScreenManager: Error during screen cleanup:", error);
            // Even if cleanup fails, still remove from display list
            try {
                this._scManager?.removeChild(this.currentScreenInstance);
                this.currentScreenInstance = null;
            } catch (e) {
                console.error("ScreenManager: Critical error during cleanup:", e);
            }
        }
    }
}


// Note: Navigation button handlers are registered by PodCube instance