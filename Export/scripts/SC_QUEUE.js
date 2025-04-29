const SC_QUEUE = {
    queueListView: null,
    initialized: false,

    init: function(screenInstance) {
        if (this.initialized) return;
        this.initialized = true;
        this.queueListView = screenInstance.QUEUE_LISTVIEW;

        MSG.subscribe("Queue-Updated", this.updateQueueList.bind(this));
        this.updateQueueList(PodCubePlayer.queue);
    },

    updateQueueList: function(queue) {
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

MSG.subscribe("Loaded-Screen", (e) => {
    if (e.name === "SC_QUEUE") {
        SC_QUEUE.init(e.instance);
    }
}, false);
