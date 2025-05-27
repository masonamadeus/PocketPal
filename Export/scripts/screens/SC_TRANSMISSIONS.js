// SC_TRANSMISSIONS.js - Refactored for Readability
import { PodCubeScreen } from "../classes/PodCube_Screen.js";

export class SC_TRANSMISSIONS extends PodCubeScreen {

    // --- 1. Class Properties (Initialization) ---
    // Properties are grouped at the top for quick understanding of the class's state.
    constructor(symbol) {
        super(symbol);
        this.episodeSymbols = []; // Array to hold the visual symbols for episodes
        this.selectedIndex = 0;   // Index of the currently selected episode symbol
        this.listView = null;     // Reference to the main LISTVIEW display object
        this.scrollContainer = null; // Container for scrollable episode symbols
        this.totalContentHeight = 0; // Total height of all episode symbols combined
        this.filterContextText = null // Reference to the text field that shows what is being filtered

        // UI-related padding/sizing
        this.listItemHeight = 120; // Consistent vertical space for each list item
        this.detailsPadding = 0;   // Dynamic padding for details view

        // Filter and Sort state management
        this.currentFilters = {}; // Stores active filter criteria (e.g., tag, model, search)
        this.currentSort = { sortBy: 'published', sortAscending: false }; // Stores active sort criteria (e.g., sortBy, sortAscending)

        // --- NEW: Filter UI State ---
        this.filterUIContainer = null; // Main container for the filter UI elements
        this.filterCategoriesSymbols = []; // Symbols representing filter categories (Tags, Models, Years)
        this.filterOptionsSymbols = [];    // Symbols representing options within a selected category (Sci-Fi, 2020)
        this.currentFilterCategoryIndex = 0; // Index of the selected filter category
        this.currentFilterOptionIndex = 0;   // Index of the selected option within a category
        this.filterUIMode = 'categories';    // 'categories' or 'options' (determines navigation)

        // Map filter category display names to their corresponding data access methods in PodCube.Feed
        this.filterCategoryMap = {
            "Tags": { method: "getAvailableTags", type: "tag" },
            "Models": { method: "getAvailableModels", type: "model" },
            "Years": { method: "getAvailableYears", type: "year" },
            "Origins": { method: "getAvailableOrigins", type: "origin" },
            "Zones": { method: "getAvailableZones", type: "zone" },
            "Locales": { method: "getAvailableLocales", type: "locale" },
            "Regions": { method: "getAvailableRegions", type: "region" }
            // Add other filter categories here as needed
        };
        this.availableFilterCategories = Object.keys(this.filterCategoryMap); // Just the display names

        // --- END NEW ---
    }

    // --- 2. Lifecycle Methods (Init, Show, Destroy) ---
    // These methods handle the screen's lifecycle.

    onShow() {
        PodCube.log('SC_TRANSMISSIONS: Screen shown.');
    }

    onInit() {
        this._initializeDisplayObjects(); // Setup core display objects
        this.registerContexts();          // Define user interaction contexts

        // for now, init with all episodes from feed
        this.onFeedEpisodesChanged(PodCube.Feed.Episodes)

        PodCube.log("SC_TRANSMISSIONS: Contexts registered.");
        this.switchContext("Transmissions:List"); // Default context on init
    }

    onDestroy() {
        super.onDestroy(); // Call parent class's cleanup
        PodCube.log("SC_TRANSMISSIONS: Destroyed.");
    }

    // --- 3. Core Initialization Helpers (Private Methods) ---
    // Helper methods called during onInit for better modularity.

    _initializeDisplayObjects() {
        this.listView = this.symbol.LISTVIEW;
        if (!this.listView) {
            console.error("SC_TRANSMISSIONS: LISTVIEW instance not found. Cannot proceed.");
            return;
        }

        this.filterContextText = this.symbol.filterContext; // Assuming this is a TextField

        this.scrollContainer = new createjs.Container();
        this.listView.addChild(this.scrollContainer);

        // Apply a mask to the scroll container to keep items within the list view bounds
        const mask = new createjs.Shape();
        mask.graphics.beginFill("#000")
            .drawRect(0, 0, this.listView.nominalBounds.width, this.listView.nominalBounds.height);
        this.scrollContainer.mask = mask;

        // --- NEW: Initialize Filter UI Container ---
        this.filterUIContainer = new createjs.Container();
        // Position it where your filter UI should appear. For now, let's overlap the listview.
        // You might want to position it differently or have a dedicated 'filterPanel' symbol.
        this.symbol.addChild(this.filterUIContainer);
        this.filterUIContainer.visible = false; // Start hidden
        // --- END NEW ---
    }



    // --- 4. Event Handlers ---
    // Methods triggered by external events, like data changes from PodCube.Feed.

    /**
     * Handler for when PodCube.Feed's filtered episode list changes.
     * This method is responsible for updating the UI.
     * @param {Episode[]} filteredList - The new list of episodes to display.
     */
    onFeedEpisodesChanged(filteredList) {
        this.populateEpisodeSymbols(filteredList); // Re-render visual list
        this.updateSelection(0); // Reset selection to the first item
        stage.update(); // Refresh the display

        // Recalculate padding needed for the details view
        this.detailsPadding = (this.selectedItem && this.selectedItem.getBounds()) ?
                              (this.selectedItem.getBounds().height) * 4 + 140 : 0;

        PodCube.MSG.publish("Transmissions-Ready", this.episodeSymbols);
        PodCube.MSG.log("SC_TRANSMISSIONS: Transmissions list ready and populated.");
    }

    // --- 5. Context Management and User Interactions ---
    // Methods related to defining and switching interaction contexts.

    registerContexts() {
        // Context for navigating the episode list
        this.defineContext("Transmissions:List", {
            up: { hint: "Upward", handler: () => this.navigate(-1) },
            down: { hint: "Down", handler: () => this.navigate(1) },
            right: { hint: "Details", handler: () => this.showDetails() },
            yes: { hint: "Add to Queue", handler: () => this._addSelectedEpisodeToQueue() },
            no: { hint: "Filter/Sort", handler: () => this.showFilterOptions() },
            left: { hint: "Back", handler: () => PodCube.log("Back pressed. Figure that code out soon.") }
        });

        // Context for viewing episode details
        this.defineContext("Transmissions:Details", {
            up: {
                hint: "Previous", handler: () => {
                    this.showList(); // Temporarily go back to list to trigger selection update logic
                    this.navigate(-1); // Update selection to the next episode
                    this.showDetails(); // Re-enter details view for the new selection
                }
            },
            down: {
                hint: "Next", handler: () => {
                    this.showList(); // Temporarily go back to list to trigger selection update logic
                    this.navigate(1); // Update selection to the next episode
                    this.showDetails(); // Re-enter details view for the new selection
                }
            },
            left: { hint: "Back", handler: () => this.showList() },
            yes: { hint: "Add to Queue", handler: () => this._addSelectedEpisodeToQueue() },
            no: { hint: "Play Next", handler: () => PodCube.Player.addNextToQueue(this.selectedEpisode) },
        });

        // Context for filter and sort options UI
        this.defineContext("Transmissions:FilterOptions", {
            up: { hint: "Up", handler: () => this._navigateFilterUI(-1) },
            down: { hint: "Down", handler: () => this._navigateFilterUI(1) },
            right: { hint: "Select Category / Options", handler: () => this._enterFilterCategory() },
            left: { hint: "Back to Categories / Cancel", handler: () => this._exitFilterOptions() },
            yes: { hint: "Apply Filter", handler: () => this._applySelectedFilter() },
            no: { hint: "Clear Filter / Cancel", handler: () => this._cancelFiltersAndReturnToList() }
        });
    }

    // --- 6. UI State Management (Show/Hide/Transition) ---
    // Methods that control which UI elements are visible and how.

    showDetails() {
        this.switchContext("Transmissions:Details");
        this._adjustPaddingForDetails();
        this.selectedItem.gotoAndStop("details"); // Show details state of the symbol
        this.scrollToTop(this.selectedItem);      // Scroll selected item to top of view
        // Bring selected item to front so details are not obscured
        this.prevIndex = this.scrollContainer.getChildIndex(this.selectedItem);
        this.scrollContainer.setChildIndex(this.selectedItem, this.scrollContainer.numChildren - 1);
        stage.update();
    }

    showList() {
        this.switchContext("Transmissions:List");
        this._adjustPaddingForDetails(); // Reset padding
        // Restore selected item's original Z-order
        if (this.prevIndex !== undefined) {
            this.scrollContainer.setChildIndex(this.selectedItem, this.prevIndex);
            this.prevIndex = undefined;
        }
        this.selectedItem.gotoAndStop("list-selected"); // Show list state of the symbol
        this.scrollSelectionToCenter(); // Center the selection
        // Ensure filter UI is hidden
        this.filterUIContainer.visible = false;
        stage.update();
    }

    /**
     * Adjusts the Y position of episode symbols following the selected one
     * to make space for the details view.
     */
    _adjustPaddingForDetails() {
        const padding = this.detailsPadding || 0;
        const isDetailsContext = this.context.name === "Transmissions:Details";

        // Only adjust symbols AFTER the selected one
        const startIndex = this.selectedIndex + 1;
        for (let i = startIndex; i < this.episodeSymbols.length; i++) {
            const episodeSymbol = this.episodeSymbols[i];
            episodeSymbol.y = isDetailsContext ? episodeSymbol.originalY + padding : episodeSymbol.originalY;
        }
        stage.update();
    }

    // --- 7. List Manipulation (Render, Selection, Scrolling) ---
    // Methods directly involved in rendering and navigating the episode list.

    /**
     * Populates the visual episode symbols based on a provided array of Episode objects.
     * Clears existing symbols and re-renders the list.
     * @param {Episode[]} episodesToRender - The list of Episode objects to render.
     */
    populateEpisodeSymbols(episodesToRender) {
        this.scrollContainer.removeAllChildren();
        this.episodeSymbols = []; // Clear previous symbols

        let yOffset = 0;
        episodesToRender.forEach((episode) => {
            const episodeSymbol = new PodCube.lib._EPISODE();
            PodCube.Behavior.EpisodeSymbol(episodeSymbol, episode); // Apply behaviors (e.g., data binding)
            episodeSymbol.gotoAndStop("list-unselected"); // Default state
            episodeSymbol.x = 0; // Ensure X is 0 relative to scrollContainer
            episodeSymbol.y = yOffset;
            episodeSymbol.originalY = yOffset; // Store original Y for detail padding
            yOffset += this.listItemHeight; // Increment offset by consistent item height

            this.episodeSymbols.push(episodeSymbol);
            this.scrollContainer.addChild(episodeSymbol);

            // Adjust title position for single-line titles if needed
            episodeSymbol.titleCentered.text = episode.title;
            const titleBounds = episodeSymbol.titleCentered.getBounds();
            if (titleBounds && titleBounds.height <= 45) { // Assuming 45 is max single line height
                episodeSymbol.titleCentered.y += titleBounds.height / 2;
            } else if (!titleBounds) {
                PodCube.warn("SC_TRANSMISSIONS: titleCentered.getBounds() returned null for episode:", episode.title);
            }
        });

        // Store the total height of all rendered content for scrolling calculations
        this.totalContentHeight = episodesToRender.length * this.listItemHeight;
    }


    /**
     * Navigates to the next or previous episode in the list.
     * @param {number} direction - The direction of navigation (1 for forward, -1 for backward).
     */
    navigate(direction) {
        this.updateSelection(this.selectedIndex + direction)
    }

    /**
     * Updates the currently selected episode item in the list.
     * Handles visual state changes and triggers scrolling.
     * @param {number} newIndex - The index to select.
     */
    updateSelection(newIndex) {
        const numEpisodes = this.episodeSymbols.length;

        // Handle empty list scenario
        if (numEpisodes === 0) {
            if (this.episodeSymbols[this.selectedIndex]) {
                this.episodeSymbols[this.selectedIndex].gotoAndStop("list-unselected");
            }
            this.selectedIndex = -1; // No selection
            return;
        }

        // Deselect previous item if one was selected
        if (this.selectedIndex !== -1 && this.episodeSymbols[this.selectedIndex]) {
            this.episodeSymbols[this.selectedIndex].gotoAndStop("list-unselected");
        }

        // Calculate new index, handling wrapping (modulo) and negative results
        this.selectedIndex = (newIndex % numEpisodes + numEpisodes) % numEpisodes;

        // Select the new item and update its visual state
        if (this.episodeSymbols[this.selectedIndex]) {
            this.episodeSymbols[this.selectedIndex].gotoAndStop("list-selected");
        }

        this.scrollSelectionToCenter(); // Adjust scroll position
        stage.update(); // Ensure changes are visible
    }

    /**
     * Scrolls the list container to bring the selected item into view,
     * aiming to place it near the top (30% down).
     */
    scrollSelectionToCenter() {
        const selectedSymbol = this.selectedItem;
        if (!selectedSymbol) {
            // If no selected item (e.g., empty list), reset scroll to top
            createjs.Tween.get(this.scrollContainer).to({ y: 0 }, 300, createjs.Ease.quadOut);
            return;
        }

        const listViewHeight = this.listView.nominalBounds.height;
        const contentHeight = this.totalContentHeight; // Total height of all items

        // Calculate desired Y position for the scroll container
        // We want the selected symbol's Y to be at `listViewHeight * 0.3` within the view.
        let targetScrollContainerY = -(selectedSymbol.y - (listViewHeight * 0.3));

        // Clamp the scroll position:
        const maxScrollY = 0; // Cannot scroll up past the top of the content
        let minScrollY = -(contentHeight - listViewHeight); // Max scroll down
        if (minScrollY > 0) { // If content is shorter than the view, prevent scrolling at all
            minScrollY = 0;
        }

        // Apply clamping to ensure target Y is within valid scroll bounds
        targetScrollContainerY = Math.max(Math.min(targetScrollContainerY, maxScrollY), minScrollY);

        // Apply the smooth scroll animation
        createjs.Tween.get(this.scrollContainer)
            .to({ y: targetScrollContainerY }, 300, createjs.Ease.quadOut);
    }

    /**
     * Scrolls the list container to bring a specific symbol (or the first one by default) to the very top.
     * Used for "Scroll to Top" or when entering details view.
     * @param {createjs.DisplayObject} [symbolToScrollTo=this.episodeSymbols[0]] - The symbol to scroll to.
     */
    scrollToTop(symbolToScrollTo = this.episodeSymbols[0]) {
        if (!symbolToScrollTo) return;
        const targetY = symbolToScrollTo.y; // Y position of the symbol within the scrollContainer
        createjs.Tween.get(this.scrollContainer)
            .to({ y: -targetY }, 300, createjs.Ease.quadOut); // Animate scrollContainer's Y
    }

    // --- 8. Getters (Computed Properties) ---
    // Convenient accessors for current state.

    get selectedEpisode() {
        // Returns the Episode data object for the currently selected item
        return this.selectedItem.episode || null;
    }

    get selectedItem() {
        // Returns the visual display object (_EPISODE symbol) for the selected item
        return this.episodeSymbols[this.selectedIndex] || null;
    }

    // --- 9. Utility Methods (Misc. actions) ---

    popOutDataDisk(episode) {
        const dataDiskSymbol = new PodCube.lib._DISK_FLYOUT();
        dataDiskSymbol.episode = episode; // Attach episode data
        exportRoot.addChild(dataDiskSymbol); // Add to main stage
        dataDiskSymbol.gotoAndPlay("disk-up"); // Play animation
        dataDiskSymbol.x = stage.canvas.width / 2; // Center horizontally
        dataDiskSymbol.y = stage.canvas.height / 2; // Center vertically
    }

    // --- 10. Filter/Sort UI Logic ---
    // Methods related to showing and applying filters/sorts.

    /**
     * Displays the filter and sort options UI.
     * Initializes the category list and switches context.
     */
    showFilterOptions() {
        PodCube.log("SC_TRANSMISSIONS: Displaying filter and sort options UI.");
        this.switchContext("Transmissions:FilterOptions");

        // Hide the main episode list
        this.listView.visible = false;
        // Show the filter UI container
        this.filterUIContainer.visible = true;

        // Reset filter UI state
        this.filterUIMode = 'categories';
        this.currentFilterCategoryIndex = 0;
        this.currentFilterOptionIndex = 0;

        // Populate and display filter categories
        this._populateFilterSymbols(this.availableFilterCategories, this.filterCategoriesSymbols);
        this._updateFilterUISelection(0, 'categories'); // Select the first category

        this.filterContextText.text = "SELECT CATEGORY:"; // Update context text
        stage.update();
    }

    /**
     * Navigates the filter UI (either categories or options).
     * @param {number} direction - 1 for down, -1 for up.
     * @private
     */
    _navigateFilterUI(direction) {
        if (this.filterUIMode === 'categories') {
            this._updateFilterUISelection(this.currentFilterCategoryIndex + direction, 'categories');
        } else { // filterUIMode === 'options'
            this._updateFilterUISelection(this.currentFilterOptionIndex + direction, 'options');
        }
    }

    /**
     * Updates the selection within the filter UI and refreshes visuals.
     * @param {number} newIndex - The index to select.
     * @param {'categories'|'options'} mode - Which list to update.
     * @private
     */
    _updateFilterUISelection(newIndex, mode) {
        let symbolsArray = (mode === 'categories') ? this.filterCategoriesSymbols : this.filterOptionsSymbols;
        let currentIndexRef = (mode === 'categories') ? 'currentFilterCategoryIndex' : 'currentFilterOptionIndex';

        const numItems = symbolsArray.length;

        // Handle empty list scenario
        if (numItems === 0) {
            if (symbolsArray[this[currentIndexRef]]) {
                symbolsArray[this[currentIndexRef]].gotoAndStop("list-unselected");
            }
            this[currentIndexRef] = -1;
            return;
        }

        // Deselect previous item
        if (this[currentIndexRef] !== -1 && symbolsArray[this[currentIndexRef]]) {
            symbolsArray[this[currentIndexRef]].gotoAndStop("list-unselected");
        }

        // Calculate new index, handling wrapping
        this[currentIndexRef] = (newIndex % numItems + numItems) % numItems;

        // Select new item
        if (symbolsArray[this[currentIndexRef]]) {
            symbolsArray[this[currentIndexRef]].gotoAndStop("list-selected");
        }
        stage.update();
    }

    /**
     * Populates the filter UI container with a list of items using episode symbols.
     * @param {string[]} itemsToRender - Array of strings (e.g., category names or filter options).
     * @param {createjs.MovieClip[]} targetSymbolsArray - The array to store the generated symbols.
     * @private
     */
    _populateFilterSymbols(itemsToRender, targetSymbolsArray) {
        this.filterUIContainer.removeAllChildren();
        targetSymbolsArray.length = 0; // Clear the array

        let yOffset = 0;
        itemsToRender.forEach((itemText) => {
            const symbol = new PodCube.lib._EPISODE(); // Reusing episode symbol
            symbol.gotoAndStop("list-unselected");
            symbol.x = 0; // Adjust as needed for your filter UI layout
            symbol.y = yOffset;
            symbol.label.text = itemText; // Set a text field on the symbol if available (adjust as per your _EPISODE symbol)
            // If your _EPISODE symbol has titleCentered, use that:
            if (symbol.titleCentered) {
                symbol.titleCentered.text = itemText;
                 // Adjust title position for single-line titles if needed
                const titleBounds = symbol.titleCentered.getBounds();
                if (titleBounds && titleBounds.height <= 45) {
                    symbol.titleCentered.y += titleBounds.height / 2;
                }
            } else {
                PodCube.warn("SC_TRANSMISSIONS: _EPISODE symbol does not have 'label' or 'titleCentered' for filter UI.");
            }
            yOffset += this.listItemHeight;

            targetSymbolsArray.push(symbol);
            this.filterUIContainer.addChild(symbol);
        });
        stage.update();
    }

    /**
     * Enters a filter category, populating its options, or applies a selected option.
     * Triggered by 'right' button.
     * @private
     */
    _enterFilterCategory() {
        if (this.filterUIMode === 'categories') {
            const selectedCategoryName = this.availableFilterCategories[this.currentFilterCategoryIndex];
            const categoryData = this.filterCategoryMap[selectedCategoryName];

            if (categoryData && PodCube.Feed[categoryData.method]) {
                const availableOptions = PodCube.Feed[categoryData.method]();
                this._populateFilterSymbols(availableOptions, this.filterOptionsSymbols);
                this.filterUIMode = 'options';
                this.currentFilterOptionIndex = 0;
                this._updateFilterUISelection(0, 'options'); // Select first option
                this.filterContextText.text = `SELECT ${selectedCategoryName.toUpperCase()}:`;
            } else {
                PodCube.warn(`SC_TRANSMISSIONS: No method found for category: ${selectedCategoryName}`);
            }
        } else { // filterUIMode === 'options'
            // User pressed 'right' while in options mode, meaning they want to apply the selected option.
            this._applySelectedFilter();
        }
        stage.update();
    }

    /**
     * Exits filter options (back to categories) or cancels filters (back to list).
     * Triggered by 'left' button.
     * @private
     */
    _exitFilterOptions() {
        if (this.filterUIMode === 'options') {
            // Go back to categories view
            this._populateFilterSymbols(this.availableFilterCategories, this.filterCategoriesSymbols);
            this.filterUIMode = 'categories';
            this._updateFilterUISelection(this.currentFilterCategoryIndex, 'categories'); // Restore selection
            this.filterContextText.text = "SELECT CATEGORY:";
        } else { // filterUIMode === 'categories'
            // Cancel and return to main list
            this._cancelFiltersAndReturnToList();
        }
        stage.update();
    }

    /**
     * Applies the currently selected filter (either category or specific option).
     * Triggered by 'yes' button.
     * @private
     */
    _applySelectedFilter() {
        if (this.filterUIMode === 'options') {
            const selectedCategoryName = this.availableFilterCategories[this.currentFilterCategoryIndex];
            const categoryData = this.filterCategoryMap[selectedCategoryName];
            const selectedOptionValue = this.filterOptionsSymbols[this.currentFilterOptionIndex]?.titleCentered?.text ||
                                        this.filterOptionsSymbols[this.currentFilterOptionIndex]?.label?.text;


            if (selectedOptionValue && categoryData) {
                // Clear previous filter for this category type
                delete this.currentFilters[categoryData.type];
                // Apply the new filter
                this.currentFilters[categoryData.type] = selectedOptionValue;
                this.filterContextText.text = `FILTER: ${selectedOptionValue}`;
                PodCube.log(`SC_TRANSMISSIONS: Applied filter - ${categoryData.type}: ${selectedOptionValue}`);
            } else {
                PodCube.warn("SC_TRANSMISSIONS: No filter option selected or category data missing.");
            }
        } else { // filterUIMode === 'categories' (user pressed YES on a category, implies ALL for that category)
            const selectedCategoryName = this.availableFilterCategories[this.currentFilterCategoryIndex];
            const categoryData = this.filterCategoryMap[selectedCategoryName];

            // If user selects a category but doesn't drill down, it effectively means "All" for that category.
            // So, remove any existing filter for that category type.
            if (categoryData && this.currentFilters[categoryData.type]) {
                delete this.currentFilters[categoryData.type];
                this.filterContextText.text = `FILTER: All ${selectedCategoryName}`;
                PodCube.log(`SC_TRANSMISSIONS: Cleared filter for ${selectedCategoryName}`);
            } else {
                this.filterContextText.text = `FILTER: None`;
                PodCube.log(`SC_TRANSMISSIONS: No filter to apply for ${selectedCategoryName}`);
            }
        }

        // Now, re-apply all active filters and sort
        this._applyFiltersAndReturnToList();
    }


    applyCurrentFilters() {
        PodCube.log("SC_TRANSMISSIONS: Applying filters and sorting criteria.");
        // Combine all criteria for the Feed class
        const combinedCriteria = {
            ...this.currentFilters,
            ...this.currentSort
        };

        if (PodCube.Feed) {
            // Get the filtered list from PodCube.Feed based on the combined criteria
            const filteredEpisodes = PodCube.Feed.getFilteredAndSortedList(combinedCriteria);
            // Manually trigger the update of the UI with the new list
            this.onFeedEpisodesChanged(filteredEpisodes);
        } else {
            console.error("PodCube.Feed is not available to apply filters.");
        }
        this.showList(); // Return to list view and ensure filter UI is hidden
    }

    _applyFiltersAndReturnToList() {
        this.applyCurrentFilters();
    }

    _cancelFiltersAndReturnToList() {
        PodCube.log("SC_TRANSMISSIONS: Filter options cancelled, returning to list.");
        // Reset current filters to empty if "no" is pressed while in "categories" mode
        if (this.filterUIMode === 'categories') {
            this.currentFilters = {};
            this.filterContextText.text = "FILTER: None";
            this.applyCurrentFilters(); // Re-apply without any filters
        }
        this.showList(); // This also hides the filter UI container
    }

    // --- 11. Private Helper Methods for Context Handlers ---
    // Abstracting common logic from context handlers for clarity.

    _addSelectedEpisodeToQueue() {
        const episode = this.selectedEpisode;
        if (episode) {
            PodCube.log("SC_TRANSMISSIONS: Episode added to queue:", episode.title);
            PodCube.Player.addToQueue(episode);
        } else {
            PodCube.warn("SC_TRANSMISSIONS: No episode selected to add to queue.");
        }
    }

    _scrollToTopAndResetSelection() {
        this.updateSelection(0); // Select the first item
        this.scrollToTop();      // Scroll to the very top
    }
}