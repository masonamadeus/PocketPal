import { PodCubeScreen } from "../classes/PodCube_Screen.js";
import { Context } from "../classes/PodCube_Context.js";

export class SC_TRANSMISSIONS extends PodCubeScreen {

    constructor(screenInstance) {
        super(screenInstance);
        // this.screenInstance = screenInstance; (from super)
        this.episodeSymbols = [];
        this.selectedIndex = 0;
        this.listView = null;
        this.scrollContainer = null;
        this.contexts = [] // Store contexts here if needed


    }

    onShow() {
        if (this.currentContext) {
            PodCube.ContextManager.switch(this.currentContext, this);
        }
    }

    onInit() {

        // ATTACH LISTVIEW CONTAINER
        this.listView = this.screenInstance.LISTVIEW;
        if (!this.listView) {
            console.error("SC_TRANSMISSIONS: LISTVIEW instance not found.");
            return;
        }

        // Register navigation contexts
        if (PodCube.ContextManager) {
            this.registerContexts()
            PodCube.log("SC_TRANSMISSIONS: Contexts registered.");
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


        PodCube.ContextManager.define("Transmissions:List", {
            up: {
                hint: "Upward",
                handler(ctx) {
                   ctx.updateSelection((ctx.selectedIndex - 1 + ctx.episodeSymbols.length) % ctx.episodeSymbols.length);
                }
            },
            down: {
                hint: "Down",
                handler(ctx) {
                    ctx.updateSelection((ctx.selectedIndex + 1) % ctx.episodeSymbols.length);
                }
            },
            left: {
                hint: "Back",
                handler(ctx) {
                    PodCube.log("SC_TRANSMISSIONS: Back pressed");
                }
            },
            right: {
                hint: "Details",
                handler(ctx) {
                    ctx.showDetails();
                }
            },
            yes: {
                hint: "Add to Queue",
                handler(ctx) {
                    const episode = ctx.selectedEpisode;
                    if (episode) {
                        PodCube.log("SC_TRANSMISSIONS: Episode added to queue", episode);
                        PodCube.Player.addToQueue(episode)
                    } else {
                        console.warn("SC_TRANSMISSIONS: No episode selected.");
                    }
                }
            },
            no: {
                hint: "Scroll to Top",
                handler(ctx) {
                    ctx.scrollToTop();
                }
            }
            
        });

        PodCube.ContextManager.define("Transmissions:Details", {
            left: {
                hint: "Back",
                handler(ctx) {
                    ctx.showList()
                }
            },
            up: {
                hint: "Error",
                handler(ctx) {
                    ctx.fuckyourmom();
                }
            }

        });

        this.currentContext = "Transmissions:List";

    }


    showDetails() {
        
        this.selectedItem.gotoAndStop("details");
        PodCube.ContextManager.switch("Transmissions:Details", this);
        this.scrollToTop(this.selectedItem);
        this.prevIndex = this.selectedIndex;
        this.scrollContainer.setChildIndex(this.selectedItem, this.scrollContainer.numChildren - 1);
    }

    showList() {
        
        PodCube.ContextManager.switch("Transmissions:List", this);
        if (this.prevIndex) {
            this.scrollContainer.setChildIndex(this.selectedItem, this.prevIndex);
        }
        this.selectedItem.gotoAndStop("list-selected");
        this.scrollSelectionToCenter();
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

        stage.update();

        PodCube.MSG.publish("Transmissions-Ready", this.episodeSymbols);
        PodCube.MSG.log("SC_TRANSMISSIONS: Transmissions are ready and populated.");
    }

    get selectedEpisode() {
        return this.episodeSymbols[this.selectedIndex]?.episode || null;
    }

    get selectedItem() {
        return this.episodeSymbols[this.selectedIndex] || null; 
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
