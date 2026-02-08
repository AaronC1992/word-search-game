/**
 * WordList - Provides word database for puzzle generation
 * Contains categorized word lists similar to Unity version
 */
class WordList {
    static shortWords = [
        "CAT", "DOG", "SUN", "MOON", "STAR", "TREE", "BIRD", "FISH",
        "BOOK", "LAMP", "DESK", "CHAIR", "DOOR", "WALL", "ROOF", "FIRE",
        "WATER", "EARTH", "WIND", "RAIN", "SNOW", "CLOUD", "STORM", "WAVE",
        "ROCK", "SAND", "GOLD", "IRON", "WOOD", "LEAF", "ROOT", "SEED",
        "FLOWER", "GRASS", "PLANT", "VINE", "FRUIT", "BERRY", "APPLE", "PEAR",
        "LEMON", "MELON", "GRAPE", "PEACH", "PLUM", "DATE", "FIG", "KIWI",
        "BEAR", "WOLF", "DEER", "MOOSE", "EAGLE", "HAWK", "DOVE", "SWAN",
        "DUCK", "GOOSE", "CROW", "RAVEN", "ROBIN", "WREN", "FINCH", "LARK"
    ];

    static mediumWords = [
        "PYTHON", "COFFEE", "GUITAR", "PLANET", "ROCKET", "GARDEN", "CASTLE", "BRIDGE",
        "FOREST", "OCEAN", "RIVER", "MOUNTAIN", "VALLEY", "DESERT", "ISLAND", "JUNGLE",
        "WINTER", "SPRING", "SUMMER", "AUTUMN", "SEASON", "HARVEST", "BLOSSOM", "RAINBOW",
        "THUNDER", "LIGHTNING", "TORNADO", "VOLCANO", "EARTHQUAKE", "GLACIER", "ICEBERG",
        "CRYSTAL", "DIAMOND", "EMERALD", "SAPPHIRE", "RUBY", "TOPAZ", "AMBER", "PEARL",
        "DRAGON", "PHOENIX", "UNICORN", "GRIFFIN", "KNIGHT", "WIZARD", "WARRIOR", "RANGER",
        "ARCHER", "SHIELD", "SWORD", "ARMOR", "HELMET", "CROWN", "THRONE", "KINGDOM",
        "EMPIRE", "PALACE", "TEMPLE", "TOWER", "FORTRESS", "CITADEL", "DUNGEON", "TAVERN",
        "ADVENTURE", "JOURNEY", "QUEST", "TREASURE", "MYSTERY", "SECRET", "LEGEND", "MYTH",
        "COURAGE", "HONOR", "JUSTICE", "FREEDOM", "WISDOM", "POWER", "MAGIC", "SPIRIT"
    ];

    static longWords = [
        "BUTTERFLY", "WATERFALL", "SUNFLOWER", "STRAWBERRY", "BLUEBERRY", "RASPBERRY",
        "CROCODILE", "DINOSAUR", "ELEPHANT", "GIRAFFE", "KANGAROO", "PENGUIN", "OCTOPUS",
        "CHAMPION", "VICTORY", "TRIUMPH", "CONQUEST", "BATTLE", "GUARDIAN",
        "ADVENTURE", "DISCOVERY", "EXPLORATION", "EXPEDITION", "JOURNEY", "ODYSSEY",
        "TELESCOPE", "MICROSCOPE", "CALCULATOR", "COMPUTER", "TELEVISION", "TELEPHONE",
        "WONDERFUL", "BEAUTIFUL", "LIGHTHOUSE", "KEYBOARD", "RAINBOW", "DRAGONFLY",
        "CHAMPIONSHIP", "CELEBRATION", "IMAGINATION", "INSPIRATION", "TRANSFORMATION",
        "CONSTELLATION", "REVOLUTION", "EVOLUTION", "CIVILIZATION", "GENERATION",
        "EXTRAORDINARY", "MAGNIFICENT", "SPECTACULAR", "INCREDIBLE", "REMARKABLE"
    ];

    /**
     * Get random words for puzzle generation
     * @param {number} count - Number of words needed
     * @param {number} minLength - Minimum word length
     * @param {number} maxLength - Maximum word length
     * @param {number} seed - Random seed for consistency
     * @returns {string[]} Array of selected words
     */
    static getRandomWords(count, minLength, maxLength, seed) {
        const seededRandom = this.createSeededRandom(seed);
        const allEligibleWords = [];

        // Collect eligible words
        [...this.shortWords, ...this.mediumWords, ...this.longWords].forEach(word => {
            if (word.length >= minLength && word.length <= maxLength) {
                allEligibleWords.push(word.toUpperCase());
            }
        });

        // Shuffle using seeded random
        this.shuffleArray(allEligibleWords, seededRandom);

        // Return requested count
        return allEligibleWords.slice(0, Math.min(count, allEligibleWords.length));
    }

    /**
     * Create a seeded random number generator
     * @param {number} seed - Seed value
     * @returns {Function} Random function
     */
    static createSeededRandom(seed) {
        let value = seed;
        return function() {
            value = (value * 9301 + 49297) % 233280;
            return value / 233280;
        };
    }

    /**
     * Shuffle array using Fisher-Yates algorithm
     * @param {Array} array - Array to shuffle
     * @param {Function} randomFn - Random function
     */
    static shuffleArray(array, randomFn) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(randomFn() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
