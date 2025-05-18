/**
 * Represents a podcast episode with all its metadata and audio information.
 * This class handles the structured data for each episode including location hierarchy,
 * recording details, and playback information.
 */
class Episode {
    /**
     * List of all properties that define an episode's data structure.
     * Each property is documented with its purpose and usage within the application.
     * @type {string[]}
     */
    static propertyList = [
        // Core Identification
        "id",           // Unique identifier for database/cache operations
        "title",        // Cleaned and formatted episode title
        "shortcode",    // Episode reference code
        "rawTitle",     // Original unprocessed title
        
        // Temporal Information
        "rawDate",      // Internal Date object for recording date
        "date",         // Formatted short date string
        "longDate",     // Full formatted date with weekday
        "published",    // Publication timestamp
        
        // Recording Information
        "model",        // Recording device model identifier
        "integrityFloat", // Raw integrity value (0-100)
        "integrity",    // Formatted integrity with % symbol
        
        // Location Hierarchy
        "origin",       // Primary recording location
        "locale",       // Specific area within origin
        "region",       // Broader geographical region
        "zone",         // Administrative or geological zone
        "planet",       // Planetary body identifier
        
        // Content Metadata
        "tags",         // Array of categorical tags
        "description",  // Full episode description/notes
        
        // Audio Properties
        "audioUrl",     // Direct link to audio file
        "duration",     // Length in seconds
        "size",         // File size in bytes
    ];
    
    /**
     * Creates a new Episode instance from raw data.
     * @param {Object} data - Raw episode data
     * @param {string} [data.id] - Unique episode identifier
     * @param {string} [data.title] - Episode title
     * @param {string} [data.shortcode] - Episode reference code
     * @param {string} [data.rawTitle] - Original unprocessed title
     * @param {string|Date} [data.date] - Recording date
     * @param {string|Date} [data.published] - Publication date
     * @param {string} [data.model] - Recording device model
     * @param {number|string} [data.integrity] - Data integrity percentage
     * @param {string} [data.origin] - Primary recording location
     * @param {string} [data.locale] - Specific area
     * @param {string} [data.region] - Geographical region
     * @param {string} [data.zone] - Administrative zone
     * @param {string} [data.planet] - Planetary body
     * @param {string[]} [data.tags] - Episode tags
     * @param {string} [data.audioUrl] - Audio file URL
     * @param {number} [data.duration] - Duration in seconds
     * @param {number} [data.size] - File size in bytes
     * @param {string} [data.description] - Episode description
     */    
    
    constructor(data) {
        // Core Identification
        this.id = data.id || null;
        this.title = data.title || "Untitled";
        this.shortcode = data.shortcode || "";
        this.rawTitle = data.rawTitle || "";
        
        // Temporal Information
        this.rawDate = data.date ? new Date(data.date) : null;
        this.published = data.published ? new Date(data.published) : null;
        
        // Recording Information
        this.model = data.model || "Unknown";
        this.integrityFloat = parseFloat(data.integrity) || 0;
        
        // Location Hierarchy
        this.origin = data.origin || "Unknown";
        this.locale = data.locale || "";
        this.region = data.region || "";
        this.zone = data.zone || "";
        this.planet = data.planet || "";
        
        // Content Metadata
        this.tags = Array.isArray(data.tags) ? data.tags : [];
        this.description = data.description || "";
        
        // Audio Properties
        this.audioUrl = data.audioUrl || null;
        this.duration = data.duration || 0;
        this.size = data.size || 0;
    }

    /**
     * Gets the full hierarchical location string.
     * Combines origin, locale, region, zone, and planet into a comma-separated string,
     * filtering out any empty values.
     * @returns {string} Formatted location string
     */
    get location() {
        return [this.origin, this.locale, this.region, this.zone, this.planet]
            .filter(Boolean)
            .join(", ");
    }

    get longDate() {
        return this.rawDate ? this.rawDate.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }) : "";
    }

    get date() { 
        return this.rawDate ? this.rawDate.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }) : "";
    }

    get integrity() {
        return this.integrityFloat.toString() + "%";
    }

    /**
     * Creates a JSON representation of the episode.
     * Useful for serialization and data transfer.
     * @returns {Object} JSON-compatible object with all episode properties
     */    toJSON() {
        return {
            // Core Identification
            id: this.id,
            title: this.title,
            shortcode: this.shortcode,
            rawTitle: this.rawTitle,
            
            // Temporal Information
            rawDate: this.rawDate,
            date: this.date,
            longDate: this.longDate,
            published: this.published?.toISOString(),
            
            // Recording Information
            model: this.model,
            integrityFloat: this.integrityFloat,
            integrity: this.integrity,
            
            // Location Hierarchy
            origin: this.origin,
            locale: this.locale,
            region: this.region,
            zone: this.zone,
            planet: this.planet,
            
            // Content Metadata
            tags: [...this.tags],
            description: this.description,
            
            // Audio Properties
            audioUrl: this.audioUrl,
            duration: this.duration,
            size: this.size
        };
    }
}
