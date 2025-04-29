const SC_TRANSMISSIONS = {
    episodeSymbols: [],
    selectedIndex: 0,
    listView: null,
    scrollContainer: null,
    detailsSelectedIndex: 0,
    initialized: false,

    init: function (screenInstance) {
        if (this.initialized) {
            console.warn("SC_TRANSMISSIONS: Already initialized. Skipping re-initialization.");
            return;
        }
        this.initialized = true;

        this.listView = screenInstance.LISTVIEW;
        if (!this.listView) {
            console.error("SC_TRANSMISSIONS: LISTVIEW instance not found.");
            return;
        }

        // Register navigation contexts
        if (window.ContextManager) {

            // LIST VIEW
            ContextManager.registerContext("transmissions-list", {
                up: () => {
                    if (this.selectedIndex > 0) this.updateSelection(this.selectedIndex - 1);
                },
                down: () => {
                    if (this.selectedIndex < this.episodeSymbols.length - 1) this.updateSelection(this.selectedIndex + 1);
                },
                right: () => {
                    const selectedSymbol = this.episodeSymbols[this.selectedIndex];
                    if (!selectedSymbol) return;
                    selectedSymbol.gotoAndStop("details");
                    this.scrollToTop(selectedSymbol);
                    this.scrollContainer.setChildIndex(selectedSymbol, this.scrollContainer.numChildren - 1);
                    ContextManager.setContext("transmissions-details");
                    this.detailsSelectedIndex = 0;
                    this.highlightDetailsField();
                },
                left: () => {
                    ScreenManager.goBack();
                },
                yes: () => {
                    const selectedSymbol = this.episodeSymbols[this.selectedIndex];
                    if (!selectedSymbol) return;
                    PodCubePlayer.addToQueue(selectedSymbol.episode);
                    console.log("SC_TRANSMISSIONS: Added to queue:", selectedSymbol.episode.title);
                }
            });

            //DETAILS VIEW
            ContextManager.registerContext("transmissions-details", {
                up: () => this.navigateDetails(-1),
                down: () => this.navigateDetails(1),
                left: () => {
                    const selectedSymbol = this.episodeSymbols[this.selectedIndex];
                    if (!selectedSymbol) return;
                    selectedSymbol.gotoAndStop("list-selected");
                    this.adjustScroll();
                    this.clearDetailsHighlight();
                    ContextManager.setContext("transmissions-list");
                }
            });
        }

        // Create scroll container and mask
        this.scrollContainer = new createjs.Container();
        this.listView.addChild(this.scrollContainer);

        const mask = new createjs.Shape();
        mask.graphics.beginFill("#000").drawRect(0, 0, this.listView.nominalBounds.width, this.listView.nominalBounds.height);
        this.scrollContainer.mask = mask;

        // Listen for feedReady and populate episodes when ready
        MSG.subscribe("feedReady", () => {
            this.populateEpisodes();
        });

        PodCubeRSS.getFeed();
    },

    populateEpisodes: function () {
        // Clear previous symbols if any
        this.scrollContainer.removeAllChildren();
        this.episodeSymbols = [];

        const padding = 120;
        let yOffset = 0;

        PodCubeRSS.Transmissions.forEach((episode, index) => {
            const episodeSymbol = new lib._EPISODE();
            episodeSymbol.episode = episode;

            // Set episode symbol's properties based on episode data
            Episode.propertyList.forEach(prop => {
                if (episodeSymbol[prop] && episode[prop] !== undefined) {
                    if (Array.isArray(episode[prop])) {
                        episodeSymbol[prop].text = episode[prop].join(", ");
                    } else if (typeof episode[prop] === "string" || typeof episode[prop] === "number") {
                        episodeSymbol[prop].text = episode[prop];
                    }
                }
            });

            // Special handling for date
            if (episodeSymbol.date && episode.date instanceof Date) {
                episodeSymbol.date.text = episode.date.toLocaleDateString();
            }
            // Special handling for integrity
            if (episodeSymbol.integrity && typeof episode.integrity === "number") {
                episodeSymbol.integrity.text = `${episode.integrity}%`;
            }
            // Special handling for longDate
            if (episodeSymbol.longDate && episode.date instanceof Date) {
                episodeSymbol.longDate.text = episode.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                });
            }

            episodeSymbol.gotoAndStop("list-unselected");
            episodeSymbol.y = yOffset;
            yOffset += padding;

            // Click handler for playing the episode
            episodeSymbol.on("click", () => {
                PodCubePlayer.addToQueue(episode);
                console.log("SC_TRANSMISSIONS: Added to queue:", episode.title);
            });

            this.episodeSymbols.push(episodeSymbol);
            this.scrollContainer.addChild(episodeSymbol);
        });

        this.updateSelection(0);

        // Set initial context after population
        if (window.ContextManager) {
            ContextManager.setContext("transmissions-list");
        }

        stage.update();
        MSG.publish("Transmissions-Ready", this.episodeSymbols);
        console.log("SC_TRANSMISSIONS: Transmissions list initialized.");
    },

    scrollToTop: function (selectedSymbol) {
        const targetY = selectedSymbol.y;
        createjs.Tween.get(this.scrollContainer)
            .to({ y: -targetY }, 300, createjs.Ease.quadOut);
    },

    updateSelection: function (newIndex) {
        if (this.episodeSymbols[this.selectedIndex]) {
            this.episodeSymbols[this.selectedIndex].gotoAndStop("list-unselected");
        }
        this.selectedIndex = newIndex;
        if (this.episodeSymbols[this.selectedIndex]) {
            this.episodeSymbols[this.selectedIndex].gotoAndStop("list-selected");
        }
        this.adjustScroll();
    },

    adjustScroll: function () {
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
    },

    navigateDetails: function (direction) {
        const selectedSymbol = this.episodeSymbols[this.selectedIndex];
        if (!selectedSymbol) return;

        const detailsFields = [
            selectedSymbol.model, selectedSymbol.integrity, selectedSymbol.locale,
            selectedSymbol.region, selectedSymbol.zone, selectedSymbol.planet,
            selectedSymbol.tags, selectedSymbol.longDate
        ];

        // Remove highlight from previous
        if (detailsFields[this.detailsSelectedIndex]) {
            detailsFields[this.detailsSelectedIndex].alpha = 0.5;
        }

        this.detailsSelectedIndex += direction;
        this.detailsSelectedIndex = Math.max(0, Math.min(this.detailsSelectedIndex, detailsFields.length - 1));

        // Highlight new
        this.highlightDetailsField();
    },

    highlightDetailsField: function () {
        const selectedSymbol = this.episodeSymbols[this.selectedIndex];
        if (!selectedSymbol) return;
        const detailsFields = [
            selectedSymbol.model, selectedSymbol.integrity, selectedSymbol.locale,
            selectedSymbol.region, selectedSymbol.zone, selectedSymbol.planet,
            selectedSymbol.tags, selectedSymbol.longDate
        ];
        detailsFields.forEach((field, idx) => {
            if (field) field.alpha = (idx === this.detailsSelectedIndex) ? 1 : 0.5;
        });
    },

    clearDetailsHighlight: function () {
        const selectedSymbol = this.episodeSymbols[this.selectedIndex];
        if (!selectedSymbol) return;
        const detailsFields = [
            selectedSymbol.model, selectedSymbol.integrity, selectedSymbol.locale,
            selectedSymbol.region, selectedSymbol.zone, selectedSymbol.planet,
            selectedSymbol.tags, selectedSymbol.longDate
        ];
        detailsFields.forEach(field => {
            if (field) field.alpha = 1;
        });
    },
};

MSG.subscribe("Loaded-Screen", (e) => {
    if (e.name === "SC_TRANSMISSIONS") {
        SC_TRANSMISSIONS.init(e.instance);
    }
}, false);