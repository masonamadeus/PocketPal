const PodCubeLoader = {    // Load module classes first    
    moduleScripts: [
        'scripts/PodCubeMSG.js',          // Base messaging system
        'scripts/PodCube_Episode.js',      // Load Episode class first
        'scripts/PodCube_Feed.js',         // Load Feed class before parsers
        'scripts/PodCubeJSON.js',          // JSON feed parser
        'scripts/PodCubeRSS.js',           // RSS feed parser
        'scripts/PodCubeAudioPlayer.js',   // Audio player
        'scripts/PodCubeBehaviorDispenser.js', // UI behaviors
        'scripts/PodCubeContextManager.js', // Navigation contexts
        'scripts/PodCubeScreenManager.js',  // Screen management
        'scripts/PodCube_MemoryCartridge.js', // Persistent storage
    ],

    // Manager and screens load after modules
    screenScripts: [
        'scripts/PodCube_Manager.js',      // Core manager (creates global instance)
        'scripts/PodCube_Screen.js',       // Base screen class
        'scripts/screens/SC_TRANSMISSIONS.js',
        'scripts/screens/SC_QUEUE.js',
        'scripts/screens/SC_MAIN.js',
    ],

    fontFaces: [
        'Do Hyeon',
        'Rubik 80s Fade',
        'Share Tech Mono',
        'Share Tech',
        'Convection',
        'Libre Barcode 39',
        'Linear Beam',
        'Sixtyfour:BLED,SCAN@13,-7',
    ],

    loadScript: function(scriptPath) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = scriptPath;
            script.onload = () => {
                console.log(`Loaded: ${scriptPath}`);
                resolve();
            };
            script.onerror = () => reject(`Failed to load: ${scriptPath}`);
            document.head.appendChild(script);
        });
    },

    loadScriptsInOrder: async function(scripts) {
        for (const script of scripts) {
            await this.loadScript(script);
        }
    },

    init: async function() {
        try {
            // Load module classes first
            console.log("Loading modules...");
            await this.loadScriptsInOrder(this.moduleScripts);
            
            // Load manager and screens
            console.log("Loading manager and screens...");
            await this.loadScriptsInOrder(this.screenScripts);
            
            // Initialize PodCube (but it will wait for Animate)
            console.log("Creating PodCube instance...");
            new PodCube_Manager();
            
            // Signal core scripts are ready
            console.log("Core initialization complete");
            
        } catch (error) {
            console.error("Script loading failed:", error);
        }
    },

    loadFonts: function() {
        const preconnectGoogleApis = document.createElement('link');
        preconnectGoogleApis.rel = 'preconnect';
        preconnectGoogleApis.href = 'https://fonts.googleapis.com';
        document.head.appendChild(preconnectGoogleApis);

        const preconnectGstatic = document.createElement('link');
        preconnectGstatic.rel = 'preconnect';
        preconnectGstatic.href = 'https://fonts.gstatic.com';
        preconnectGstatic.crossOrigin = 'anonymous';
        document.head.appendChild(preconnectGstatic);

        const fontQuery = this.fontFaces.map(font => font.replace(/ /g, '+')).join('&family=');
        const fontUrl = `https://fonts.googleapis.com/css2?family=${fontQuery}&display=swap`;

        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = fontUrl;
        document.head.appendChild(linkElement);
        console.log(`Font linked: ${fontUrl}`);
    },
};

// Start loading everything
document.addEventListener('DOMContentLoaded', () => {
    PodCubeLoader.loadFonts();
    PodCubeLoader.init();
});