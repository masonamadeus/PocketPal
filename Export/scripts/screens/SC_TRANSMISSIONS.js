import { PodCubeScreen } from "../classes/PodCube_Screen.js";

export class SC_TRANSMISSIONS extends PodCubeScreen {

    constructor(symbol) {
        super(symbol);
        // this.screenInstance = screenInstance; (from super)
        this.episodeSymbols = [];
        this.selectedIndex = 0;
        this.listView = null;
        this.scrollContainer = null;


    }

    onShow() {
        console.log('onshow called for sc_transmissions')
    }

    onInit() {

        // ATTACH LISTVIEW CONTAINER
        this.listView = this.symbol.LISTVIEW;
        if (!this.listView) {
            console.error("SC_TRANSMISSIONS: LISTVIEW instance not found.");
            return;
        }

        // Register navigation contexts

        this.registerContexts()
        PodCube.log("SC_TRANSMISSIONS: Contexts registered.");


        // Create scroll container and mask
        this.scrollContainer = new createjs.Container();
        this.listView.addChild(this.scrollContainer);

        const mask = new createjs.Shape();
        mask.graphics.beginFill("#000").drawRect(0, 0, this.listView.nominalBounds.width, this.listView.nominalBounds.height);
        this.scrollContainer.mask = mask;

        this.populateEpisodes()
    }

    registerContexts() { // LIST VIEW


        this.defineContext("Transmissions:List", {
            up: {
                hint: "Upward",
                handler: () => {this.updateSelection((this.selectedIndex - 1 + this.episodeSymbols.length) % this.episodeSymbols.length)}
                
            },
            down: {
                hint: "Down",
                handler: () => {
                    this.updateSelection((this.selectedIndex + 1) % this.episodeSymbols.length);
                }
            },
            left: {
                hint: "Back",
                handler: () => {
                    PodCube.log("SC_TRANSMISSIONS: Back pressed");
                }
            },
            right: {
                hint: "Details",
                handler: () => {
                    this.showDetails();
                }
            },
            yes: {
                hint: "Add to Queue",
                handler: ()=>{
                    const episode = this.selectedEpisode;
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
                handler: ()=>{
                    this.scrollToTop();
                }
            }

        });



        this.defineContext("Transmissions:Details", {
          up: {
            hint: "Error",
            handler: () => {this.fuckyou()},
          },
          down: {
            hint: "Down",
            handler: () => {PodCube.log("Pressed Down in Transmissions:Details")},
          },
          left: {
            hint: "Back",
            handler: () => {this.showList()},
          },
          right: {
            hint: "Right",
            handler: () => {},
          },
          yes: {
            hint: "Add to Queue",
            handler: () => {PodCube.Player.addToQueue(this.selectedEpisode)},
          },
          no: {
            hint: "Play Next",
            handler: () => { PodCube.Player.playNext(this.selectedEpisode)},
          },
        });

        this.switchContext("Transmissions:List");

    }


    showDetails() {

        this.selectedItem.gotoAndStop("details");
        this.switchContext("Transmissions:Details");
        this.scrollToTop(this.selectedItem);
        this.prevIndex = this.scrollContainer.getChildIndex(this.selectedItem)
        this.scrollContainer.setChildIndex(this.selectedItem, this.scrollContainer.numChildren - 1);
    }

    showList() {

        this.switchContext("Transmissions:List");
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
        // can't get rid of this
    }

};
