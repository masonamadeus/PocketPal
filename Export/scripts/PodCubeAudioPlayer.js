class PodCubeAudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.queue = [];
        this.currentIndex = -1;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyzerNode = this.audioContext.createAnalyser();
        this.sourceNode = null;

        this.audio.addEventListener("ended", () => this.next());
    }

    /**
     * Add an episode to the queue.
     * @param {Episode} episode - The episode to add.
     */
    addToQueue(episode) {
        this.queue.push(episode);
        MSG.publish("Queue-Updated", this.queue);
        console.log("PodCubeAudioPlayer: Added to queue:", episode.title);

        //autoplay (for now)
        if (this.queue.length === 1) {
            this.play();
        }
    }

    /**
     * Play the current episode in the queue.
     */
    play() {
        if (this.currentIndex === -1 && this.queue.length > 0) {
            this.currentIndex = 0;
        }

        if (this.currentIndex >= 0 && this.currentIndex < this.queue.length) {
            const episode = this.queue[this.currentIndex];
            this.audio.crossOrigin = "anonymous";
            this.audio.src = episode.audio;
            this.audio.play();

            // Connect audio to analyzer node
            this.connectAudioToAnalyzer();

            MSG.publish("Episode-Playing", episode);
            console.log("PodCubeAudioPlayer: Playing:", episode.title);
        } else {
            console.warn("PodCubeAudioPlayer: No episode to play.");
        }
    }

    /**
     * Pause playback.
     */
    pause() {
        this.audio.pause();
        MSG.publish("Episode-Paused", this.queue[this.currentIndex]);
    }

    /**
     * Skip to the next episode in the queue.
     */
    next() {
        if (this.currentIndex < this.queue.length - 1) {
            this.currentIndex++;
            this.play();
        } else {
            console.log("PodCubeAudioPlayer: End of queue.");
        }
    }

    /**
     * Skip to the previous episode in the queue.
     */
    previous() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.play();
        } else {
            console.log("PodCubeAudioPlayer: Start of queue.");
        }
    }

    /**
     * Skip forward by 10 seconds.
     */
    skipForward() {
        this.audio.currentTime += 10;
    }

    /**
     * Skip backward by 10 seconds.
     */
    skipBackward() {
        this.audio.currentTime -= 10;
    }

    /**
     * Connect the audio element to the analyzer node for audio-reactive visuals.
     */
    connectAudioToAnalyzer() {
        if (this.sourceNode) {
            this.sourceNode.disconnect();
        }

        this.sourceNode = this.audioContext.createMediaElementSource(this.audio);
        this.sourceNode.connect(this.analyzerNode);
        this.analyzerNode.connect(this.audioContext.destination);
    }

    /**
     * Get frequency data for audio-reactive visuals.
     * @returns {Uint8Array} Frequency data.
     */
    getFrequencyData() {
        const dataArray = new Uint8Array(this.analyzerNode.frequencyBinCount);
        this.analyzerNode.getByteFrequencyData(dataArray);
        return dataArray;
    }
}

const PodCubePlayer = new PodCubeAudioPlayer();
