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
        this.screenHistory = [];           // Track screen history
        this.needsInitialization = true;   // Flag for lazy initialization
        this.navigationQueue = [];         // Queue for navigation requests before initialization

        //subscribe to 'navigate-screen' event
        PodCube.MSG.subscribe("Navigate-Screen", (event) => {
            this.loadScreen(event.linkageName, event.extraData);
        })

        // initialize on ready-animate event
        PodCube.MSG.subscribe("Ready-Animate", () => {
            this.init();
        });
    }    
    
    
    /**
     * Initialize the screen manager container from Adobe Animate stage
     * This connects our JavaScript manager to the visual stage hierarchy
     */
    init() {
        // Only initialize once
        if (!this.needsInitialization) {
            return;
        }

            this._scManager = exportRoot.region_1.screenManager;
            this.needsInitialization = false;

            // Publish initialization complete event
            PodCube.MSG.publish('ScreenManager-Ready', {
                timestamp: Date.now()
            });

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
     * Main screen loading function
     * Handles the entire process of switching from one screen to another
     * 
     * @param {string} linkageName - The Adobe Animate linkage name of the screen to load
     */
    loadScreen(linkageName) {

        // Verify we have our stage container
        if (!this._scManager) {
            console.error("ScreenManager: _scManager is not initialized.");
            return;
        }

        // Never navigate to the same screen
        if (this.currentScreenInstance?.linkageName === linkageName) {
            console.log(`ScreenManager: Already on screen ${linkageName}`);
            return;
        }

        // Update history
        if(this.currentScreenInstance) {
            this.screenHistory.push(this.currentScreenInstance);
        }

        // Unload current screen
        this.unloadCurrentScreen();

        // First try to get a cached instance of the screen
        let screen = this.screenHistory[linkageName];

        // If not cached, create a new instance
        if (!screen) {
            screen = this.createScreen(linkageName);
            // Exit if screen creation failed
            if (!screen) {
                console.error(`ScreenManager: Failed to create screen ${linkageName}`);
                return;
            }
        }

        // Update our current screen reference
        this.currentScreenInstance = screen;

        // Add to the CreateJS display list
        this._scManager.addChild(screen);

        // Call the screen's onShow method if it exists
        this.currentScreenInstance.controller.onShow();

        // Trigger a stage update to render changes
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