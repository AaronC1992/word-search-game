/**
 * PuzzleData - Core data structure for word search puzzle
 * Contains grid, word placements, and solution information
 */
class PuzzleData {
    constructor(gridSize, seed = null) {
        this.gridSize = gridSize;
        this.grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
        this.wordPlacements = [];
        this.targetWords = [];
        this.seed = seed || Math.floor(Math.random() * 1000000);
    }

    /**
     * Get character at grid position
     * @param {number} row - Row index
     * @param {number} col - Column index
     * @returns {string} Character at position
     */
    getChar(row, col) {
        if (row < 0 || row >= this.gridSize || col < 0 || col >= this.gridSize) {
            return '';
        }
        return this.grid[row][col];
    }

    /**
     * Set character at grid position
     * @param {number} row - Row index
     * @param {number} col - Column index
     * @param {string} char - Character to set
     */
    setChar(row, col, char) {
        if (row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize) {
            this.grid[row][col] = char;
        }
    }

    /**
     * Serialize puzzle to JSON for saving
     * @returns {Object} Serialized puzzle data
     */
    toJSON() {
        return {
            gridSize: this.gridSize,
            grid: this.grid,
            wordPlacements: this.wordPlacements.map(wp => wp.toJSON()),
            targetWords: this.targetWords,
            seed: this.seed
        };
    }

    /**
     * Deserialize puzzle from JSON
     * @param {Object} json - JSON data
     * @returns {PuzzleData} Reconstructed puzzle
     */
    static fromJSON(json) {
        const puzzle = new PuzzleData(json.gridSize, json.seed);
        puzzle.grid = json.grid;
        puzzle.wordPlacements = json.wordPlacements.map(wp => WordPlacement.fromJSON(wp));
        puzzle.targetWords = json.targetWords;
        return puzzle;
    }
}
