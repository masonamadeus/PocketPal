// scripts/PodCubeRSS.js

// #region RSS_FEED_PARSER

/*
==============================================
============== NOTES  ==========================
================================================

    - SHOULD PARSE MARKDOWN LINKS in descriptions

===============================================
*/

const PodCubeRSS = {
    RSS_URL: "https://pinecast.com/feed/pc",
    lastUpdated: null,
    Transmissions: [], // Make Transmissions a property of the object

    /**
     * Adds a new Episode to the Transmissions list.
     * @param {Element} item - The XML item element representing an episode.
     */
    addTransmission: function(item) {
        const episode = new Episode(item); // Use the standalone Episode class
        this.Transmissions.push(episode);
    },

    /**
     * Fetches the RSS feed, parses it, and populates the Transmissions list.
     */
    getFeed: function() {
        if (this.lastUpdated == null || (new Date() - this.lastUpdated) >= 900000) { // 15 minute cooldown
            fetch(this.RSS_URL)
                .then(response => response.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => {
                    const items = data.querySelectorAll("item");
                    items.forEach(el => this.addTransmission(el));
                    console.log("PodCubeRSS: Transmissions fetched and parsed:", this.Transmissions);
                })
                .then(() => {
                    MSG.pub("feedReady", 0); // Notify that the feed is ready
                    this.lastUpdated = new Date(); // Update the last updated time
                })
                .catch(error => {
                    console.error("Error fetching RSS feed:", error);
                });
        } else {
            console.log("PodCubeRSS: Feed was updated recently. Skipping fetch.");
            MSG.pub("feedReady", 0); // Publish feedReady even if skipping fetch
        }
    },

    // --- SIMPLE SORTING METHODS ---

    /**
     * Sorts the Transmissions array by date in descending order (newest to oldest).
     * Returns a NEW sorted array, does not modify the original Transmissions array.
     * @returns {Episode[]} A new array of Episodes, sorted by date (newest to oldest).
     */
    sortByDate: function() {
        return [...this.Transmissions].sort((a, b) => b.date - a.date);
    },

    /**
     * Sorts the Transmissions array by publish date in descending order (newest to oldest).
     * Returns a NEW sorted array, does not modify the original Transmissions array.
     * @returns {Episode[]} A new array of Episodes, sorted by publish date (newest to oldest).
     */
    sortByPubDate: function() {
        return [...this.Transmissions].sort((a, b) => b.pubdate - a.pubdate);
    },

    /**
     * Sorts the Transmissions array by integrity score in descending order (highest integrity first).
     * Returns a NEW sorted array, does not modify the original Transmissions array.
     * @returns {Episode[]} A new array of Episodes, sorted by integrity score (highest first).
     */
    sortByIntegrity: function() {
        return [...this.Transmissions].sort((a, b) => b.integrity - a.integrity);
    },

    // --- ADVANCED GROUPING AND SORTING METHODS ---

    /**
     * Groups episodes by their 'model' property.
     * Returns an object where keys are model names and values are arrays of Episodes for that model.
     * @returns {Object.<string, Episode[]>} An object grouping Episodes by model.
     */
    groupByModel: function() {
        return this.Transmissions.reduce((groups, episode) => {
            const model = episode.model;
            groups[model] = groups[model] || []; // Initialize group array if not exists
            groups[model].push(episode);
            return groups;
        }, {}); // Initial value for reduce is an empty object ({} for groups)
    },

    /**
     * Groups episodes by their 'origin' property.
     * Returns an object where keys are origin names and values are arrays of Episodes for that origin.
     * @returns {Object.<string, Episode[]>} An object grouping Episodes by origin.
     */
    groupByOrigin: function() {
        return this.Transmissions.reduce((groups, episode) => {
            const origin = episode.origin;
            groups[origin] = groups[origin] || [];
            groups[origin].push(episode);
            return groups;
        }, {});
    },

    /**
     * Groups episodes by their 'region' property.
     * Returns an object where keys are region names and values are arrays of Episodes for that region.
     * @returns {Object.<string, Episode[]>} An object grouping Episodes by region.
     */
    groupByRegion: function() {
        return this.Transmissions.reduce((groups, episode) => {
            const region = episode.region;
            groups[region] = groups[region] || [];
            groups[region].push(episode);
            return groups;
        }, {});
    },

    /**
     * Groups episodes by tags, with basic fuzzy matching (plural handling).
     * Returns an object where keys are processed tags (singular form),
     * and values are arrays of Episodes containing that tag, sorted by tag frequency (most frequent first).
     * @returns {Object.<string, Episode[]>} An object grouping Episodes by fuzzy tags, sorted by tag frequency.
     */
    groupByTagsFuzzy: function() {
        const tagCounts = {}; // To count tag occurrences
        const tagGroups = {}; // To group episodes by tag

        // 1. Count tag occurrences and populate tagGroups
        this.Transmissions.forEach(episode => {
            episode.tags.forEach(tag => {
                const processedTag = this.processTagFuzzy(tag); // Apply basic fuzzy processing
                if (!tagGroups[processedTag]) {
                    tagGroups[processedTag] = [];
                    tagCounts[processedTag] = 0;
                }
                tagGroups[processedTag].push(episode);
                tagCounts[processedTag]++;
            });
        });

        // 2. Sort tags by frequency (most frequent first) and return in desired structure
        const sortedTagGroups = Object.keys(tagGroups).sort((tagA, tagB) => {
            return tagCounts[tagB] - tagCounts[tagA]; // Sort by tag count in descending order
        }).reduce((sortedGroupsObj, tag) => { // Rebuild object in sorted tag order
            sortedGroupsObj[tag] = tagGroups[tag];
            return sortedGroupsObj;
        }, {});

        return sortedTagGroups;
    },

    /**
     * Basic fuzzy tag processing: converts tag to lowercase and removes trailing 's' for plurals.
     * You can expand this for more sophisticated fuzzy matching if needed.
     * @param {string} tag The original tag string.
     * @returns {string} The processed (fuzzy) tag string.
     * @private // Indicate this is a helper method not intended for direct external use.
     */
    processTagFuzzy: function(tag) {
        let processedTag = tag.toLowerCase().trim(); // Lowercase and trim whitespace
        if (processedTag.endsWith('s') && processedTag.length > 1) { // Simple plural handling: remove trailing 's'
            processedTag = processedTag.slice(0, -1);
        }
        return processedTag;
    },

};

class Episode {
    // NEW: Static property to list all properties
    static propertyList = [
        "guid", "pubdate", "audio", "title", "model", "integrity",
        "origin", "locale", "region", "zone", "planet", "date",
        "tags", "duration", "location"
    ];

    constructor(item) {
        // ITEM DESCRIPTION FIELD
        const description = item.querySelector("description").innerHTML;

        // MODIFIED PROPERTIES
        const titleRaw = item.querySelector("title").innerHTML || "Data Error";
        const model = this.lookFor(description, "PODCUBE MODEL") || "Data Error";
        const integrity = this.lookFor(description, "INTEGRITY") || "Data Error";
        const origin = this.lookFor(description, "ORIGIN") || "Data Error";
        const locale = this.lookFor(description, "LOCALE") || "Data Error";
        const region = this.lookFor(description, "REGION") || "Data Error";
        const zone = this.lookFor(description, "ZONE") || "Data Error";
        const planet = this.lookFor(description, "PLANET") || "Data Error";
        let dateRaw = this.lookFor(description, "DATE") || "Data Error";
        const tagsRaw = this.lookFor(description, "TAGS") || "Data Error";

        // NEW: Extract duration
        const durationRaw = item.querySelector("itunes\\:duration")?.innerHTML || "Data Error";

        // Process date
        const dateParts = dateRaw.split("/");
        const date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);

        // Process title
        const titleSplit = titleRaw.split(/_(.+)/)[1];
        const title = titleSplit
            ? titleSplit.replace(/_/g, " ")
            : titleRaw.replace(/_/g, " ");

        // Process tags
        const tags = tagsRaw.split(", ");

        // Process integrity
        const integrityScore = parseFloat(integrity);

        // UNMODIFIED PROPERTIES
        this.guid = item.querySelector("guid").innerHTML || null;
        this.pubdate = new Date(item.querySelector("pubDate").innerHTML) || "Data Error";
        this.audio = item.querySelector("enclosure").getAttribute("url") || "Data Error";

        // MODIFIED PROPERTIES
        this.title = this.htmlDecode(title);
        this.model = this.htmlDecode(model);
        this.integrity = integrityScore;
        this.origin = this.htmlDecode(origin);
        this.locale = this.htmlDecode(locale);
        this.region = this.htmlDecode(region);
        this.zone = this.htmlDecode(zone);
        this.planet = this.htmlDecode(planet);
        this.date = date;
        this.tags = tags;

        // NEW: Add duration property
        this.episodeDuration = durationRaw.toString() || "Data Error";

        // Concatenate origin, locale, region, zone, and planet for location
        this.location = [
            this.origin, this.locale, this.region,
            this.zone, this.planet
        ].filter(Boolean).join(", ");
    }

    /**
     * Extracts a property value from the description using a specific pattern.
     * @param {string} desc - The description string to search.
     * @param {string} property - The property name to look for.
     * @returns {string|null} - The extracted property value or "NULL" if not found.
     */
    lookFor(desc, property) {
        const regex = `:: ${property}: (.*)<\/p>`;
        const match = desc.match(new RegExp(regex));
        return match ? match[1] : "NULL";
    }

    /**
     * Decodes HTML entities in a string.
     * @param {string} input - The string to decode.
     * @returns {string} - The decoded string.
     */
    htmlDecode(input) {
        const doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }
}

// #endregion