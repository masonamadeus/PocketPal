// RESPONSIBLE FOR DISPENSING INTERACTION LOGIC THAT WAS TOO COMPLICATED FOR ME TO CODE UP IN THE SHITTY INTERNAL EDITOR, PLUS I DON'T TRUST IT LOL.

const BehaviorDispenser = {

    init: function (newThing, behaviorType) {
        // Validate the newThing object
        if (!newThing) {
            console.error("BehaviorDispenser: Invalid newThing object.");
            return;
        }

        // Check if newThing is already initialized
        if (newThing.initialized) {
            console.error("BehaviorDispenser: Already initialized", newThing);
            return;
        }

        // Mark as initialized
        newThing.initialized = true;

        // Assign the behavior type to the thing
        newThing.behaviorType = behaviorType;

        // Find and invoke the corresponding behavior method
        const methods = Object.getOwnPropertyNames(this).filter(prop => typeof this[prop] === 'function');
        if (methods.includes(behaviorType)) {
            console.log("BehaviorDispenser: Registering", newThing, "as", behaviorType);
            this[behaviorType](newThing);
        } else {
            console.error("BehaviorDispenser: No matching method found for behavior type:", behaviorType);
            console.error("BehaviorDispenser: Available methods:", methods);
        }
    },

    Button: function (thing) {
        thing.isDebouncing = false;
        thing.debounceDelay = 80;
        thing.isPressed = false;
        thing.halfwayPoint = Math.floor(thing.totalFrames / 2) - 1;
        thing.hoverPoint = Math.ceil(thing.totalFrames / 3) - 1;

        // THE PRIMARY ACTION IS THE THING THAT HAPPENS WHEN YOU PRESS THE BUTTON
        thing.primaryAction = function () {
            thing.play();
            MSG.publish("Pressed-" + thing.name, thing);
        };

        // Use the helper function to set up the hit area
        this.setHitArea(thing);

        // SET UP MOUSE STATES AND STUFF
        thing.handleDragLeave = function () {
            thing.gotoAndStop(0);
            thing.isPressed = false;
        }.bind(thing);

        thing.handleHover = function () {
            thing.gotoAndStop(thing.hoverPoint);
        }.bind(thing);

        thing.handleTouch = function () {
            thing.gotoAndStop(thing.halfwayPoint);
            thing.isPressed = true;
        }.bind(thing);

        thing.handleRelease = function () {
            if (thing.isDebouncing || !thing.isPressed) {
                return;
            }
            thing.isDebouncing = true;
            thing.primaryAction();

            setTimeout(() => {
                thing.isDebouncing = false;
            }, thing.debounceDelay);
        }.bind(thing);

        // MAPPING INPUT EVENTS
        thing.on("mouseover", thing.handleHover);
        thing.on("mousedown", thing.handleTouch);
        thing.on("touchstart", thing.handleTouch);
        thing.on("mouseout", thing.handleDragLeave);
        thing.on("touchcancel", thing.handleDragLeave);
        thing.on("pressup", thing.handleRelease);

        // SUBSCRIBE TO KEYBINDS
        if (thing.keybind) {
            const keybind = Array.isArray(thing.keybind) ? thing.keybind : [thing.keybind];
            keybind.forEach(function (key) {
                MSG.subscribe("Keyboard-" + key, thing.primaryAction,false);
            });
        } else if (thing.attributes?.keybind) {
            thing.attributes.keybind.forEach(function (key) {
                MSG.subscribe("Keyboard-" + key, thing.primaryAction,false);
            });
        }
    },

    setHitArea: function (thing) {
        if (!thing.nominalBounds) {
            console.error("BehaviorDispenser: 'nominalBounds' is missing on the thing object.");
            return;
        }

        const bounds = thing.nominalBounds;
        const hitArea = new createjs.Shape();
        hitArea.graphics.beginFill("#00000").drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
        thing.hitArea = hitArea;
    },

};