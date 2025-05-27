// PodCube_Feed.js - Simplified for Direct Grouped Access
export class Feed {
    // Constants for filter thresholds
    static MIN_CATEGORY_THRESHOLD = 2; // For tags, models, origins, locations
    static MIN_YEAR_GROUP_THRESHOLD = 5; // This threshold will now guide episode grouping, not year counts

    constructor(metadata, episodes) {
        this.metadata = {
            title: metadata?.title || "PodCube Feed",
            description: metadata?.description || "",
            icon: metadata?.icon || "",
            author: metadata?.author || null,
            total: episodes?.length || 0
        };
        this._allEpisodes = episodes || []; // Store the original, complete list

        // Pre-calculated filter options (populated dynamically)
        // These will now just hold all unique values, not filtered by threshold or "Misc"
        this._availableFilterOptions = {
            tags: [],
            models: [],
            origins: [],
            zones: [],
            locales: [],
            regions: [],
            years: []
        };

        this._generateFilterOptions(); // Populate available options based on initial data
    }

    get Episodes(){
        return this._allEpisodes;
    }

    /**
     * Sets the initial list of all episodes.
     * Use this when the raw feed data is loaded or updated.
     * @param {Episode[]} episodes - An array of Episode objects.
     */
    setAllEpisodes(episodes) {
        this._allEpisodes = episodes;
        this.metadata.total = episodes.length;
        this._generateFilterOptions(); // Re-generate options if base episode data changes
        // No re-application of filters needed as internal state for applied filters is gone
    }

    /**
     * Helper to normalize a tag for comparison (lowercase, remove common plural 's').
     * @param {string} tag - The tag to normalize.
     * @returns {string} The normalized tag.
     * @private
     */
    _normalizeTag(tag) {
        if (typeof tag !== 'string' || !tag) return ''; // Handle non-string or empty inputs
        let normalized = tag.toLowerCase();
        // Basic pluralization: remove trailing 's' unless it's a single 's' or ends with 'ss'
        if (normalized.endsWith('s') && normalized.length > 1 && !normalized.endsWith('ss')) {
            normalized = normalized.slice(0, -1);
        }
        return normalized;
    }


    /**
     * Gathers and groups all unique tags, models, origins, and other location fields
     * from the _allEpisodes. This method now populates *all* unique options
     * without applying thresholds or "Misc" categories here.
     * "Misc" handling and thresholding happens in the getEpisodesBy... methods.
     * This method should be called whenever _allEpisodes changes.
     * @private
     */
    _generateFilterOptions() {
        const uniqueValues = {
            tags: new Set(),
            models: new Set(),
            origins: new Set(),
            zones: new Set(),
            locales: new Set(),
            regions: new Set(),
            years: new Set()
        };

        this._allEpisodes.forEach(ep => {
            if (ep.tags) {
                ep.tags.forEach(tag => uniqueValues.tags.add(this._normalizeTag(tag)));
            }
            if (ep.model) uniqueValues.models.add(ep.model);
            if (ep.origin) uniqueValues.origins.add(ep.origin);
            if (ep.zone) uniqueValues.zones.add(ep.zone);
            if (ep.locale) uniqueValues.locales.add(ep.locale);
            if (ep.region) uniqueValues.regions.add(ep.region);
            if (ep.rawDate) uniqueValues.years.add(ep.rawDate.getFullYear());
        });

        this._availableFilterOptions.tags = Array.from(uniqueValues.tags).sort();
        this._availableFilterOptions.models = Array.from(uniqueValues.models).sort();
        this._availableFilterOptions.origins = Array.from(uniqueValues.origins).sort();
        this._availableFilterOptions.zones = Array.from(uniqueValues.zones).sort();
        this._availableFilterOptions.locales = Array.from(uniqueValues.locales).sort();
        this._availableFilterOptions.regions = Array.from(uniqueValues.regions).sort();

        this._availableFilterOptions.years = this._groupYearsByEpisodeSequence(Feed.MIN_YEAR_GROUP_THRESHOLD);
    }

    /**
     * Helper to parse a year string ("YYYY" or "YYYY-YYYY") into its start and end years.
     * @param {string} yearStr - The year string.
     * @returns {{start: number, end: number}} An object with start and end years.
     * @private
     */
    _parseYearString(yearStr) {
        if (yearStr.includes('-')) {
            const parts = yearStr.split('-').map(Number);
            return { start: parts[0], end: parts[1] };
        }
        const year = Number(yearStr);
        return { start: year, end: year };
    }

    /**
     * Helper to get episodes for a single year efficiently (with caching).
     * @param {number} year - The year to get episodes for.
     * @returns {Episode[]} An array of episodes for that year.
     * @private
     */
    _getEpisodesForYear(year) {
        if (!this._episodeCacheByYear) { // Simple cache for performance
            this._episodeCacheByYear = new Map();
            this._allEpisodes.forEach(ep => {
                if (ep.rawDate) {
                    const epYear = ep.rawDate.getFullYear();
                    if (!this._episodeCacheByYear.has(epYear)) {
                        this._episodeCacheByYear.set(epYear, []);
                    }
                    this._episodeCacheByYear.get(epYear).push(ep);
                }
            });
        }
        return this._episodeCacheByYear.get(year) || [];
    }

    /**
     * Groups years based on collecting all episodes from a chronological sequence
     * of years until the MIN_YEAR_GROUP_THRESHOLD is met for that chunk.
     * Includes a post-processing step to merge small single-year groups into adjacent spans.
     * This method does NOT include "All Years".
     *
     * @param {number} minGroupThreshold - The minimum number of episodes to attempt to include in a group.
     * @returns {string[]} An array of chronologically sorted year strings (e.g., "2020", "1990-2000").
     * @private
     */
    _groupYearsByEpisodeSequence(minGroupThreshold) {
        if (this._allEpisodes.length === 0) {
            return []; // No years if no episodes
        }

        // 1. Get all unique years from episodes and sort them numerically
        const uniqueYears = Array.from(new Set(this._allEpisodes
            .filter(ep => ep.rawDate)
            .map(ep => ep.rawDate.getFullYear())))
            .sort((a, b) => a - b);

        if (uniqueYears.length === 0) {
            return [];
        }

        const initialGroups = []; // Stores strings like "2020" or "1990-2000"
        let currentGroupYears = []; // Stores the actual year numbers for the current potential group
        let currentGroupEpisodeCount = 0; // Tracks episode count for the current potential group


        for (let i = 0; i < uniqueYears.length; i++) {
            const year = uniqueYears[i];
            const episodesInThisYear = this._getEpisodesForYear(year);

            currentGroupEpisodeCount += episodesInThisYear.length;
            currentGroupYears.push(year);

            // Check if we've met the threshold OR if this is the last year
            if (currentGroupEpisodeCount >= minGroupThreshold || i === uniqueYears.length - 1) {
                const startYear = currentGroupYears[0];
                const endYear = currentGroupYears[currentGroupYears.length - 1];
                const groupString = startYear === endYear ? startYear.toString() : `${startYear}-${endYear}`;

                initialGroups.push(groupString);

                // Reset for the next group
                currentGroupYears = [];
                currentGroupEpisodeCount = 0;
            }
        }

        // --- Post-processing step: Merge small single-year groups into adjacent larger groups ---
        const finalMergedGroups = [];

        for (let i = 0; i < initialGroups.length; i++) {
            const currentGroupString = initialGroups[i];
            const { start: currentStart, end: currentEnd } = this._parseYearString(currentGroupString);

            // Calculate episode count for the current group
            let currentGroupTotalEpisodes = 0;
            for (let year = currentStart; year <= currentEnd; year++) {
                currentGroupTotalEpisodes += this._getEpisodesForYear(year).length;
            }


            // If the current group is a single year AND its episode count is below threshold,
            // try to merge it with an adjacent group.
            // We prioritize merging backward (to the previous group) if possible.
            if (currentStart === currentEnd && currentGroupTotalEpisodes < minGroupThreshold) {
                let merged = false;

                // Try to merge with the previous group
                if (finalMergedGroups.length > 0) {
                    const prevGroupString = finalMergedGroups[finalMergedGroups.length - 1];
                    const { start: prevStart, end: prevEnd } = this._parseYearString(prevGroupString);

                    // Check if current group is chronologically adjacent to the previous group
                    if (currentStart === prevEnd + 1) {
                        // Merge current group into the previous one by updating the last group string
                        finalMergedGroups[finalMergedGroups.length - 1] = `${prevStart}-${currentEnd}`;
                        merged = true;
                    }
                }

                // If not merged with previous, and there's a next group, try merging with it
                // (Note: This is less common as backward merge is prioritized, but good for completeness)
                if (!merged && i < initialGroups.length - 1) {
                    const nextGroupString = initialGroups[i + 1];
                    const { start: nextStart, end: nextEnd } = this._parseYearString(nextGroupString);

                    // Check if current group is chronologically adjacent to the next group
                    if (currentEnd === nextStart - 1) {
                        // Create a new merged string and replace both current and next in the *initialGroups*
                        // array for the *next iteration's consideration*. This helps consolidate across the loop.
                        // We then skip the next group in the outer loop.
                        initialGroups[i+1] = `${currentStart}-${nextEnd}`; // Modify the next element in the source array
                        merged = true;
                    }
                }

                // If it couldn't be merged with either adjacent group, add it as is (it's an isolated small year)
                if (!merged) {
                    finalMergedGroups.push(currentGroupString);
                }

            } else {
                // If it's a multi-year range or a single year that meets the threshold, add it directly
                finalMergedGroups.push(currentGroupString);
            }
        }
        // One final pass to clean up any consecutive simple ranges that might have been created
        // by the merging logic, but aren't yet consolidated into a single string.
        const consolidatedGroups = [];
        if (finalMergedGroups.length > 0) {
            let currentConsolidatedStart = this._parseYearString(finalMergedGroups[0]).start;
            let currentConsolidatedEnd = this._parseYearString(finalMergedGroups[0]).end;

            for (let i = 1; i < finalMergedGroups.length; i++) {
                const { start: nextStart, end: nextEnd } = this._parseYearString(finalMergedGroups[i]);
                if (nextStart === currentConsolidatedEnd + 1) { // If next group is consecutive
                    currentConsolidatedEnd = nextEnd;
                } else {
                    consolidatedGroups.push(currentConsolidatedStart === currentConsolidatedEnd ?
                        currentConsolidatedStart.toString() : `${currentConsolidatedStart}-${currentConsolidatedEnd}`);
                    currentConsolidatedStart = nextStart;
                    currentConsolidatedEnd = nextEnd;
                }
            }
            consolidatedGroups.push(currentConsolidatedStart === currentConsolidatedEnd ?
                currentConsolidatedStart.toString() : `${currentConsolidatedStart}-${currentConsolidatedEnd}`);
        }

        return consolidatedGroups; // Already chronologically sorted
    }

    // --- Accessors for available filter options (unchanged, still useful for UI) ---
    // These now return all unique values, without "Misc" or thresholding.
    // The grouping methods will decide how to categorize.

    getAvailableTags() {
        return [...this._availableFilterOptions.tags];
    }

    getAvailableModels() {
        return [...this._availableFilterOptions.models];
    }

    getAvailableOrigins() {
        return [...this._availableFilterOptions.origins];
    }

    getAvailableZones() {
        return [...this._availableFilterOptions.zones];
    }

    getAvailableLocales() {
        return [...this._availableFilterOptions.locales];
    }

    getAvailableRegions() {
        return [...this._availableFilterOptions.regions];
    }

    getAvailableYears() {
        return [...this._availableFilterOptions.years];
    }

    // --- NEW/RETAINED METHODS FOR ORGANIZED GROUPINGS ---

    /**
     * Returns an object where keys are normalized tags and values are arrays of episodes
     * belonging to that normalized tag. Includes 'Misc Tags' if applicable.
     * Groups are sorted descending by episode count.
     * @returns {Object.<string, Episode[]>}
     */
    getEpisodesByTag() {
        const tempTagGroups = new Map();

        this._allEpisodes.forEach(ep => {
            if (ep.tags) {
                ep.tags.forEach(tag => {
                    const normalizedTag = this._normalizeTag(tag);
                    if (!tempTagGroups.has(normalizedTag)) {
                        tempTagGroups.set(normalizedTag, []);
                    }
                    tempTagGroups.get(normalizedTag).push(ep);
                });
            }
        });

        const finalGroupsArray = [];
        let miscTagsEpisodes = [];

        // Distribute episodes into explicit and "Misc Tags" groups based on MIN_CATEGORY_THRESHOLD
        for (const [tag, episodes] of tempTagGroups.entries()) {
            if (episodes.length >= Feed.MIN_CATEGORY_THRESHOLD) {
                finalGroupsArray.push({ key: tag, episodes: episodes });
            } else {
                miscTagsEpisodes = miscTagsEpisodes.concat(episodes);
            }
        }

        // Sort explicit tags by count (descending), then alphabetically
        finalGroupsArray.sort((a, b) => {
            const countA = a.episodes.length;
            const countB = b.episodes.length;
            if (countA === countB) {
                return a.key.localeCompare(b.key); // Alphabetical if counts are equal
            }
            return countB - countA; // Descending by count
        });

        const orderedGroups = {};
        finalGroupsArray.forEach(group => {
            orderedGroups[group.key] = group.episodes;
        });

        if (miscTagsEpisodes.length > 0) {
            orderedGroups["Misc Tags"] = miscTagsEpisodes;
        }

        return orderedGroups;
    }


    /**
     * Returns an object where keys are models and values are arrays of episodes
     * belonging to that model. Includes one-off values in their own groups.
     * Groups are sorted descending by episode count.
     * @returns {Object.<string, Episode[]>}
     */
    getEpisodesByModel() {
        return this._getEpisodesByCategoricalProperty('model', Feed.MIN_CATEGORY_THRESHOLD);
    }

    /**
     * Returns an object where keys are origins and values are arrays of episodes
     * belonging to that origin. Includes one-off values in their own groups.
     * Groups are sorted descending by episode count.
     * @returns {Object.<string, Episode[]>}
     */
    getEpisodesByOrigin() {
        return this._getEpisodesByCategoricalProperty('origin', Feed.MIN_CATEGORY_THRESHOLD);
    }

    /**
     * Returns an object where keys are zones and values are arrays of episodes
     * belonging to that zone. Includes one-off values in their own groups.
     * Groups are sorted descending by episode count.
     * @returns {Object.<string, Episode[]>}
     */
    getEpisodesByZone() {
        return this._getEpisodesByCategoricalProperty('zone', Feed.MIN_CATEGORY_THRESHOLD);
    }

    /**
     * Returns an object where keys are locales and values are arrays of episodes
     * belonging to that locale. Includes one-off values in their own groups.
     * Groups are sorted descending by episode count.
     * @returns {Object.<string, Episode[]>}
     */
    getEpisodesByLocale() {
        return this._getEpisodesByCategoricalProperty('locale', Feed.MIN_CATEGORY_THRESHOLD);
    }

    /**
     * Returns an object where keys are regions and values are arrays of episodes
     * belonging to that region. Includes one-off values in their own groups.
     * Groups are sorted descending by episode count.
     * @returns {Object.<string, Episode[]>}
     */
    getEpisodesByRegion() {
        return this._getEpisodesByCategoricalProperty('region', Feed.MIN_CATEGORY_THRESHOLD);
    }

    /**
     * A helper method to group episodes by a given categorical property,
     * handling one-off values in their own groups and sorting by count.
     *
     * This method ensures the keys in the returned object are ordered by
     * episode count (descending), then alphabetically for ties.
     *
     * @param {string} prop - The episode property to group by (e.g., 'model', 'origin').
     * @param {number} minThreshold - The minimum number of episodes for a category to be considered 'explicit'.
     * @returns {Object.<string, Episode[]>}
     * @private
     */
    _getEpisodesByCategoricalProperty(prop, minThreshold) {
        const tempGroups = new Map(); // Stores key -> array of episodes

        this._allEpisodes.forEach(ep => {
            const value = ep[prop];
            if (value !== undefined && value !== null) { // Only process if the property has a value
                if (!tempGroups.has(value)) {
                    tempGroups.set(value, []);
                }
                tempGroups.get(value).push(ep);
            }
        });

        // Convert map to array of { key, episodes } objects for sorting
        const sortedGroupsArray = Array.from(tempGroups.entries()).map(([key, episodes]) => ({ key, episodes }));

        // Sort the array of groups by episode count (descending), then by key (alphabetical)
        sortedGroupsArray.sort((a, b) => {
            const countA = a.episodes.length;
            const countB = b.episodes.length;
            if (countA === countB) {
                return a.key.localeCompare(b.key); // Alphabetical if counts are equal
            }
            return countB - countA; // Descending by count
        });

        const finalOrderedGroups = {};
        sortedGroupsArray.forEach(group => {
            finalOrderedGroups[group.key] = group.episodes;
        });

        return finalOrderedGroups;
    }


    /**
     * Returns an object where keys are year strings (e.g., "2020", "1990-2000")
     * and values are arrays of episodes belonging to that year or year range.
     * This method does NOT include an "All Years" category.
     *
     * The keys in the returned object will be in chronological ascending order.
     * Each array of episodes within the groups will be sorted chronologically by published date (newest first).
     * @returns {Object.<string, Episode[]>}
     */
    getEpisodesByYear() {
        const yearGroupsMap = new Map(); // Stores key -> array of episodes

        // `getAvailableYears()` provides the chronologically sorted year strings
        const sortedYearKeys = this.getAvailableYears();
        const allEpisodes = this._allEpisodes;

        // Populate the map based on the sorted keys, ensuring insertion order
        for (const yearKey of sortedYearKeys) {
            let episodesForGroup = [];
            if (yearKey.includes('-')) {
                const [start, end] = yearKey.split('-').map(Number);
                episodesForGroup = allEpisodes.filter(ep =>
                    ep.rawDate && ep.rawDate.getFullYear() >= start && ep.rawDate.getFullYear() <= end
                );
            } else {
                const year = Number(yearKey);
                episodesForGroup = allEpisodes.filter(ep =>
                    ep.rawDate && ep.rawDate.getFullYear() === year
                );
            }

            // ONLY NEW PART: Sort the episodes within this group chronologically (newest first by published date)
            episodesForGroup.sort((a, b) => {
                const dateA = a.published ? a.published.getTime() : 0;
                const dateB = b.published ? b.published.getTime() : 0;
                return dateB - dateA; // Descending order (newest first)
            });

            // Only add group if it actually has episodes
            if (episodesForGroup.length > 0) {
                yearGroupsMap.set(yearKey, episodesForGroup);
            }
        }

        // Convert the Map to a plain object. Modern JS engines guarantee insertion order
        // for string keys, so the order from the Map will be preserved.
        const finalOrderedGroups = {};
        yearGroupsMap.forEach((episodes, key) => {
            finalOrderedGroups[key] = episodes;
        });

        return finalOrderedGroups;
    }

    /**
     * Provides a direct way to get a filtered and sorted list of episodes based on a specific criteria object.
     * This method does *not* change the internal state or notify listeners.
     * It's for ad-hoc requests for filtered lists where the default grouping methods are not sufficient.
     *
     * @param {object} criteria - An object containing filtering and sorting instructions.
     * @param {string} [criteria.searchQuery] - Text to search titles, descriptions, locations, or tags.
     * @param {string} [criteria.tag] - Filter by a specific tag (or "Misc Tags").
     * @param {string} [criteria.model] - Filter by a specific model.
     * @param {string} [criteria.origin] - Filter by a specific origin.
     * @param {string} [criteria.zone] - Filter by a specific zone.
     * @param {string} [criteria.locale] - Filter by a specific locale.
     * @param {string} [criteria.region] - Filter by a specific region.
     * @param {string} [criteria.year] - Filter by a specific year or year range string. "All Years" returns all episodes.
     * @param {'published'|'title'|'duration'|'integrity'} [criteria.sortBy='published'] - The property to sort by.
     * @param {boolean} [criteria.sortAscending=false] - Whether to sort in ascending order.
     * @returns {Episode[]} An array of episodes matching the criteria.
     */
    getFilteredAndSortedList(criteria = {}) {
        let currentWorkingList = [...this._allEpisodes];

        // Ensure yearRange is correctly derived for this ad-hoc request
        let yearRange = { start: null, end: null };
        if (criteria.year === "All Years" || !criteria.year) { // Keep "All Years" support for ad-hoc filtering
            yearRange = { start: null, end: null };
        } else if (criteria.year.includes('-')) {
            const [start, end] = criteria.year.split('-').map(Number);
            yearRange = { start, end };
        } else {
            const year = parseInt(criteria.year, 10);
            yearRange = { start: year, end: year };
        }

        // 1. Apply Filters
        if (criteria.searchQuery) {
            const query = criteria.searchQuery.toLowerCase();
            const normalizedQueryForTags = this._normalizeTag(criteria.searchQuery); // For fuzzy tag matching

            currentWorkingList = currentWorkingList.filter(ep =>
                ep.title.toLowerCase().includes(query) ||
                ep.description.toLowerCase().includes(query) ||
                (ep.location && ep.location.toLowerCase().includes(query)) ||
                // Fuzzy tag search using normalization for the episode's tags
                (ep.tags && ep.tags.some(t => this._normalizeTag(t).includes(normalizedQueryForTags)))
            );
        }

        if (criteria.tag) {
            const normalizedSelectedTag = this._normalizeTag(criteria.tag);
            // Re-evaluate 'Misc Tags' logic for filtering as it's not in _availableFilterOptions directly
            const tagsWithCounts = new Map();
            this._allEpisodes.forEach(ep => {
                if (ep.tags) {
                    ep.tags.forEach(tag => tagsWithCounts.set(this._normalizeTag(tag), (tagsWithCounts.get(this._normalizeTag(tag)) || 0) + 1));
                }
            });
            const explicitTagsForFiltering = Array.from(tagsWithCounts.entries())
                                                .filter(([, count]) => count >= Feed.MIN_CATEGORY_THRESHOLD)
                                                .map(([tag]) => tag);

            if (normalizedSelectedTag === this._normalizeTag("Misc Tags")) {
                currentWorkingList = currentWorkingList.filter(ep =>
                    ep.tags && ep.tags.some(tag => {
                        const normalizedEpisodeTag = this._normalizeTag(tag);
                        return !explicitTagsForFiltering.includes(normalizedEpisodeTag);
                    })
                );
            } else {
                currentWorkingList = currentWorkingList.filter(ep =>
                    ep.tags && ep.tags.some(t => this._normalizeTag(t) === normalizedSelectedTag)
                );
            }
        }

        const adHocApplyCategoricalFilter = (list, prop, selectedValue) => {
            if (!selectedValue) return list;
            return list.filter(ep => ep[prop] === selectedValue);
        };

        currentWorkingList = adHocApplyCategoricalFilter(currentWorkingList, 'model', criteria.model);
        currentWorkingList = adHocApplyCategoricalFilter(currentWorkingList, 'origin', criteria.origin);
        currentWorkingList = adHocApplyCategoricalFilter(currentWorkingList, 'zone', criteria.zone);
        currentWorkingList = adHocApplyCategoricalFilter(currentWorkingList, 'locale', criteria.locale);
        currentWorkingList = adHocApplyCategoricalFilter(currentWorkingList, 'region', criteria.region);

        if (criteria.year && criteria.year !== "All Years") {
            currentWorkingList = currentWorkingList.filter(ep => {
                if (!ep.rawDate) return false;
                const episodeYear = ep.rawDate.getFullYear();
                const { start, end } = yearRange;
                return episodeYear >= start && episodeYear <= end;
            });
        }

        // 2. Apply Sorting
        const sortBy = criteria.sortBy || 'published';
        const sortAscending = criteria.sortAscending || false;

        currentWorkingList.sort((a, b) => {
            let valA, valB;
            switch (sortBy) {
                case 'date':
                case 'published':
                    valA = a.published ? a.published.getTime() : 0;
                    valB = b.published ? b.published.getTime() : 0;
                    break;
                case 'title':
                    valA = a.title ? a.title.toLowerCase() : '';
                    valB = b.title ? b.title.toLowerCase() : '';
                    break;
                case 'duration':
                    valA = a.rawDuration || 0;
                    valB = b.rawDuration || 0;
                    break;
                case 'integrity':
                    valA = a.integrityFloat || 0;
                    valB = b.integrityFloat || 0;
                    break;
                default:
                    return 0;
            }

            if (valA < valB) {
                return sortAscending ? -1 : 1;
            }
            if (valA > valB) {
                return sortAscending ? 1 : -1;
            }
            return 0;
        });

        return currentWorkingList;
    }
}