/**
 * WordPlacement - Represents a word placed in the grid
 * Tracks position, direction, and coordinates
 */
class WordPlacement {
    constructor(word, startRow, startCol, direction) {
        this.word = word.toUpperCase();
        this.startRow = startRow;
        this.startCol = startCol;
        this.direction = direction; // {x, y}
        this.coordinates = [];

        // Calculate all coordinates
        for (let i = 0; i < word.length; i++) {
            const row = startRow + (direction.x * i);
            const col = startCol + (direction.y * i);
            this.coordinates.push({x: row, y: col});
        }
    }

    /**
     * Check if a list of coordinates matches this word (forward or backward)
     * @param {Array} selectedCoords - Array of {x, y} coordinates
     * @returns {boolean} True if matches
     */
    matchesSelection(selectedCoords) {
        if (selectedCoords.length !== this.coordinates.length) {
            return false;
        }

        // Check forward match
        const forwardMatch = this.coordinates.every((coord, i) => 
            coord.x === selectedCoords[i].x && coord.y === selectedCoords[i].y
        );

        if (forwardMatch) return true;

        // Check backward match
        const backwardMatch = this.coordinates.every((coord, i) => {
            const reverseIndex = this.coordinates.length - 1 - i;
            return coord.x === selectedCoords[reverseIndex].x && 
                   coord.y === selectedCoords[reverseIndex].y;
        });

        return backwardMatch;
    }

    /**
     * Serialize to JSON
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            word: this.word,
            startRow: this.startRow,
            startCol: this.startCol,
            direction:this.direction,
            coordinates: this.coordinates
        };
    }

    /**
     * Deserialize from JSON
     * @param {Object} json - JSON data
     * @returns {WordPlacement} Reconstructed placement
     */
    static fromJSON(json) {
        const placement = new WordPlacement(json.word, json.startRow, json.startCol, json.direction);
        return placement;
    }
}
