class SC_TRANSMISSIONS extends PodCubeScreen {

    constructor(screenInstance) {
        super(screenInstance);
        this.episodeSymbols = [];
        this.selectedIndex = 0;
        this.listView = null;
        this.scrollContainer = null;

        this.init(screenInstance);

    }

    init(screenInstance) {

        // PREVENT MULTIPLE INITIALIZATIONS
        if (this.initialized) {
            console.warn("SC_TRANSMISSIONS: Already initialized. Skipping re-initialization.");
            this.updateSelection(0);
            return;
        }
        this.initialized = true;

        // ATTACH LISTVIEW CONTAINER
        this.listView = screenInstance.LISTVIEW;
        if (!this.listView) {
            console.error("SC_TRANSMISSIONS: LISTVIEW instance not found.");
            return;
        }

        // Register navigation contexts
        if (window.PodCube.ContextManager) {
            this.registerContexts()
        }

        // Create scroll container and mask
        this.scrollContainer = new createjs.Container();
        this.listView.addChild(this.scrollContainer);

        const mask = new createjs.Shape();
        mask.graphics.beginFill("#000").drawRect(0, 0, this.listView.nominalBounds.width, this.listView.nominalBounds.height);
        this.scrollContainer.mask = mask;

        this.populateEpisodes()
    }

    registerContexts() { // LIST VIEW

        PodCube.ContextManager.registerContext("transmissions-list", {
            up: [() => {
                if (this.selectedIndex > 0) this.updateSelection(this.selectedIndex - 1)
                }, "Previous"],
            down: [() => {
                if (this.selectedIndex < this.episodeSymbols.length - 1) this.updateSelection(this.selectedIndex + 1);
                }, "Next"],
            right: [() => {
                const selectedSymbol = this.episodeSymbols[this.selectedIndex];
                if (!selectedSymbol) return;
                selectedSymbol.gotoAndStop("details");
                PodCube.ContextManager.setContext("transmissions-details");
                this.scrollToTop(selectedSymbol);
                this.scrollContainer.setChildIndex(selectedSymbol, this.scrollContainer.numChildren - 1);
            }, "Details"],
            left: [() => {
                ScreenManager.goBack();
            }, "Back"],
            yes: [() => {const selectedSymbol = 
                this.episodeSymbols[this.selectedIndex];
                if (!selectedSymbol) return;
                PodCubePlayer.addToQueue(selectedSymbol.episode);
            }, "Queue"],
            no: [() => this.popOutDataDisk(this.episodeSymbols[this.selectedIndex].episode), "Pop Out"]
        });

        //DETAILS VIEW
        PodCube.ContextManager.registerContext("transmissions-details", {
            up: [() => null],
            down: [() => null],
            left: [() => {
                const selectedSymbol = this.episodeSymbols[this.selectedIndex];
                if (!selectedSymbol) return;
                selectedSymbol.gotoAndStop("list-selected");
                this.scrollSelectionToCenter();
                PodCube.ContextManager.setContext("transmissions-list");
            }, "Back"],
            right: [() => null],
            yes: [() => {
                const selectedSymbol = this.episodeSymbols[this.selectedIndex];
                if (!selectedSymbol) return;
                PodCubePlayer.playEpisode(selectedSymbol.episode);
            }, "Add to Queue"],
            no: [() => null, "Pop Out"]
        });

    }


    populateEpisodes() {
        // Clear previous symbols if any
        this.scrollContainer.removeAllChildren();
        this.episodeSymbols = [];

        if (!PodCube.Feed || !PodCube.Feed.episodes) {
            console.warn("SC_TRANSMISSIONS: Feed not loaded yet");
            return;
        }

        const padding = 120;
        let yOffset = 0;

        PodCube.Feed.episodes.forEach((episode, index) => {
            const episodeSymbol = new PodCube.lib._EPISODE();
            PodCube.Behavior.EpisodeSymbol(episodeSymbol, episode);
            episodeSymbol.gotoAndStop("list-unselected");
            episodeSymbol.y = yOffset;
            yOffset += padding;

            this.episodeSymbols.push(episodeSymbol);
            this.scrollContainer.addChild(episodeSymbol);
        });

        this.updateSelection(0);

        // Set initial context after population
        if (PodCube.ContextManager) {
            PodCube.ContextManager.setContext("transmissions-list");
        } stage.update();

        PodCube.MSG.publish("Transmissions-Ready", this.episodeSymbols);
        PodCube.MSG.log("SC_TRANSMISSIONS: Transmissions are ready and populated.");
    }

    updateSelection(newIndex) {
        if (this.episodeSymbols[this.selectedIndex]) {
            this.episodeSymbols[this.selectedIndex].gotoAndStop("list-unselected");
        }
        this.selectedIndex = newIndex;
        if (this.episodeSymbols[this.selectedIndex]) {
            this.episodeSymbols[this.selectedIndex].gotoAndStop("list-selected");
        }
        this.scrollSelectionToCenter();
    }

    scrollToTop(selectedSymbol = this.episodeSymbols[0]) {
        const targetY = selectedSymbol.y;
        createjs.Tween.get(this.scrollContainer)
            .to({ y: -targetY }, 300, createjs.Ease.quadOut);
    }

    scrollSelectionToCenter() {
        const selectedSymbol = this.episodeSymbols[this.selectedIndex];
        if (!selectedSymbol) return;

        const listViewHeight = this.listView.nominalBounds.height;
        const contentHeight = this.episodeSymbols.reduce((total, symbol) => total + symbol.nominalBounds.height + 10, 0);
        const selectedSymbolCenterY = selectedSymbol.y + selectedSymbol.nominalBounds.height / 2;

        let targetY = selectedSymbolCenterY - listViewHeight * 0.7;
        const maxScrollY = -20;
        const minScrollY = -(contentHeight - listViewHeight);

        targetY = Math.max(Math.min(targetY, -minScrollY), maxScrollY);

        createjs.Tween.get(this.scrollContainer)
            .to({ y: -targetY }, 300, createjs.Ease.quadOut);
    }

    popOutDataDisk(episode) {
        const dataDiskSymbol = new PodCube.lib._DISK_FLYOUT();
        dataDiskSymbol.episode = episode
        exportRoot.addChild(dataDiskSymbol);
        dataDiskSymbol.gotoAndPlay("disk-up");
        dataDiskSymbol.x = stage.canvas.width / 2;
        dataDiskSymbol.y = stage.canvas.height / 2;
        PodCube.MSG.subscribe("Context-Changed", () => {
            if (PodCube.ContextManager.getCurrentContext() !== "transmissions-details") {
                dataDiskSymbol.goingDown = true;
            }
        });
    }

};