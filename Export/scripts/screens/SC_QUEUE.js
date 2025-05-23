import { PodCubeScreen } from "../classes/PodCube_Screen.js";

export class SC_Queue extends PodCubeScreen {
    constructor(screenInstance) {
        this.queueListView = null;
        this.initialized = false;

        this.init(screenInstance);
        PodCube.SC_Queue = this;
    }

    init(screenInstance) {
        if (this.initialized) return;
        this.initialized = true;
        this.queueListView = screenInstance.QUEUE_LISTVIEW;

        MSG.subscribe("Queue-Updated", this.updateQueueList.bind(this));
        this.updateQueueList(PodCubePlayer.queue);

        MSG.subscribe("Loaded-Screen", (e) => {
            if (e.name === "SC_QUEUE") {
                new QueueScreen(e.instance);
            }
        }, false);
    }

    updateQueueList(queue) {
        this.queueListView.removeAllChildren();

        queue.forEach((episode, index) => {
            const queueItem = new lib._QUEUE_ITEM();
            queueItem.title.text = episode.title;
            queueItem.index = index;

            queueItem.on("click", () => {
                PodCubePlayer.currentIndex = index;
                PodCubePlayer.play();
            });

            this.queueListView.addChild(queueItem);
        });

        stage.update();
    }
};


