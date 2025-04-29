const PodCubeLoader = {

    immediateScripts: [
        'scripts/PodCubeMSG.js',
        'scripts/PodCubeBehaviorDispenser.js'
    ],

    deferredScripts: [
        'scripts/PodCubeContextManager.js',
        'scripts/PodCubeRSS.js',
        'scripts/PodCubeScreenManager.js',
        'scripts/PodCubeAudioPlayer.js',
        'scripts/SC_TRANSMISSIONS.js',
        'scripts/SC_QUEUE.js',
    ],

    fontFaces: [
        'Do Hyeon',
        'Rubik 80s Fade',
        'Share Tech Mono',
        'Share Tech',
        'Convection'
    ],

    loadScript: function(scriptPath, onSuccess, onError) { // Added onSuccess and onError callbacks
        const scriptElement = document.createElement('script');
        scriptElement.src = scriptPath;

        scriptElement.onload = () => {
            console.log(`Script loaded: ${scriptPath}`);
            if (onSuccess) {
                onSuccess(); // Execute the success callback if provided
            }
        };

        scriptElement.onerror = () => {
            console.error(`Error loading script: ${scriptPath}`);
            if (onError) {
                onError(); // Execute the error callback if provided
            }
        };

        document.head.appendChild(scriptElement);
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

    loadImmediate: function() {
        let scriptsLoadedCount = 0;
        const totalScripts = this.immediateScripts.length;

        this.immediateScripts.forEach(scriptPath => {
            this.loadScript(
                scriptPath,
                () => { // onSuccess callback for loadScript
                    scriptsLoadedCount++;
                    if (scriptsLoadedCount === totalScripts) {
                        console.log("Immediate Scripts Loaded");
                        this.loadFonts(); // Load fonts immediately after immediate scripts
                        MSG.subscribe("Ready-Animate", this.loadDeferred.bind(this));
                    }
                },
                () => { // onError callback for loadScript
                    scriptsLoadedCount++;
                    if (scriptsLoadedCount === totalScripts) {
                        console.log("Script loading finished (with errors)");
                        this.loadFonts(); // Load fonts even if there are errors
                        MSG.subscribe("Ready-Animate", this.loadDeferred.bind(this));
                    }
                }
            );
        });
    },

    loadDeferred: function () {
        let scriptsLoadedCount = 0;
        const totalScripts = this.deferredScripts.length;

        // PUSH LIB TO GLOBAL FOR EASIER INSTANTIATION
        window.lib = AdobeAn.getComposition(AdobeAn.bootcompsLoaded[0]).getLibrary();

        this.deferredScripts.forEach(scriptPath => {
            this.loadScript(
                scriptPath,
                () => { // onSuccess callback for loadScript
                    scriptsLoadedCount++;
                    if (scriptsLoadedCount === totalScripts) {
                        MSG.publish("Ready-Scripts", "");
                    }
                },
                () => { // onError callback for loadScript
                    scriptsLoadedCount++;
                    if (scriptsLoadedCount === totalScripts) {
                        console.log("Script loading finished (with errors)");
                    }
                }
            );
        });
    },

};

PodCubeLoader.loadImmediate();