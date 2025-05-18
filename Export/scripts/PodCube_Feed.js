// PodCube_Feed.js - Feed data structure and methods
class Feed {
    constructor(metadata, episodes) {
        this.metadata = {
            title: metadata?.title || "PodCube Feed",
            description: metadata?.description || "",
            icon: metadata?.icon || "",
            author: metadata?.author || null,
            total: episodes?.length || 0
        };
        this.episodes = episodes || [];
    }

    getEpisodeById(id) {
        return this.episodes.find(ep => ep.id === id) || null;
    }

    getEpisodesByTag(tag) {
        return this.episodes.filter(ep => ep.tags.includes(tag));
    }

    getEpisodesByDate(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return this.episodes.filter(ep => ep.date?.getTime() === date?.getTime());
    }

    search(query) {
        const q = query.toLowerCase();
        return this.episodes.filter(ep =>
            ep.title.toLowerCase().includes(q) ||
            ep.tags.some(t => t.toLowerCase().includes(q))
        );
    }

    // --- SORTING METHODS ---

    sortByDate(ascending = false) {
        return [...this.episodes].sort((a, b) => {
            const comparison = b.date - a.date;
            return ascending ? -comparison : comparison;
        });
    }

    sortByPublished(ascending = false) {
        return [...this.episodes].sort((a, b) => {
            const comparison = b.published - a.published;
            return ascending ? -comparison : comparison;
        });
    }

    sortByIntegrity(ascending = false) {
        return [...this.episodes].sort((a, b) => {
            const comparison = b.integrity - a.integrity;
            return ascending ? -comparison : comparison;
        });
    }

    // --- GROUPING METHODS ---

    groupByModel() {
        return this.episodes.reduce((groups, episode) => {
            const model = episode.model;
            groups[model] = groups[model] || [];
            groups[model].push(episode);
            return groups;
        }, {});
    }

    groupByOrigin() {
        return this.episodes.reduce((groups, episode) => {
            const origin = episode.origin;
            groups[origin] = groups[origin] || [];
            groups[origin].push(episode);
            return groups;
        }, {});
    }

    groupByRegion() {
        return this.episodes.reduce((groups, episode) => {
            const region = episode.region;
            groups[region] = groups[region] || [];
            groups[region].push(episode);
            return groups;
        }, {});
    }

    groupByTags(fuzzyMatch = true) {
        const processTag = fuzzyMatch ? 
            (tag) => tag.toLowerCase().trim().replace(/s$/, '') :
            (tag) => tag.toLowerCase().trim();

        const tagGroups = {};
        const tagCounts = {};

        this.episodes.forEach(episode => {
            episode.tags.forEach(tag => {
                const processedTag = processTag(tag);
                if (!tagGroups[processedTag]) {
                    tagGroups[processedTag] = [];
                    tagCounts[processedTag] = 0;
                }
                tagGroups[processedTag].push(episode);
                tagCounts[processedTag]++;
            });
        });

        // Sort tags by frequency
        return Object.keys(tagGroups)
            .sort((a, b) => tagCounts[b] - tagCounts[a])
            .reduce((sorted, tag) => {
                sorted[tag] = tagGroups[tag];
                return sorted;
            }, {});
    }
}
