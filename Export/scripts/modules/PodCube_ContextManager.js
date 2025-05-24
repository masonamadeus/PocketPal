export class ContextManager {
    constructor() {
        this.contexts = {};
        this.currentContext = null;
        this.ctxData = null;

        this.actions = ['up', 'down', 'left', 'right', 'yes', 'no'];

        this.actions.forEach(action => {
            PodCube.MSG.subscribe(`Pressed-BTN_${action.toUpperCase()}`, () => this.handle(action));
        });

        PodCube.MSG.subscribe("Ready-Animate", () => {
            this.mapHintSymbols();
            this.homeHint.text = "Home";
            this.transHint.text = "Transmissions";

            PodCube.MSG.subscribe("Pressed-BTN_MAIN", () => {
                PodCube.ScreenManager.loadScreen("SC_MAIN");
            });
            PodCube.MSG.subscribe("Pressed-BTN_TRANSMISSIONS", () => {
                PodCube.ScreenManager.loadScreen("SC_TRANSMISSIONS");
            });
        });
    }

    define(name, def) {
        this.contexts[name] = def;
    }

    switch(name, ctxData = null) {
        const context = this.contexts[name];
        if (!context) {
            console.warn(`[ContextManager] No such context: "${name}"`);
            return;
        }

        this.currentContext = context;
        this.ctxData = ctxData;

        this.actions.forEach(action => {
            const hintText = context[action]?.hint || "";
            const hintSymbol = this[`${action}Hint`];
            if (hintSymbol) hintSymbol.text = hintText;
        });

        PodCube.MSG.publish("Context-Changed", name);
    }

    handle(action) {
        const fn = this.currentContext?.[action]?.handler;
        if (typeof fn === "function") {
            fn(this.ctxData);
        } else {
            PodCube.log(`[ContextManager] No handler for "${action}"`);
        }
    }

    mapHintSymbols() {
        this.upHint = exportRoot.region_2.upHint.label;
        this.downHint = exportRoot.region_2.downHint.label;
        this.leftHint = exportRoot.region_2.leftHint.label;
        this.rightHint = exportRoot.region_2.rightHint.label;
        this.yesHint = exportRoot.region_3.yesHint.label;
        this.noHint = exportRoot.region_3.noHint.label;
        this.transHint = exportRoot.region_3.transHint.label;
        this.homeHint = exportRoot.region_3.homeHint.label;
    }
}
