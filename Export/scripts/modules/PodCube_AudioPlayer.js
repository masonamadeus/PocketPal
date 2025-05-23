/**
 * PodCubeAudioPlayer handles podcast episode playback and queue management.
 * It manages a playlist of episodes, controls audio playback, and publishes state changes
 * through the PodCube message system.
 * 
 * Events published:
 * - Queue-Updated: When episodes are added/removed from queue
 * - Episode-Playing: When an episode starts playing
 * - Episode-Paused: When playback is paused
 * - Playback-Progress{percent}: During playback with current progress
 * - Playback-Error: When playback errors occur
 * - Queue-Ended: When reaching the end of queue
 */
export class PodCubeAudioPlayer {
    /**
     * Creates a new PodCubeAudioPlayer instance and sets up event listeners.
     */
    constructor() {
        this.shortcuts = ['pplay', 'pback', 'pfwd', 'pque' ];
        this.audio = new Audio();
        this.queue = [];
        this.currentIndex = -1;

        // Set up event listeners
        this.audio.addEventListener("ended", () => this.next());
        this.audio.addEventListener("play", () => this.onPlay());
        this.audio.addEventListener("pause", () => this.onPause());
        this.audio.addEventListener("timeupdate", () => this.onTimeUpdate());
        this.audio.addEventListener("error", (e) => this.onError(e));

        this.shortcuts.forEach(shortcut => {
            console.log("PodCubeAudioPlayer: Registering shortcut", shortcut);
            PodCube.MSG.subscribe(`Pressed-BTN_${shortcut.toUpperCase()}`, () => {
                this.handleShortcut(shortcut);
            });
        });
    }

    handleShortcut(shortcut) {
        switch (shortcut) {
            case 'pplay':
                if (this.audio.paused) {
                    this.play();
                } else {
                    this.pause();
                }
                break;
            case 'pback':
                this.previous();
                break;
            case 'pfwd':
                this.skipForward();
                break;
            case 'pque':
                PodCube.MSG.publish("Queue-Requested");
                break;
            default:
                console.warn("PodCubeAudioPlayer: Unknown shortcut", shortcut);
        }
    }
    /**
     * Adds an episode to the playback queue.
     * If this is the first episode, it will start playing automatically.
     * @param {Object} episode - The episode object to add
     * @param {string} episode.title - The title of the episode
     * @param {string} episode.audioUrl - The URL to the episode's audio file
     */
    addToQueue(episode) {
        this.queue.push(episode);
        PodCube.MSG.publish("Queue-Updated", this.queue);
        console.log("PodCubeAudioPlayer: Added to queue:", episode.title);

        // Autoplay if this is the first episode
        if (this.queue.length === 1) {
            this.play();
        }
    }

    /**
     * Removes an episode from the queue at the specified index.
     * If the removed episode was playing, plays the next episode.
     * @param {number} index - The index of the episode to remove
     */
    removeFromQueue(index) {
        if (index >= 0 && index < this.queue.length) {
            this.queue.splice(index, 1);
            PodCube.MSG.publish("Queue-Updated", this.queue);

            // Adjust currentIndex if needed
            if (index < this.currentIndex) {
                this.currentIndex--;
            } else if (index === this.currentIndex) {
                // If we removed the current episode, play the next one
                this.next();
            }
        }
    }

    /**
     * Clears the entire queue and stops playback.
     */
    clearQueue() {
        this.stop();
        this.queue = [];
        this.currentIndex = -1;
        PodCube.MSG.publish("Queue-Updated", this.queue);
    }

    /**
     * Starts or resumes playback of an episode.
     * @param {number} [index] - Optional index of episode to play. If not provided,
     *                          continues with current episode or starts from beginning.
     * @returns {Promise<void>}
     */
    async play(index) {
        // If index is provided, play that specific episode
        if (typeof index === 'number') {
            if (index >= 0 && index < this.queue.length) {
                this.currentIndex = index;
            } else {
                console.warn("PodCubeAudioPlayer: Invalid queue index");
                return;
            }
        } else if (this.currentIndex === -1 && this.queue.length > 0) {
            // Start playing from the beginning if nothing is playing
            this.currentIndex = 0;
        }

        if (this.currentIndex >= 0 && this.currentIndex < this.queue.length) {
            const episode = this.queue[this.currentIndex];
            
            try {
                // Set the audio source if it's different from current
                if (this.audio.src !== episode.audioUrl) {
                    this.audio.src = episode.audioUrl;
                }
                
                await this.audio.play();
                console.log("PodCubeAudioPlayer: Playing:", episode.title);
            } catch (error) {
                console.error("PodCubeAudioPlayer: Playback error:", error);
                this.onError(error);
            }
        } else {
            console.warn("PodCubeAudioPlayer: No episode to play");
        }
    }

    /**
     * Pauses the current episode playback.
     */
    pause() {
        this.audio.pause();
    }

    /**
     * Stops playback and resets the current time to 0.
     */
    stop() {
        this.pause();
        this.audio.currentTime = 0;
    }

    /**
     * Advances to the next episode in the queue.
     * Publishes Queue-Ended event if at the end of queue.
     */
    next() {
        if (this.currentIndex < this.queue.length - 1) {
            this.currentIndex++;
            this.play();
        } else {
            console.log("PodCubeAudioPlayer: End of queue");
            PodCube.MSG.publish("Queue-Ended");
        }
    }

    /**
     * Goes to the previous episode or restarts current episode.
     * If current time > 3 seconds, restarts current episode.
     * Otherwise, goes to previous episode if available.
     */
    previous() {
        // If we're more than 3 seconds into the episode, restart it
        if (this.audio.currentTime > 3) {
            this.audio.currentTime = 0;
        } else if (this.currentIndex > 0) {
            this.currentIndex--;
            this.play();
        }
    }

    /**
     * Skips forward 10 seconds in the current episode.
     * Will not skip beyond the episode duration.
     */
    skipForward() {
        this.audio.currentTime = Math.min(this.audio.currentTime + 10, this.audio.duration);
    }

    /**
     * Skips backward 10 seconds in the current episode.
     * Will not skip before the start of the episode.
     */
    skipBackward() {
        this.audio.currentTime = Math.max(this.audio.currentTime - 10, 0);
    }

    /**
     * Seeks to a specific time in the current episode.
     * @param {number} time - The time in seconds to seek to
     */
    seekTo(time) {
        if (time >= 0 && time <= this.audio.duration) {
            this.audio.currentTime = time;
        }
    }

    /**
     * Sets the audio playback volume.
     * @param {number} volume - Volume level between 0 and 1
     */
    setVolume(volume) {
        this.audio.volume = Math.max(0, Math.min(1, volume));
    }

    /**
     * Gets the current audio volume.
     * @returns {number} Current volume level between 0 and 1
     */
    getVolume() {
        return this.audio.volume;
    }

    /**
     * Gets the currently playing episode.
     * @returns {Object|null} The current episode object or null if queue is empty
     */
    getCurrentEpisode() {
        return this.currentIndex >= 0 ? this.queue[this.currentIndex] : null;
    }

    /**
     * Gets the current playback state.
     * @returns {Object} Playback state object
     * @property {boolean} isPlaying - Whether audio is currently playing
     * @property {number} currentTime - Current playback position in seconds
     * @property {number} duration - Total duration of current episode in seconds
     * @property {number} volume - Current volume level between 0 and 1
     */
    getPlaybackState() {
        return {
            isPlaying: !this.audio.paused,
            currentTime: this.audio.currentTime,
            duration: this.audio.duration || 0,
            volume: this.audio.volume
        };
    }

    /**
     * Handles play events and publishes Episode-Playing message.
     * @private
     */
    onPlay() {
        const episode = this.getCurrentEpisode();
        if (episode) {
            PodCube.MSG.publish("Episode-Playing", episode);
        }
    }

    /**
     * Handles pause events and publishes Episode-Paused message.
     * @private
     */
    onPause() {
        const episode = this.getCurrentEpisode();
        if (episode) {
            PodCube.MSG.publish("Episode-Paused", episode);
        }
    }

    /**
     * Handles timeupdate events and publishes Playback-Progress message.
     * The progress percentage is appended to the event name.
     * @private
     */
    onTimeUpdate() {
        const state = this.getPlaybackState();
        PodCube.MSG.publish("Playback-Progress"+((state.currentTime/state.duration)*100).toString(), state);
    }

    /**
     * Handles playback errors and publishes Playback-Error message.
     * @param {Error} error - The error that occurred
     * @private
     */
    onError(error) {
        console.error("PodCubeAudioPlayer: Error:", error);
        PodCube.MSG.publish("Playback-Error", {
            episode: this.getCurrentEpisode(),
            error: error
        });
    }

    /**
     * Cleans up the player by stopping playback, clearing the queue,
     * and resetting the audio source.
     */
    dispose() {
        this.stop();
        this.audio.src = '';
        this.queue = [];
        this.currentIndex = -1;
    }
}
