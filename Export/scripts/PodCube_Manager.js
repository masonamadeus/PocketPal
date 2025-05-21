/**
 * PodCube_Manager
 * Core orchestrator for the PodCube application.
 * 
 * Responsibilities:
 * - Initializes and manages all core subsystems
 * - Provides global access to subsystems via window.PodCube
 * - Manages Adobe Animate library integration
 * - Handles feed data and caching
 * 
 * Architecture:
 * - MessageSystem: Event/message bus for system communication
 * - ContextManager: Handles input context and navigation
 * - ScreenManager: Manages screen lifecycle and transitions
 * - AudioPlayer: Handles podcast playback
 * - BehaviorManager: Manages UI component behaviors
 */

import { MessageSystem } from './modules/PodCube_MSG.js';
import { MemoryCartridge } from './modules/PodCube_MemoryCartridge.js';
import { PodCubeJSON } from './modules/PodCube_JSON.js';
import { ContextManager } from './modules/PodCube_ContextManager.js';
import { ScreenManager } from './modules/PodCube_ScreenManager.js';
import { PodCubeAudioPlayer } from './modules/PodCube_AudioPlayer.js';
import { BehaviorManager } from './modules/PodCube_BehaviorManager.js';
import { PodCubeRSS } from './modules/PodCube_RSS.js';


class PodCube_Manager {
    constructor() {
        // System readiness flag
        this._isReady = false;
        this._feed = null; // Placeholder for feed data
        this._feedCache = {}; // Cache for feed data

        // Expose the instance globally - needed for old-school module pattern
        // This must happen first so other modules can access PodCube namespace
        window.PodCube = this;

        // Initialize core subsystems in dependency order:
        this.MSG = new MessageSystem();           // 1. Message bus (needed by everything)
        this.Memory = new MemoryCartridge();      // 2. Persistent storage
        this.json = new PodCubeJSON();           // 3. Data providers
        this.ContextManager = new ContextManager(); // 4. Input handling
        this.ScreenManager = new ScreenManager();   // 5. Screen management
        this.Player = new PodCubeAudioPlayer(); // 6. Audio playback
        this.Behavior = new BehaviorManager();      // 7. UI behaviors        // Create shorthand for debug logging
        this.log = (...args) => this.MSG.debug(...args);

        // Try to load cached feed - MemoryCartridge handles TTL internally
        //this._feed = this.Memory.load('feed');

        if (this._feed) {
            this.MSG.publish('Feed-Ready');
            this.log("PodCube_Manager: Using cached feed");
        } else {
            // Only fetch if cache missing or expired
            this.log("PodCube_Manager: Cache miss or expired, fetching fresh feed");
            this.json.fetchFeed().then(feed => {
                this._feed = feed;
                this.Memory.save('feed', feed); // Uses MemoryCartridge's default 24h TTL
                this.MSG.publish('Feed-Ready');
                this.log("PodCube_Manager: Fetched and cached fresh feed");
            });
        }

        // Wait for Adobe Animate to initialize
        // This ensures all CreateJS symbols are ready before we start
        this.MSG.subscribe("Ready-Animate", this._handleAnimateReady.bind(this));
    }

    // Method to get the feed data
    get Feed() {
        return this._feed;
    }

    _handleAnimateReady() {
        // Get reference to Adobe Animate library
        // This contains all exported symbols (screens, UI components, etc.)
        this.lib = AdobeAn.getComposition(AdobeAn.bootcompsLoaded[0]).getLibrary();

        // pass references directly to the text fields of each context hint, to the contextmanager
        this.ContextManager.upHint = exportRoot.region_2.upHint.label;
        this.ContextManager.downHint = exportRoot.region_2.downHint.label;
        this.ContextManager.leftHint = exportRoot.region_2.leftHint.label;
        this.ContextManager.rightHint = exportRoot.region_2.rightHint.label;
        this.ContextManager.yesHint = exportRoot.region_3.yesHint.label;
        this.ContextManager.noHint = exportRoot.region_3.noHint.label;
        this.MSG.publish('Navigate-Screen', { linkageName: 'SC_MAIN' }); // Start at main screen

        // Mark system as ready for operation
        this._isReady = true;
    }


}

export { PodCube_Manager as PodCube };

// Initialize the PodCube manager instance
const PodCube = new PodCube_Manager();

